import classNames from 'classnames';
import {NavLink} from 'react-router-dom';
import React from 'react';
import {ICategory} from '../util/types';
import {useAppDispatch} from '../util/hooks';
import {moveNoteToCategory} from '../redux/dataSlice';

export default function CategoryLink(props: {category: ICategory}): JSX.Element {
    const c = props.category;
    const dispatch = useAppDispatch();

    return (
        <li
            key={c.id}
            className={classNames({empty: c.title.trim() === ''})}
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
            <NavLink className={(navData) => classNames({active: navData.isActive}, 'link')} to={`/category/${c.id}`}>
                {
                    c.title.trim() !== '' ?
                        c.title :
                        '<kein Titel>'
                }
            </NavLink>
        </li>
    );
}
