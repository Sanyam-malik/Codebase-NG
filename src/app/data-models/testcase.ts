import { Problem } from "./problem";
import { Item } from "./sheet";

export interface TestCase {
    id: string,
    problem?: Problem | null,
    sheet_item?: Item | null
    call_function: string,
    call_inputs: TestInputs[],
    required_outputs: TestOutputs[],
    time_limit: number
}

export interface TestInputs {
    id: string,
    type: string,
    subtype: string,
    values: any[]
}

export interface TestOutputs {
    id: string,
    type: string,
    subtype: string,
    values: any[]
}
