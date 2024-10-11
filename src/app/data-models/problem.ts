import { Company } from "./company";
import { TestCase } from "./testcase";

export interface Problem {
    id: string,
    date: string,
    description: string,
    filename: string,
    level: string,
    name: string,
    notes: string,
    status: string,
    type: ProblemType,
    url: string,
    code: string,
    companies: Company[],
    concepts: string,
    remarks: string,
    slug: string,
    subdirectory: string,
    tests: TestCase[]
}

export interface ProblemBrief {
    id: string,
    level: string,
    name: string,
    status: string,
    type: ProblemTypeBrief,
    companies: Company[],
    slug: string,
    remarks: string,
    subdirectory: string
}

export interface ProblemType {
    id: string,
    name: string,
    description: string,
    slug: string
}

export interface ProblemTypeBrief {
    name: string,
    slug: string
}

