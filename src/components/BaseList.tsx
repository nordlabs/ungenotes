import React, {Component} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '../redux/store';
import {addNote, setCurrentNote} from '../redux/baseListSlice';

class BaseList extends Component<IBaseListProps> {
    constructor(props: Readonly<IBaseListProps> | IBaseListProps) {
        super(props);

        this.state = {
            notes: props.notes,
            currentNote: '',
        };
    }

    public render() {
        return (
            <div>
                <ul>
                    {
                        this.props.notes.map((n, i) => {
                            return <li key={i}>{n}</li>;
                        })
                    }
                </ul>
                <input
                    value={this.props.currentNote}
                    onChange={(evt) => this.props.setCurrentNote(evt.target.value)}
                    placeholder={'add some note text'}
                />
                <button
                    onClick={this.props.addNote}
                    disabled={!this.props.currentNote}
                >
                    Add
                </button>
            </div>
        );
    }
}

const connector = connect(
    (state: RootState) => {
        return {
            notes: state.baseList.notes,
            currentNote: state.baseList.currentNote
        };
    },
    (dispatch) => {
        return {
            addNote: () => dispatch(addNote()),
            setCurrentNote: (note: string) => dispatch(setCurrentNote(note)),
        };
    },
);

type BaseListProps = ConnectedProps<typeof connector>;

type IBaseListProps = BaseListProps

export default connector(BaseList);
