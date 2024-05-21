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

export interface TrackerItemAnalytic {
    name: string,
    count: number
}

export interface TrackerAnalytic {
    name: string,
    counts: TrackerItemAnalytic[]
}

export interface PlaylistDetail {
    'name': string,
    'id': string,
    'percent': number
}

export interface SheetDetail {
    'name': string,
    'id': string,
    'percent': number
}

export interface PlaylistAnalytic {
    'in-progress': PlaylistDetail[]
    'completed': PlaylistDetail[]
}

export interface SheetAnalytic {
    'in-progress': SheetDetail[]
    'completed': SheetDetail[]
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
    "playlists": PlaylistAnalytic
    "sheets": SheetAnalytic
}
