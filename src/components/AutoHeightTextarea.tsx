import React, {ChangeEvent, Component, TextareaHTMLAttributes} from 'react';

export class AutoHeightTextarea extends Component<IAutoHeightTextareaProps> {
    private element: HTMLTextAreaElement;

    public render() {
        return (
            <textarea
                ref={(i) => {
                    this.element = i;

                    if (this.props.textareaRef) {
                        this.props.textareaRef(i);
                    }
                }}
                value={this.props.value}
                onChange={(evt) => {
                    this.props.onChange(evt);
                    this.calcHeight();
                }}
                onKeyDown={this.props.onKeyDown}
                onPaste={(evt) => {
                    this.props.onPaste(evt);

                    setTimeout(() => this.calcHeight(), 20);
                }}
                onPasteCapture={this.props.onPasteCapture}
            />
        );
    }

    private calcHeight() {
        // required to shrink field if text is smaller now
        this.element.style.height = 'auto';
        this.element.style.height = this.element.scrollHeight + 'px';
    }

    public componentDidMount() {
        this.calcHeight();
    }
}

interface IAutoHeightTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    value: string;
    onChange: (evt: ChangeEvent<HTMLTextAreaElement>) => any;
    textareaRef?: (instance: HTMLTextAreaElement) => void;
    className?: string | undefined;
}
