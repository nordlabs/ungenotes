import React, {Component, KeyboardEvent} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '../redux/store';
import classNames from 'classnames';
import {changeDescriptionOfNote, changeLinkOfNote, changeTitleOfNote, removeNote} from '../redux/dataSlice';
import {AutoHeightTextarea} from './AutoHeightTextarea';
import {shell} from 'electron';

class Note extends Component<NoteProps> {
    private container: HTMLDivElement;
    private titleContainer: HTMLInputElement;
    private descriptionContainer: HTMLTextAreaElement;
    private linkContainer: HTMLInputElement;

    private ctrlKeyMap: {[key: string]: HTMLElement|((evt: KeyboardEvent<HTMLDivElement>) => void)} = {};

    constructor(props: Readonly<NoteProps> | NoteProps) {
        super(props);

        this.ctrlKeyMap = {
            'o': () => {
                if (this.props.note.link) {
                    shell.openExternal(this.props.note.link);
                }
            },
            'Delete': () => {
                this.props.removeNote();
            },
        };
    }

    public render() {
        return (
            <div
                className={classNames('note')}
                ref={(i) => this.container = i}
                onKeyDown={(evt) => {
                    if (evt.ctrlKey && evt.key in this.ctrlKeyMap) {
                        const val = this.ctrlKeyMap[evt.key];

                        if ('function' === typeof val) {
                            val(evt);
                        } else if (val) {
                            val.focus();
                        }
                    }
                }}
            >
                <span
                    className={classNames('remove')}
                    onClick={this.props.removeNote}
                >
                    <span>Delete</span>
                </span>
                <input
                    ref={(i) => {
                        this.titleContainer = i;
                        this.ctrlKeyMap['t'] = i;
                    }}
                    className={'title'}
                    value={this.props.note.title}
                    onChange={(evt) => this.props.setTitle(evt.target.value)}
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
                    textareaRef={(i: HTMLTextAreaElement) => {
                        this.descriptionContainer = i;
                        this.ctrlKeyMap['d'] = i;
                    }}
                    className={classNames('description')}
                    value={this.props.note.description ?? ''}
                    onPaste={async (evt) => {
                        if (!navigator || !navigator.clipboard) {
                            return;
                        }

                        evt.stopPropagation();
                        evt.preventDefault();

                        const content = await navigator.clipboard.readText();

                        if (content.trim().match(/^(http(s)?:\/\/|www\.).*$/)) {
                            this.props.setLink(content.trim());
                            return;
                        }

                        // insert the text manually, as the event was prevented
                        const prevPos = this.descriptionContainer.selectionEnd;

                        this.props.setDescription(
                            this.props.note.description.slice(0, this.descriptionContainer.selectionStart) +
                            content +
                            this.props.note.description.slice(this.descriptionContainer.selectionStart)
                        );

                        this.descriptionContainer.selectionStart = prevPos + content.length;
                        this.descriptionContainer.selectionEnd = prevPos + content.length;
                    }}
                    onChange={(evt) => {
                        this.props.setDescription(evt.target.value);
                    }}
                    onKeyDown={(evt) => {
                        if ('ArrowUp' === evt.key || 'ArrowDown' === evt.key) {
                            let pos = 0;
                            let currentRow = 0;

                            this.props.note.description
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
                            } else if (evt.key === 'ArrowDown' && currentRow === this.props.note.description.split('\n').length - 1) {
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
                    this.props.note.link ?
                        <input
                            ref={(i) => {
                                this.linkContainer = i;
                                this.ctrlKeyMap['l'] = i;
                            }}
                            className={classNames('link')}
                            value={this.props.note.link}
                            onChange={(evt) => this.props.setLink(evt.target.value)}
                            onClick={() => shell.openExternal(this.props.note.link)}
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
                    this.props.note.tags ?
                        this.props.note.tags.map((t) => <span className={classNames('tag')} style={{color: t.color}}>{t.name}</span>) :
                        null
                }
            </div>
        );
    }
}

const connector = connect(
    (state: RootState, ownProps: {note: INote}) => {
        return {
            note: ownProps.note,
        };
    },
    (dispatch, ownProps) => {
        return {
            setTitle: (title: string) => dispatch(changeTitleOfNote({note: ownProps.note, newTitle: title})),
            setDescription: (description: string) => dispatch(changeDescriptionOfNote({note: ownProps.note, newDescription: description})),
            setLink: (link: string) => dispatch(changeLinkOfNote({note: ownProps.note, link})),
            removeNote: () => dispatch(removeNote({note: ownProps.note})),
        };
    },
);

type NoteProps = ConnectedProps<typeof connector>;

export default connector(Note);
