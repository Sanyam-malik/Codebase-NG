export interface CompanyAnalytic {
    company: string,
    count: number
}

export interface LevelAnalytic {
    level: string,
    count: number
}

export interface StatusAnalytic {
    status: string,
    count: number
}

export interface TypeAnalytic {
    type: string,
    count: number
}

export interface Analytics {
    "total_count": number,
    "month_count": number,
    "month_focus": string,
    "prev_month_count": number,
    "prev_month_focus": string,
    "companies": CompanyAnalytic[],
    "levels": LevelAnalytic[],
    "statuses": StatusAnalytic[],
    "types": TypeAnalytic[]
}
