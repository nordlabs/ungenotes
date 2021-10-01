interface INote {
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

interface ITag {
    /** unique tag name */
    name: string;
    /** color hex code */
    color: string;
}

interface ICategory {
    /** unique id */
    id: number;
    /** category title */
    title: string;
    /** the notes of this category */
    notes: INote[];
}

interface IData {
    categories: ICategory[];
    tags: ITag[];
}