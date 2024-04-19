import { Company } from "./company";

export interface Problem {
    id: number,
    date: string,
    description: string,
    filename: string,
    level: string,
    name: string,
    notes: string,
    status: string,
    type: string,
    url: string,
    code: string,
    companies: Company[],
    remarks: string,
    slug: string,
    subdirectory: string
}
