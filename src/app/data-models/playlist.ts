export interface Item {
    id: string;
    title: string;
    description: string;
    status: string;
    type: string;
    content: string;
    image: string;
    url: string;
}
  
export interface Section {
    id: string;
    title: string;
    description: string;
    status: string;
    items: Item[];
}

export interface PlaylistBrief {
    id: string,
    title: string
}


export interface Playlist {
    id: string;
    title: string;
    description: string;
    total_items: number,
    completed_items: number,
    complete_percent: number;
    sections: Section[];
}
