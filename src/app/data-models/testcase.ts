import { Problem } from "./problem";
import { Item } from "./sheet";

export interface TestCase {
    id: number;
    problem: Problem | null,
    sheet_item: Item | null
    call_function: string,
    call_inputs: string[],
    call_input_type: string,
    required_output_type: string,
    required_outputs: string[],
    time_limit: number
}
