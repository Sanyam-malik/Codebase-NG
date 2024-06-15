export interface Note {
    id: string,
    title: string,
    slug: string,
    items: NoteItem[]
}

export interface NoteBrief {
    id: string,
    title: string
}

export interface NoteItem {
    id: string,
    url: string,
    extension: string
}
