import React, {KeyboardEvent, MutableRefObject, useRef} from 'react';
import classNames from 'classnames';
import {changeDescriptionOfNote, changeLinkOfNote, changeTitleOfNote, removeNote} from '../redux/dataSlice';
import AutoHeightTextarea from './AutoHeightTextarea';
import {shell} from 'electron';
import {useAppDispatch} from '../util/hooks';

export default function Note(props: {note: INote}) {
    const container = useRef<HTMLDivElement>();
    const titleContainer = useRef<HTMLInputElement>();
    const descriptionContainer = useRef<HTMLTextAreaElement>();
    const linkContainer = useRef<HTMLInputElement>();
    const dispatch = useAppDispatch();
    const setDescription = (description: string) => dispatch(changeDescriptionOfNote({note: props.note, newDescription: description}));
    const setLink = (link: string) => dispatch(changeLinkOfNote({note: props.note, link}));
    const deleteNote = () => dispatch(removeNote({note: props.note}));

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

                    // @ts-ignore
                    console.log('keypress', val.current);

                    if ('function' === typeof val) {
                        val(evt);
                    } else if (val && val.current) {
                        val.current.focus();
                    }
                }
            }}
        >
            <span
                className={classNames('remove')}
                onClick={deleteNote}
            >
                <span>Delete</span>
            </span>
            <input
                ref={titleContainer}
                className={'title'}
                placeholder={'title'}
                value={props.note.title}
                onChange={(evt) => dispatch(changeTitleOfNote({note: props.note, newTitle: evt.target.value}))}
                onKeyDown={(evt) => {
                    if (evt.key === 'Enter' || evt.key === 'ArrowDown') {
                        this.descriptionContainer.focus();
                        evt.stopPropagation();
                        evt.preventDefault();
                    }
                }}
                spellCheck={false}
            />
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
                    const prevPos = this.descriptionContainer.selectionEnd;

                    setDescription(
                        props.note.description.slice(0, this.descriptionContainer.selectionStart) +
                        content +
                        props.note.description.slice(this.descriptionContainer.selectionStart)
                    );

                    this.descriptionContainer.selectionStart = prevPos + content.length;
                    this.descriptionContainer.selectionEnd = prevPos + content.length;
                }}
                onChange={(evt) => {
                    setDescription(evt.target.value);
                }}
                onKeyDown={(evt) => {
                    if ('ArrowUp' === evt.key || 'ArrowDown' === evt.key) {
                        let pos = 0;
                        let currentRow = 0;

                        props.note.description
                            .split('\n')
                            .forEach((p, i) => {
                                // add \n char length again
                                if (evt.currentTarget.selectionStart >= pos && evt.currentTarget.selectionStart <= pos + p.length + 1) {
                                    currentRow = i;
                                }

                                pos += p.length + 1;
                            });

                        if (evt.key === 'ArrowUp' && currentRow === 0) {
                            this.titleContainer.focus();
                            evt.preventDefault();
                            evt.stopPropagation();
                        } else if (evt.key === 'ArrowDown' && currentRow === props.note.description.split('\n').length - 1) {
                            this.linkContainer.focus();
                            evt.preventDefault();
                            evt.stopPropagation();
                        }
                    }

                    if (evt.key === 'Enter' && evt.ctrlKey) {
                        if (evt.shiftKey === true) {
                            this.titleContainer.focus();

                            evt.preventDefault();
                            evt.stopPropagation();
                            return;
                        }

                        this.linkContainer.focus();
                        evt.stopPropagation();
                        evt.preventDefault();
                    }
                }}
                spellCheck={false}
            />
            {
                props.note.link ?
                    <input
                        ref={linkContainer}
                        className={classNames('link')}
                        value={props.note.link}
                        onChange={(evt) => setLink(evt.target.value)}
                        onClick={() => shell.openExternal(props.note.link)}
                        onKeyDown={(evt) => {
                            if (evt.key === 'ArrowUp') {
                                this.descriptionContainer.focus();
                                evt.stopPropagation();
                                evt.preventDefault();
                            }
                        }}
                        spellCheck={false}
                    /> :
                    null
            }
            {
                props.note.tags ?
                    props.note.tags.map((t) => <span className={classNames('tag')} style={{color: t.color}}>{t.name}</span>) :
                    null
            }
        </div>
    );
}
