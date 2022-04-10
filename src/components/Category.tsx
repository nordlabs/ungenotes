import React from 'react';
import classNames from 'classnames';
import Note from './Note';
import {addNoteToCategory, changeTitleOfCategory} from '../redux/dataSlice';
import {NoteHelper} from '../util/NoteHelper';
import {useAppDispatch} from '../util/hooks';
import {PencilIcon} from '@heroicons/react/solid';

export default function Category(props: { category: ICategory }): JSX.Element {
    const dispatch = useAppDispatch();
    const addNote = () => dispatch(addNoteToCategory({
        note: {
            id: NoteHelper.getNewId(),
            title: '',
            dateCreated: (new Date()).toJSON(),
            lastModified: (new Date()).toJSON()
        }, category: props.category
    }));
    const iconStyle = 'h-7 w-7 pb-1 inline pr-3';

    return (
        <div
            className={classNames('category')}
            onKeyDown={(evt) => {
                if (evt.key === 'n' && evt.ctrlKey) {
                    addNote();
                }
            }}
        >
            <h2 className={classNames(['flex'])}>
                <input
                    spellCheck={false}
                    className={classNames(['bg-transparent', 'outline-none', 'flex-auto'])}
                    type={'text'}
                    placeholder={'<kein Titel>'}
                    autoFocus={props.category.title.trim() === ''}
                    value={props.category.title}
                    onChange={(e) => dispatch(changeTitleOfCategory({
                        category: props.category,
                        newTitle: e.target.value
                    }))}
                />
                <PencilIcon className={classNames(iconStyle, 'self-center')} />
            </h2>
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
