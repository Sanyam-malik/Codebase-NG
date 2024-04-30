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
    sections: Section[];
}
