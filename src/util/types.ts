type Note = {
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
    dateCreated: Date;
    lastModified: Date;
    tags?: Tag[];
    deleted?: boolean;
};

type Tag = {
    /** unique tag name */
    name: string;
    /** color hex code */
    color: string;
};

type Category = {
    /** category title */
    title: string;
    /** the notes of this category */
    notes: Note[];
};