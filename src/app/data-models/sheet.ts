import { Problem } from "./problem"

export interface Item {
    id: string,
    title: string,
    description: string,
    status: string,
    url: string,
    level: string,
    companies: string[],
    concepts: string[],
    problem: Problem
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
    total_items: number,
    completed_items: number,
    complete_percent: number,
    sections: Section[]
}
