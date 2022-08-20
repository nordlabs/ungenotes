import React, {useState} from 'react';
import classNames from 'classnames';
import Note from './Note';
import {addNoteToCategory, changeTitleOfCategory, removeCategory, setNotesOfCategory} from '../redux/dataSlice';
import {NoteHelper} from '../util/NoteHelper';
import {useAppDispatch, useAppSelector} from '../util/hooks';
import {DotsVerticalIcon, PlusIcon, TrashIcon} from '@heroicons/react/solid';
import {useNavigate} from 'react-router-dom';
import {ICategory, INote} from '../util/types';

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
    const initialDnDState = {
        draggedFrom: null as number,
        draggedTo: null as number,
        isDragging: false,
        originalOrder: [] as INote[],
        updatedOrder: [] as INote[],
    };
    const [dnd, setDnd] = useState(initialDnDState);

    return (
        <div
            className={classNames('category')}
            onKeyDown={(evt) => {
                if (evt.key === 'n' && evt.ctrlKey) {
                    addNote();
                }
            }}
        >
            <h2 className={classNames(['flex', 'text-4xl', 'mb-2'])}>
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
                <DotsVerticalIcon className={classNames( 'h-7 self-center')} />

            </h2>
            {
                (props.category.notes ?? []).map((n) => {
                    return (
                        // drag and drop inspired by https://dev.to/florantara/creating-a-drag-and-drop-list-with-react-hooks-4c0i
                        <Note
                            key={n.id}
                            note={n}
                            onDragStart={(evt) => {
                                const initialPosition = props.category.notes.indexOf(props.category.notes.find((n) => n.id === Number(evt.currentTarget.dataset.note)));

                                setDnd({
                                    ...dnd,
                                    draggedFrom: initialPosition,
                                    isDragging: true,
                                    originalOrder: props.category.notes,
                                });


                                // Note: this is only for Firefox.
                                // Without it, the DnD won't work.
                                evt.dataTransfer.setData('noteid', n.id.toString());
                            }}
                            onDragOver={(evt) => {
                                evt.preventDefault();

                                let newList = dnd.originalOrder;

                                // index of the item being dragged
                                const draggedFrom = dnd.draggedFrom;

                                // index of the drop area being hovered
                                const draggedTo = props.category.notes.indexOf(props.category.notes.find((n) => n.id === Number(evt.currentTarget.dataset.note)));

                                if (draggedTo === dnd.draggedTo) {
                                    // no changes
                                    return;
                                }

                                // get the element that's at the position of "draggedFrom"
                                const itemDragged = newList[draggedFrom];

                                // filter out the item being dragged
                                const remainingItems = newList.filter((item, index) => index !== draggedFrom);

                                // update the list
                                newList = [
                                    ...remainingItems.slice(0, draggedTo),
                                    itemDragged,
                                    ...remainingItems.slice(draggedTo)
                                ];

                                setDnd({
                                    ...dnd,
                                    updatedOrder: newList,
                                    draggedTo: draggedTo,
                                });
                            }}
                            onDrop={() => {
                                dispatch(setNotesOfCategory({category: props.category, notes: dnd.updatedOrder}));
                                // reset the state
                                setDnd({
                                    ...dnd,
                                    draggedFrom: null,
                                    draggedTo: null,
                                    isDragging: false,
                                });
                            }}
                        />
                    );
                })
            }
            <div
                className={classNames('add-note')}
                onClick={addNote}
            >
                <button title={'Neue Notiz erstellen'}><PlusIcon className={iconStyle} />Notiz</button>
            </div>
            <div className={classNames(['flex', 'justify-end', 'text-red-600'])}>
                <button
                    title={'Kategorie löschen'}
                    onClick={() => {
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
