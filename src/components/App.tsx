import BaseList from './BaseList';
import React, {Component, ReactNode} from 'react';

export class App extends Component {
    public render(): ReactNode {
        return (
            <div>
                <h1>Unge Notes</h1>
                <BaseList />
            </div>
        );
    }
}