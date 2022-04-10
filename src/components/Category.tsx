import React from 'react';
import classNames from 'classnames';
import Note from './Note';
import {addNoteToCategory} from '../redux/dataSlice';
import {NoteHelper} from '../util/NoteHelper';
import {useAppDispatch} from '../util/hooks';

export default function Category(props: {category: ICategory}): JSX.Element {
    const dispatch = useAppDispatch();
    const addNote = () => dispatch(addNoteToCategory({note: {id: NoteHelper.getNewId(), title: '', dateCreated: (new Date()).toJSON(), lastModified: (new Date()).toJSON()}, category: props.category}));

    return (
        <div
            className={classNames('category')}
            onKeyDown={(evt) => {
                if (evt.key === 'n' && evt.ctrlKey) {
                    addNote();
                }
            }}
        >
            <h2>{props.category.title}</h2>
            {
                (props.category.notes ?? []).map((n) => <Note key={n.id} note={n}/>)
            }
            <div
                className={classNames('add-note')}
                onClick={addNote}
            >
                <button>Add note</button>
            </div>
        </div>
    );
}
