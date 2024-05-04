export interface CompanyAnalytic {
    company: string,
    slug: string,
    count: number
}

export interface LevelAnalytic {
    level: string,
    slug: string,
    count: number
}

export interface StatusAnalytic {
    status: string,
    slug: string,
    count: number
}

export interface TypeAnalytic {
    type: string,
    slug: string,
    count: number
}

export interface ProblemAnalytic {
    name: string,
    slug: string,
    count: number
}

export interface TrackerAnalytic {
    name: string,
    counts: any
}

export interface Analytics {
    "today_count": number,
    "total_count": number,
    "month_count": number,
    "month_focus": string,
    "prev_month_count": number,
    "prev_month_focus": string,
    "companies": CompanyAnalytic[],
    "levels": LevelAnalytic[],
    "statuses": StatusAnalytic[],
    "types": TypeAnalytic[]
    "relevance": ProblemAnalytic[]
    "trackers": TrackerAnalytic[]
}
