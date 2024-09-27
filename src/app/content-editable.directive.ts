import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[contenteditable][contentModel]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ContentEditableDirective,
      multi: true,
    },
  ],
})
export class ContentEditableDirective {
  @Input() contentModel!: string;
  @Input() editId!: string | undefined | null | number; // Accept editId as input
  @Output() contentModelChange = new EventEmitter<string>(); // Emit changes

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};
  private undoHistory: string[] = []; // Stack for undo history
  private redoHistory: string[] = []; // Stack for redo history

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.loadFromLocalStorage(); // Load initial value from local storage
  }

  private loadFromLocalStorage(): void {
    const storedHistory = localStorage.getItem(String(this.editId));
    if (storedHistory) {
      const { currentValue, undoHistory, redoHistory, caretPosition } = JSON.parse(storedHistory);
      this.contentModel = currentValue;
      this.undoHistory = undoHistory || []; // Initialize undo history from stored data
      this.redoHistory = redoHistory || []; // Initialize redo history from stored data
      this.updateContent(false); // Update without focusing
      this.restoreCaretPosition(caretPosition); // Restore caret position
    }
  }

  @HostListener('focus', ['$event.target.innerText'])
  onFocus(value: string) {
    this.undoHistory.push(value); // Store the original value for undo
    this.trimUndoHistory(); // Keep history to a maximum length

    // Restore caret position from local storage
    const storedHistory = localStorage.getItem(String(this.editId));
    if (storedHistory) {
      const { caretPosition } = JSON.parse(storedHistory);
      this.restoreCaretPosition(caretPosition);
    }
  }

  @HostListener('input', ['$event.target.innerText'])
  onInput(value: string) {
    const caretPosition = this.saveCaretPosition(); // Save the current caret position

    this.contentModelChange.emit(value); // Emit the updated value
    this.onChange(value); // Notify Angular of the change

    this.undoHistory.push(value); // Store the new value for undo
    this.redoHistory = []; // Clear redo history on new input
    this.trimUndoHistory(); // Keep history to a maximum length

    this.saveToLocalStorage(value, caretPosition); // Save the current value and caret position to local storage
  }

  @HostListener('blur')
  onBlur() {
    this.onTouched(); // Mark the control as touched
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    // Check for Ctrl+Z (Undo)
    if (event.ctrlKey && event.key === 'z') {
      event.preventDefault();
      this.undo();
    }

    // Check for Ctrl+Y (Redo)
    if (event.ctrlKey && event.key === 'y') {
      event.preventDefault();
      this.redo();
    }

    // Save caret position on backspace
    if (event.key === 'Backspace') {
      const caretPosition = this.saveCaretPosition();
      setTimeout(() => this.restoreCaretPosition(caretPosition), 0); // Restore after backspace
    }
  }

  private saveToLocalStorage(currentValue: string, caretPosition: { start: number, end: number } | null): void {
    const data = {
      currentValue,
      undoHistory: this.undoHistory,
      redoHistory: this.redoHistory,
      caretPosition, // Store caret position in local storage
    };
    localStorage.setItem(String(this.editId), JSON.stringify(data)); // Save the current value and caret position to local storage
  }

  private trimUndoHistory(): void {
    const maxHistoryLength = 10; // Set the maximum length of the history
    if (this.undoHistory.length > maxHistoryLength) {
      this.undoHistory.shift(); // Remove the oldest entry
    }
  }

  writeValue(value: string): void {
    this.updateContent(true, value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn; // Store the change function
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn; // Store the touched function
  }

  // Undo functionality
  undo(): void {
    if (this.undoHistory.length > 1) {
      const caretPosition = this.saveCaretPosition(); // Save the caret position before undoing

      this.redoHistory.push(this.undoHistory.pop()!); // Push current value to redo history
      const previousValue = this.undoHistory[this.undoHistory.length - 1];
      this.updateContent(true, previousValue); // Update content without losing focus
      this.saveToLocalStorage(previousValue, caretPosition); // Save the restored value and caret position to local storage
      this.contentModelChange.emit(previousValue); // Emit the restored value
      this.onChange(previousValue); // Notify Angular of the change

      this.restoreCaretPosition(caretPosition); // Restore the caret position after undo
    }
  }

  // Redo functionality
  redo(): void {
    if (this.redoHistory.length > 0) {
      const caretPosition = this.saveCaretPosition(); // Save the caret position before redoing

      const nextValue = this.redoHistory.pop()!;
      this.updateContent(true, nextValue); // Update content without losing focus
      this.saveToLocalStorage(nextValue, caretPosition); // Save the restored value and caret position to local storage
      this.contentModelChange.emit(nextValue); // Emit the restored value
      this.onChange(nextValue); // Notify Angular of the change

      this.undoHistory.push(nextValue); // Add to undo history
      this.trimUndoHistory(); // Ensure undo history does not exceed max length

      this.restoreCaretPosition(caretPosition); // Restore the caret position after redo
    }
  }

  // Function to save the caret position
  private saveCaretPosition(): { start: number, end: number } | null {
    const selection = window.getSelection();
    if (!selection?.rangeCount) return null;

    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(this.el.nativeElement);
    preCaretRange.setEnd(range.startContainer, range.startOffset);

    const start = preCaretRange.toString().length;
    const end = start + range.toString().length;

    return { start, end };
  }

  // Function to restore the caret position
  private restoreCaretPosition(position: { start: number, end: number } | null): void {
    if (!position) return;

    const node = this.el.nativeElement.firstChild;
    const range = document.createRange();
    const selection = window.getSelection();
    let charCount = 0;

    if (node) {
      let nodeStack = [node];
      let foundStart = false;
      let foundEnd = false;

      while (nodeStack.length > 0 && !(foundStart && foundEnd)) {
        const currentNode = nodeStack.shift();
        if (!currentNode) continue;

        if (currentNode.nodeType === Node.TEXT_NODE) {
          const textLength = currentNode.textContent?.length || 0;
          if (!foundStart && charCount + textLength >= position.start) {
            range.setStart(currentNode, position.start - charCount);
            foundStart = true;
          }
          if (!foundEnd && charCount + textLength >= position.end) {
            range.setEnd(currentNode, position.end - charCount);
            foundEnd = true;
          }
          charCount += textLength;
        } else {
          nodeStack = [...Array.from(currentNode.childNodes), ...nodeStack];
        }
      }

      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range); // Restore caret position
      }
    }
  }

  // Update the content without losing focus
  private updateContent(checkValue: boolean = true, value?: string): void {
    const currentValue = this.el.nativeElement.innerText;
    if (checkValue && currentValue === value) return; // Prevent re-setting the same value

    const caretPosition = this.saveCaretPosition(); // Save caret position
    if (value) {
      this.renderer.setProperty(this.el.nativeElement, 'innerText', value);
      this.contentModel = value; // Update the content model
    }
    this.restoreCaretPosition(caretPosition); // Restore the caret position after updating content
  }
}
