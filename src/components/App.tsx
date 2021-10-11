import React, {Component, ReactNode} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '../redux/store';
import Category from './Category';
import Sidebar from './Sidebar';

class App extends Component<AppProps> {
    public render(): ReactNode {
        return (
            <div>
                <Sidebar></Sidebar>
                <h1>Unge Notes</h1>
                {
                    this.props.categories.map((c) => <Category key={c.title} category={c} />)
                }

            </div>
        );
    }
}

const connector = connect(
    (state: RootState) => {
        return {
            categories: state.data.categories ?? [],
        };
    },
);

type AppProps = ConnectedProps<typeof connector>;

export default connector(App);


