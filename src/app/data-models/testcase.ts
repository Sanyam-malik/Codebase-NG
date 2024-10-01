export interface TestCase {
    id: number;
    problem_id: string,
    call_function: string,
    call_inputs: string[],
    call_input_type: string,
    required_output_type: string,
    required_outputs: string[],
    time_limit: number
}
