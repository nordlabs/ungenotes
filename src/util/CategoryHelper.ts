import {store} from '../redux/store';

export class CategoryHelper {
    public static getNewId(): number {
        return Math.max(0, ...store.getState().data.categories.map((c) => c.id)) + 1;
    }
}
