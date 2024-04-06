import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  _visible: boolean = false;

  @Input('title') title: string = 'Header';
  @Input('content') content: TemplateRef<any> | undefined;
  @Output('onCancel') onCancel: EventEmitter<any> = new EventEmitter<any>();
  @Output('onConfirm') onConfirm: EventEmitter<any> = new EventEmitter<any>();
  @Input() get visible() {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;
    this.visibleChange.emit(this._visible);
  }
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleCancel() {
    this.visible = false;
    this.onCancel.emit('cancel');
  }

  handleConfirm() {
    this.onConfirm.emit('submit');
  }
}
