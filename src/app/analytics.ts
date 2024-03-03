export interface CompanyAnalytic {
    company: string,
    count: string
}

export interface LevelAnalytic {
    level: string,
    count: string
}

export interface StatusAnalytic {
    status: string,
    count: string
}

export interface TypeAnalytic {
    type: string,
    count: string
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
