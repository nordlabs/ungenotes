import {createSlice} from '@reduxjs/toolkit';
import {Store} from '../util/Store';

const store = Store.getInstance<{notes: string[]}>('data');

interface IBaseListState {
    currentNote: string;
    notes: Array<string>;
}

export const baseListSlice = createSlice<
    IBaseListState,
    {
        addNote: (state: IBaseListState) => void,
        setCurrentNote: (state: IBaseListState, more: {payload: string}) => void
    }
    >({
    name: 'baseList',
    initialState: {
        currentNote: '',
        notes: store.get('notes') ?? [],
    },
    reducers: {
        addNote: (state) => {
            state.notes.push(state.currentNote);
            state.currentNote = '';
            store.set('notes', state.notes);
        },
        setCurrentNote: (state, more) => {
            state.currentNote = more.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { addNote, setCurrentNote } = baseListSlice.actions;
export const baseListReducer = baseListSlice.reducer;