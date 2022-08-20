import classNames from 'classnames';
import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import {ICategory} from '../util/types';
import {useAppDispatch, useAppSelector} from '../util/hooks';
import {moveNoteToCategory} from '../redux/dataSlice';

export default function CategoryLink(props: {category: ICategory, selectedCategory?: number}): JSX.Element {
    const c = props.category;
    const dispatch = useAppDispatch();

    return (
        <li
            key={c.id}
            className={classNames({active: props.selectedCategory === c.id, empty: c.title.trim() === ''})}
            onDragOver={(evt) => {
                if (!evt.dataTransfer.types.includes('noteid')) {
                    return;
                }

                evt.preventDefault();
            }}
            onDrop={(evt) => {
                const noteId = parseInt(evt.dataTransfer.getData('noteid'));

                if (isNaN(noteId)) {
                    return;
                }

                // move note to new category
                evt.preventDefault();
                dispatch(moveNoteToCategory({toCategoryId: c.id, noteId}));
            }}
        >
            <Link to={`/category/${c.id}`} className={classNames('link')}>
                {
                    c.title.trim() !== '' ?
                        c.title :
                        '<kein Titel>'
                }
            </Link>
        </li>
    );
}
