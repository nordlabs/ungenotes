import React, {Component} from "react";

export class BaseList extends Component<{ test: string, notes: Array<string>, onUpdate: (notes: string[]) => void }, {currentNote: string, notes: Array<string>}> {
    constructor(props: Readonly<{ test: string; notes: Array<string>, onUpdate: (notes: string[]) => void }> | { test: string; notes: Array<string>, onUpdate: (notes: string[]) => void }) {
        super(props);

        this.state = {
            currentNote: '',
            notes: props.notes ?? [],
        };
    }

    public render() {
        return (
            <div>
                <p>{this.props.test}</p>
                <ul>
                    {
                        this.props.notes.map((n, i) => {
                            return <li key={i}>{n}</li>;
                        })
                    }
                </ul>
                <input
                    value={this.state.currentNote}
                    onChange={(evt) => this.setState({currentNote: evt.target.value})}
                    placeholder={'add some note text'}
                />
                <button
                    onClick={(evt) => {
                        this.setState((oldState) => {
                            oldState.notes.push(oldState.currentNote);

                            return {
                                currentNote: '',
                                notes: oldState.notes,
                            };
                        }, () => {
                            this.props.onUpdate(this.state.notes);
                        });
                    }}
                >
                    Add
                </button>
            </div>
        );
    }
}
