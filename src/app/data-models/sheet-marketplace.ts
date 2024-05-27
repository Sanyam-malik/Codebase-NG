import { Section } from "./sheet";

export interface SheetHome {
    uid: string,
    name: string,
    image: string,
    total_count: string,
}

export interface SheetView {
    id: string,
    title: string,
    description: string,
    url: string,
    image: string,
    total_items: number,
    sections: Section[]
}