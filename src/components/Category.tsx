import React, {Component} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '../redux/store';
import classNames from 'classnames';
import Note from './Note';
import {addNoteToCategory} from '../redux/dataSlice';
import {NoteHelper} from '../util/NoteHelper';

class Category extends Component<CategoryProps> {
    public render() {
        return (
            <div
                className={classNames('category')}
                onKeyDown={(evt) => {
                    if (evt.key === 'n' && evt.ctrlKey) {
                        this.props.addNote();
                    }
                }}
            >
                <h2>{this.props.category.title}</h2>
                {
                    (this.props.category.notes ?? []).map((n) => <Note key={n.id} note={n}/>)
                }
                <div
                    className={classNames('add-note')}
                    onClick={this.props.addNote}
                >
                    <button>Add note</button>
                </div>
            </div>
        );
    }
}

const connector = connect(
    (state: RootState, ownProps: {category: ICategory}) => {
        return {
            category: ownProps.category,
        };
    },
    (dispatch, ownProps) => {
        return {
            addNote: () => dispatch(addNoteToCategory({note: {id: NoteHelper.getNewId(), title: '', dateCreated: (new Date()).toJSON(), lastModified: (new Date()).toJSON()}, category: ownProps.category})),
        };
    },
);

type CategoryProps = ConnectedProps<typeof connector>;

export default connector(Category);
