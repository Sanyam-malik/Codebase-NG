export interface Note {
    title: string,
    slug: string,
    items: NoteItem[]
}

export interface NoteItem {
    url: string,
    extension: string
}
