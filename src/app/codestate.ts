export interface TableState {
    name: string,
    index: number
}

export interface Codestate {
    themePref: string,
    tables?: TableState[]
}
