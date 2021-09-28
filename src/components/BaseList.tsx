import React, {Component} from "react";

export class BaseList extends Component<IBaseListProps, IBaseListState> {
    constructor(props: Readonly<IBaseListProps> | IBaseListProps) {
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
                        this.state.notes.map((n, i) => {
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
                    onClick={() => {
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

interface IBaseListProps {
    test: string;
    notes: Array<string>;
    onUpdate: (notes: string[]) => void;
}

interface IBaseListState {
    currentNote: string;
    notes: Array<string>;
}
