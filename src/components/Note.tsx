import React, {KeyboardEvent, MutableRefObject, useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import {
    changeDescriptionOfNote,
    changeLinkOfNote,
    changeTitleOfNote,
    moveNoteInCategory,
    removeNote
} from '../redux/dataSlice';
import AutoHeightTextarea from './AutoHeightTextarea';
import {shell} from 'electron';
import {useAppDispatch} from '../util/hooks';
import {SelectorIcon, TrashIcon} from '@heroicons/react/solid';

export default function Note(
    props: {
        note: INote,
        onDragStart: React.DragEventHandler<HTMLDivElement>,
        onDragOver: React.DragEventHandler<HTMLDivElement>,
        onDrop: React.DragEventHandler<HTMLDivElement>,
    }
): JSX.Element {
    const container = useRef<HTMLDivElement>();
    const titleContainer = useRef<HTMLInputElement>();
    const descriptionContainer = useRef<HTMLTextAreaElement>();
    const linkContainer = useRef<HTMLInputElement>();
    const dispatch = useAppDispatch();
    const setDescription = (description: string) => dispatch(changeDescriptionOfNote({note: props.note, newDescription: description}));
    const setLink = (link: string) => dispatch(changeLinkOfNote({note: props.note, link}));
    const deleteNote = () => dispatch(removeNote({note: props.note}));
    const iconStyle = 'h-7 inline';
    const [linkFocused, setLinkFocused] = useState(false);
    const [justMoved, setJustMoved] = useState(false);

    useEffect(
        () => {
            if (justMoved) {
                container.current.scrollIntoView({behavior: 'smooth', block: 'nearest'});
                setJustMoved(false);
            }
        },
        [justMoved],
    );

    const ctrlKeyMap: {[key: string]: MutableRefObject<HTMLElement>|((evt: KeyboardEvent<HTMLDivElement>) => void)} = {
        'o': () => {
            if (props.note.link) {
                shell.openExternal(props.note.link);
            }
        },
        'Delete': () => {
            deleteNote();
        },
        't': titleContainer,
        'd': descriptionContainer,
        'l': linkContainer,
    };

    return (
        <div
            className={classNames('note')}
            ref={container}
            data-note={props.note.id}
            onKeyDown={(evt) => {
                if (evt.ctrlKey && evt.key in ctrlKeyMap) {
                    const val = ctrlKeyMap[evt.key];

                    if ('function' === typeof val) {
                        val(evt);
                    } else if (val && val.current) {
                        val.current.focus();
                    }
                }

                if (['ArrowUp', 'ArrowDown'].includes(evt.key) && evt.altKey) {
                    dispatch(moveNoteInCategory({note: props.note, direction: evt.key === 'ArrowUp' ? 'up' : 'down'}));
                    setJustMoved(true);
                    evt.preventDefault();
                    evt.stopPropagation();
                }
            }}
            draggable={true}
            onDragStart={props.onDragStart}
            onDragOver={props.onDragOver}
            onDrop={props.onDrop}
        >
            <span
                className={classNames('remove', 'text-red-600')}
                onClick={deleteNote}
            >
                <span><TrashIcon className={iconStyle} />Löschen</span>
            </span>
            <div className={classNames('flex')}>
                <span title={'Verschieben'}>
                    <SelectorIcon
                        className={classNames(iconStyle, 'move', 'pl-1.5 pr-1.5 pt-1')}
                    />
                </span>
                <input
                    ref={titleContainer}
                    className={classNames('title', 'flex-auto')}
                    placeholder={'title'}
                    value={props.note.title}
                    onChange={(evt) => dispatch(changeTitleOfNote({note: props.note, newTitle: evt.target.value}))}
                    onKeyDown={(evt) => {
                        if (evt.key === 'Enter' || evt.key === 'ArrowDown' && !evt.altKey) {
                            descriptionContainer.current.focus();
                            evt.stopPropagation();
                            evt.preventDefault();
                        }
                    }}
                    spellCheck={false}
                />
            </div>
            <AutoHeightTextarea
                textareaRef={descriptionContainer}
                className={classNames('description')}
                placeholder={'description'}
                value={props.note.description ?? ''}
                onPaste={async (evt) => {
                    if (!navigator || !navigator.clipboard) {
                        return;
                    }

                    evt.stopPropagation();
                    evt.preventDefault();

                    const content = await navigator.clipboard.readText();

                    if (content.trim().match(/^(http(s)?:\/\/|www\.).*$/)) {
                        setLink(content.trim());
                        return;
                    }

                    // insert the text manually, as the event was prevented
                    const prevPos = descriptionContainer.current.selectionEnd;

                    setDescription(
                        props.note.description.slice(0, descriptionContainer.current.selectionStart) +
                        content +
                        props.note.description.slice(descriptionContainer.current.selectionStart)
                    );

                    descriptionContainer.current.selectionStart = prevPos + content.length;
                    descriptionContainer.current.selectionEnd = prevPos + content.length;
                }}
                onChange={(evt) => {
                    setDescription(evt.target.value);
                }}
                onKeyDown={(evt) => {
                    if (!evt.altKey && ('ArrowUp' === evt.key || 'ArrowDown' === evt.key)) {
                        let pos = 0;
                        let currentRow = 0;
                        const lines = (props.note.description ?? '').split('\n');

                        lines
                            .forEach((p, i) => {
                                if (evt.currentTarget.selectionStart >= pos && evt.currentTarget.selectionStart <= pos + p.length + 1) {
                                    currentRow = i;
                                }

                                // add \n char length again, except for when it's the last line
                                pos += p.length + (i < (lines.length - 1) ? 1 : 0);
                            });

                        if (evt.key === 'ArrowUp' && currentRow === 0 && descriptionContainer.current.selectionStart === 0) {
                            titleContainer.current.focus();
                            evt.preventDefault();
                            evt.stopPropagation();
                        } else if (evt.key === 'ArrowDown' && currentRow === lines.length - 1 && pos === descriptionContainer.current.selectionEnd) {
                            linkContainer.current.focus();
                            evt.preventDefault();
                            evt.stopPropagation();
                        }
                    }

                    if (evt.key === 'Enter') {
                        if (evt.shiftKey) {
                            titleContainer.current.focus();
                            evt.preventDefault();
                            evt.stopPropagation();
                        } else if (evt.ctrlKey) {
                            linkContainer.current.focus();
                            evt.stopPropagation();
                            evt.preventDefault();
                        }
                    }
                }}
                spellCheck={false}
            />
            <input
                ref={linkContainer}
                className={classNames('link', {empty: [null, undefined].includes(props.note.link) && linkFocused !== true})}
                value={props.note.link ?? ''}
                onChange={(evt) => setLink(evt.target.value)}
                onClick={() => shell.openExternal(props.note.link)}
                onKeyDown={(evt) => {
                    if (!evt.altKey && evt.key === 'ArrowUp' || evt.key === 'Enter' && evt.shiftKey) {
                        descriptionContainer.current.focus();
                        evt.stopPropagation();
                        evt.preventDefault();
                    }
                }}
                onFocus={() => setLinkFocused(true)}
                onBlur={() => setLinkFocused(false)}
                placeholder={'Link'}
                spellCheck={false}
            />
            {
                props.note.tags ?
                    props.note.tags.map((t) => <span className={classNames('tag')} style={{color: t.color}}>{t.name}</span>) :
                    null
            }
        </div>
    );
}
