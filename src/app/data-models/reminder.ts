export interface Reminder {
    id: string,
    date: string | null,
    description: string,
    end_time: string | null,
    name: string,
    recurrence: string,
    start_time: string | null
}
