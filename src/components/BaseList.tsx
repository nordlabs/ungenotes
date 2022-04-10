import React, {Component, useState} from 'react';
import {addNote, setCurrentNote} from '../redux/baseListSlice';
import {useAppDispatch, useAppSelector} from '../util/hooks';

export default function BaseList() {
    const notes = useAppSelector(state => state.baseList.notes)
    const currentNote = useAppSelector(state => state.baseList.currentNote);
    const dispatch = useAppDispatch();

    return (
        <div>
            <ul>
                {
                    notes.map((n, i) => {
                        return <li key={i}>{n}</li>;
                    })
                }
            </ul>
            <input
                value={currentNote}
                onChange={(evt) => dispatch(setCurrentNote(evt.target.value))}
                placeholder={'add some note text'}
            />
            <button
                onClick={() => dispatch(addNote())}
                disabled={!currentNote}
            >
                Add
            </button>
        </div>
    );
}
