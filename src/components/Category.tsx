import React, {Component} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '../redux/store';
import classNames from 'classnames';
import Note from './Note';

class Category extends Component<CategoryProps> {
    public render() {
        return (
            <div className={classNames('category')}>
                {
                    (this.props.category.notes ?? []).map((n) => <Note key={n.id} note={n}/>)
                }
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
);

type CategoryProps = ConnectedProps<typeof connector>;

export default connector(Category);
