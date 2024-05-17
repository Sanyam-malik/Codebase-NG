export interface Note {
    id: string,
    title: string,
    slug: string,
    items: NoteItem[]
}

export interface NoteItem {
    id: string,
    url: string,
    extension: string
}
