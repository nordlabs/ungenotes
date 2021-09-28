import {BaseList} from "./BaseList";
import React, {Component} from "react";
import {Store} from "../util/Store";

export class App extends Component {
    private store = Store.getInstance<{notes: string[]}>('data');

    public render() {
        return (
            <div>
                <h1>Unge Notes</h1>
                <BaseList
                    test={'Add some notes!'}
                    notes={this.store.get("notes") ?? []}
                    onUpdate={(notes) => this.store.set('notes', notes)}
                />
            </div>
        );
    }
}