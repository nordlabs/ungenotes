import {createSlice} from '@reduxjs/toolkit';
import {Store} from '../util/Store';
import {IPreferences, Theme} from '../util/types';

const store = Store.getInstance<IPreferences>('preferences');

export const preferencesSlice = createSlice<
    IPreferences,
    {
        setTheme: (state: IPreferences, more: {payload: {theme: Theme}}) => void,
        setMinimizeLoadingScreenTime: (state: IPreferences, more: {payload: {value: boolean}}) => void,
        setUpdateAvailable: (state: IPreferences, more: {payload: {value: boolean}}) => void,
    }
    >
({
    name: 'preferences',
    initialState: {
        theme: store.get<Theme>('theme') ?? Theme.standardBright,
        minimizeLoadingScreenTime: store.get<boolean>('minimizeLoadingScreenTime') ?? false,
        updateAvailable: false,
    },
    reducers: {
        setTheme: (state, more) => {
            state.theme = more.payload.theme;

            document.body.setAttribute('data-theme', state.theme.toString());

            store.setPartial(state);
        },
        setMinimizeLoadingScreenTime: (state, more) => {
            state.minimizeLoadingScreenTime = more.payload.value;

            store.setPartial(state);
        },
        setUpdateAvailable: (state, more) => {
            state.updateAvailable = more.payload.value;

            store.setPartial(state);
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setTheme,
    setMinimizeLoadingScreenTime,
    setUpdateAvailable
} = preferencesSlice.actions;
export const preferencesSliceReducer = preferencesSlice.reducer;