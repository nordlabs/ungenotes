import {store} from '../redux/store';

export class NoteHelper {
    public static getNewId(): number {
        return Math.max(
            0,
            ...store.getState().data.categories.map((c) => Math.max(0, ...c.notes.map((n) => n.id)))
        ) + 1;
    }
}
