export interface INote {
    /** unique note id */
    id: number;
    /** title of this note */
    title: string;
    /** description with text of this note */
    description?: string;
    /** link to yt video */
    link?: string;
    /** until which point this video was watched, in seconds */
    watchedUntil?: number;
    dateCreated: Date|string;
    lastModified: Date|string;
    tags?: ITag[];
    deleted?: boolean;
}

export interface ITag {
    /** unique tag name */
    name: string;
    /** color hex code */
    color: string;
}

export interface ICategory {
    /** unique id */
    id: number;
    /** category title */
    title: string;
    /** the notes of this category */
    notes: INote[];
}

export interface IData {
    categories: ICategory[];
    tags: ITag[];
    sidebarOpened: boolean;
    selectedCategory?: number;
}

export enum Theme {
    standardBright = 'standard-bright',
    standardDark = 'standard-dark',
    ungeBright = 'unge-bright',
    ungeDark = 'unge-dark',
}

export interface IPreferences {
    theme: Theme;
    minimizeLoadingScreenTime: boolean;
}
