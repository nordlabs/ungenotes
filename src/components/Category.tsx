import React from 'react';
import classNames from 'classnames';
import Note from './Note';
import {addNoteToCategory, changeTitleOfCategory, removeCategory} from '../redux/dataSlice';
import {NoteHelper} from '../util/NoteHelper';
import {useAppDispatch, useAppSelector} from '../util/hooks';
import {PencilIcon, PlusIcon, TrashIcon} from '@heroicons/react/solid';
import {useNavigate} from 'react-router-dom';

export default function Category(props: { category: ICategory }): JSX.Element {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const categories = useAppSelector(state => state.data.categories);
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
                <button><PlusIcon className={iconStyle} />Notiz</button>
            </div>
            <div className={classNames(['flex', 'justify-end', 'text-red-600'])}>
                <button
                    onClick={(e) => {
                        if (confirm(`Die Kategorie '${props.category.title}' löschen?`)) {
                            const categoryIdx = categories.indexOf(props.category);
                            const nextCategoryIdx = (
                                categoryIdx === 0 ?
                                    (categories.length > 1 ? 1 : null) :
                                    categoryIdx > 0 ?
                                        categoryIdx - 1 :
                                        null
                            );
                            const nextCategory = nextCategoryIdx !== null ? categories[nextCategoryIdx] : null;

                            dispatch(removeCategory({category: props.category}));

                            if (nextCategory !== null) {
                                navigate(`/category/${nextCategory.id}`);
                            } else {
                                navigate('/');
                            }
                        }
                    }}
                >
                    <TrashIcon className={iconStyle} />Löschen
                </button>
            </div>
        </div>
    );
}
