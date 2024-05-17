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


export interface Playlist {
    id: string;
    title: string;
    description: string;
    total_items: string,
    completed_items: string,
    complete_percent: string;
    sections: Section[];
}
