export interface Item {
    id: string,
    title: string,
    description: string,
    status: string,
    url: string,
    level: string,
    companies: string[],
    concepts: string[];
}
  
export interface Section {
    id: string,
    title: string,
    description: string,
    status: string,
    items: Item[]
}


export interface Sheet {
    id: string,
    title: string,
    description: string,
    url: string,
    image: string,
    sections: Section[]
}
