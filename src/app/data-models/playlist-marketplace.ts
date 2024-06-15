import { Section } from "./playlist";

export interface PlaylistHome {
    uid: string,
    name: string,
    desc: string,
    total_count: string,
}

export interface PlaylistView {
    id: string;
    title: string;
    description: string;
    total_items: number
    sections: Section[];
}
