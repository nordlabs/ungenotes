import {createSlice} from '@reduxjs/toolkit';
import {Store} from '../util/Store';

const store = Store.getInstance<IData>('data');

const valueOrUndefinedIfEmpty = (val: string): string => {
    return val && val.trim() !== '' ? val : undefined;
};

export const dataSlice = createSlice<
    IData,
    {
        addNoteToCategory: (state: IData, more: {payload: {note: INote, category: ICategory}}) => void,
        removeNote: (state: IData, more: {payload: {note: INote}}) => void,
        moveNoteFromCategoryToCategory: (state: IData, more: {payload: {note: INote, fromCategory: ICategory, toCategory: ICategory}}) => void
        addCategory: (state: IData, more: {payload: {category: ICategory}}) => void,
        renameCategory: (state: IData, more: {payload: {category: ICategory, newName: string}}) => void,
        changeTitleOfNote: (state: IData, more: {payload: {note: INote, newTitle: string}}) => void,
        changeDescriptionOfNote: (state: IData, more: {payload: {note: INote, newDescription: string}}) => void,
        changeLinkOfNote: (state: IData, more: {payload: {note: INote, link: string}}) => void,
        toggleSidebar: (state: IData) => any,
    }
    >
({
    name: 'baseList',
    initialState: {
        categories: store.get('categories') ?? [],
        tags: store.get('tags') ?? [],
        sidebarOpened: store.get('sidebarOpened') === true,
    },
    reducers: {
        addNoteToCategory: (state, more) => {
            const category = state.categories.find((c) => c.id === more.payload.category.id);

            category.notes.push(more.payload.note);
            store.setPartial(state);
        },
        removeNote: (state, more) => {
            state.categories.forEach((c) => {
                const note = c.notes.find((n) => n.id === more.payload.note.id);

                if (note) {
                    c.notes = c.notes.filter((n) => n.id !== more.payload.note.id);
                }
            });
            store.setPartial(state);
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
            store.setPartial(state);
        },
        changeDescriptionOfNote: (state, more) => {
            state.categories.forEach((c) => {
                const note = c.notes.find((n) => n.id === more.payload.note.id);

                if (note) {
                    note.description = valueOrUndefinedIfEmpty(more.payload.newDescription);
                }
            });
            store.setPartial(state);
        },
        changeLinkOfNote: (state, more) => {
            state.categories.forEach((c) => {
                const note = c.notes.find((n) => n.id === more.payload.note.id);

                if (note) {
                    note.link = valueOrUndefinedIfEmpty(more.payload.link);
                }
            });
            store.setPartial(state);
        },
        toggleSidebar: (state) => {
            state.sidebarOpened = !state.sidebarOpened;
            store.set('sidebarOpened', state.sidebarOpened);
        },
    },
});

// Action creators are generated for each case reducer function
export const { addNoteToCategory, removeNote, moveNoteFromCategoryToCategory, addCategory, renameCategory, changeTitleOfNote, changeDescriptionOfNote, changeLinkOfNote, toggleSidebar } = dataSlice.actions;
export const dataSliceReducer = dataSlice.reducer;