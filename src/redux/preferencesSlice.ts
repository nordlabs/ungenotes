import {createSlice} from '@reduxjs/toolkit';
import {Store} from '../util/Store';
import {IPreferences, Theme} from '../util/types';

const store = Store.getInstance<IPreferences>('preferences');

export const preferencesSlice = createSlice<
    IPreferences,
    {
        setTheme: (state: IPreferences, more: {payload: {theme: Theme}}) => void,
    }
    >
({
    name: 'preferences',
    initialState: {
        theme: store.get<Theme>('theme') ?? Theme.standardBright,
    },
    reducers: {
        setTheme: (state, more) => {
            state.theme = more.payload.theme;

            store.setPartial(state);
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setTheme,
} = preferencesSlice.actions;
export const preferencesSliceReducer = preferencesSlice.reducer;