import {createSlice} from '@reduxjs/toolkit';
import {Store} from '../util/Store';

const store = Store.getInstance<{categories: ICategory[], tags: ITag[]}>('data');

interface IDataState {
    categories: ICategory[],
    tags: ITag[],
}

const valueOrUndefinedIfEmpty = (val: string): string => {
    return val && val.trim() !== '' ? val : undefined;
};

export const dataSlice = createSlice<
    IDataState,
    {
        addNoteToCategory: (state: IDataState, more: {payload: {note: INote, category: ICategory}}) => void,
        removeNoteFromCategory: (state: IDataState, more: {payload: {note: INote, category: ICategory}}) => void,
        moveNoteFromCategoryToCategory: (state: IDataState, more: {payload: {note: INote, fromCategory: ICategory, toCategory: ICategory}}) => void
        addCategory: (state: IDataState, more: {payload: {category: ICategory}}) => void,
        renameCategory: (state: IDataState, more: {payload: {category: ICategory, newName: string}}) => void,
        changeTitleOfNote: (state: IDataState, more: {payload: {note: INote, newTitle: string}}) => void,
        changeDescriptionOfNote: (state: IDataState, more: {payload: {note: INote, newDescription: string}}) => void,
        changeLinkOfNote: (state: IDataState, more: {payload: {note: INote, link: string}}) => void,
    }
    >
({
    name: 'baseList',
    initialState: {
        categories: store.get('categories') ?? [],
        tags: store.get('tags') ?? [],
    },
    reducers: {
        addNoteToCategory: () => {
            console.log('addNoteToCategory reducer called');
        },
        removeNoteFromCategory: () => {
            console.log('removeNoteFromCategory reducer called');
        },
        moveNoteFromCategoryToCategory: () => {
            console.log('moveNoteFromCategoryToCategory reducer called');
        },
        addCategory: () => {
            console.log('addCategory reducer called');
        },
        renameCategory: () => {
            console.log('renameCategory reducer called');
        },
        changeTitleOfNote: (state, more) => {
            state.categories.forEach((c) => {
                const note = c.notes.find((n) => n.id === more.payload.note.id);

                if (note) {
                    note.title = valueOrUndefinedIfEmpty(more.payload.newTitle);
                }
            });
            store.set('categories', state.categories);
        },
        changeDescriptionOfNote: (state, more) => {
            state.categories.forEach((c) => {
                const note = c.notes.find((n) => n.id === more.payload.note.id);

                if (note) {
                    note.description = valueOrUndefinedIfEmpty(more.payload.newDescription);
                }
            });
            store.set('categories', state.categories);
        },
        changeLinkOfNote: (state, more) => {
            state.categories.forEach((c) => {
                const note = c.notes.find((n) => n.id === more.payload.note.id);

                if (note) {
                    note.link = valueOrUndefinedIfEmpty(more.payload.link);
                }
            });
            store.set('categories', state.categories);
        },
    },
});

// Action creators are generated for each case reducer function
export const { addNoteToCategory, removeNoteFromCategory, moveNoteFromCategoryToCategory, addCategory, renameCategory, changeTitleOfNote, changeDescriptionOfNote, changeLinkOfNote } = dataSlice.actions;
export const dataSliceReducer = dataSlice.reducer;