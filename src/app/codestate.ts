export interface TableState {
    name: string,
    index: number
}

export interface Codestate {
    themePref: string,
    appName: string,
    appIcon: string,
    tables?: TableState[]
}
