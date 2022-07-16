import {createSlice} from '@reduxjs/toolkit';
import {Store} from '../util/Store';
import {ICategory, IData, INote} from '../util/types';

const store = Store.getInstance<IData>('data');

const valueOrUndefinedIfEmpty = (val: string): string => {
    return val && val.trim() !== '' ? val : undefined;
};

export const dataSlice = createSlice<
    IData,
    {
        addNoteToCategory: (state: IData, more: {payload: {note: INote, category: ICategory}}) => void,
        removeNote: (state: IData, more: {payload: {note: INote}}) => void,
        setNotesOfCategory: (state: IData, more: {payload: {notes: INote[], category: ICategory}}) => any,
        moveNoteInCategory: (state: IData, more: {payload: {note: INote, direction: 'up'|'down'}}) => any
        moveNoteToCategory: (state: IData, more: {payload: {noteId: number, toCategoryId: number}}) => void
        addCategory: (state: IData, more: {payload: {category: ICategory}}) => void,
        renameCategory: (state: IData, more: {payload: {category: ICategory, newName: string}}) => void,
        changeTitleOfNote: (state: IData, more: {payload: {note: INote, newTitle: string}}) => void,
        changeDescriptionOfNote: (state: IData, more: {payload: {note: INote, newDescription: string}}) => void,
        changeLinkOfNote: (state: IData, more: {payload: {note: INote, link: string}}) => void,
        toggleSidebar: (state: IData) => any,
        selectCategory: (state: IData, more: {payload: {category?: ICategory}}) => any,
        changeTitleOfCategory: (state: IData, more: {payload: {category: ICategory, newTitle: string}}) => any,
        removeCategory: (state: IData, more: {payload: {category: ICategory}}) => any,
    }
    >
({
    name: 'data',
    initialState: {
        categories: store.get('categories') ?? [],
        tags: store.get('tags') ?? [],
        sidebarOpened: store.get('sidebarOpened') === true,
        selectedCategory: store.get('sidebarOpened') ?? null,
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
        moveNoteToCategory: (state, more) => {
            let note, fromCategory;
            const toCategory = state.categories.find((c) => c.id === more.payload.toCategoryId);

            for (const c of state.categories) {
                note = c.notes.find((n) => n.id === more.payload.noteId);

                if (note) {
                    fromCategory = c;
                    break;
                }
            }

            if (!note) {
                return;
            }

            toCategory.notes.push(note);
            fromCategory.notes.splice(fromCategory.notes.indexOf(note), 1);
            store.setPartial(state);
        }
        ,
        addCategory: (state, more) => {
            state.categories.push(more.payload.category);
            store.setPartial(state);
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
        selectCategory: (state, more) => {
            state.selectedCategory = more.payload.category?.id;
            store.set('selectedCategory', state.selectedCategory);
        },
        changeTitleOfCategory: (state, more) => {
            const category = state.categories.find((c) => more.payload.category.id === c.id);

            if (category) {
                category.title = more.payload.newTitle;
                store.setPartial(state);
            }
        },
        removeCategory: (state, more) => {
            const category = state.categories.find((c) => c.id === more.payload.category.id);

            if (category) {
                state.categories.splice(state.categories.indexOf(category), 1);
                store.setPartial(state);
            }
        },
        setNotesOfCategory: (state, more) => {
            const category = state.categories.find((c) => c.id === more.payload.category.id);

            if (category) {
                category.notes = more.payload.notes;
                store.setPartial(state);
            }
        },
        moveNoteInCategory: (state, more) => {
            const category = state.categories.find((c) => c.notes.map((n) => n.id).includes(more.payload.note.id));

            if (category) {
                const note = category.notes.find((n) => n.id === more.payload.note.id);
                const oldIdx = category.notes.indexOf(note);
                const newIdx = oldIdx + (more.payload.direction === 'up' ? -1 : 1);

                if (newIdx < 0 || newIdx >= category.notes.length) {
                    // cannot move as already at the edge
                    return;
                }

                category.notes = category.notes.filter((n) => n.id !== note.id);
                category.notes = [
                    ...category.notes.slice(0, newIdx),
                    note,
                    ...category.notes.slice(newIdx),
                ];

                store.setPartial(state);
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    addNoteToCategory,
    setNotesOfCategory,
    removeNote,
    moveNoteInCategory,
    moveNoteToCategory,
    addCategory,
    renameCategory,
    changeTitleOfNote,
    changeDescriptionOfNote,
    changeLinkOfNote,
    toggleSidebar,
    selectCategory,
    changeTitleOfCategory,
    removeCategory,
} = dataSlice.actions;
export const dataSliceReducer = dataSlice.reducer;