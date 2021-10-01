import React, {ChangeEvent, Component, ReactNode, TextareaHTMLAttributes} from 'react';

export class AutoHeightTextarea extends Component<IAutoHeightTextareaProps> {
    private element: HTMLTextAreaElement;

    public render(): ReactNode {
        return (
            <textarea
                ref={(i) => {
                    this.element = i;

                    if (this.props.textareaRef) {
                        this.props.textareaRef(i);
                    }
                }}
                value={this.props.value}
                onChange={this.props.onChange}
                onKeyDown={this.props.onKeyDown}
                onPaste={this.props.onPaste}
                onPasteCapture={this.props.onPasteCapture}
                spellCheck={this.props.spellCheck}
                placeholder={this.props.placeholder}
            />
        );
    }

    private calcHeight() {
        // required to shrink field if text is smaller now
        this.element.style.height = 'auto';
        this.element.style.height = this.element.scrollHeight + 'px';
    }

    public componentDidMount(): void {
        this.calcHeight();

        window.addEventListener('resize', () => {
            this.calcHeight();
        });
    }

    public componentDidUpdate(): void {
        this.calcHeight();
    }
}

interface IAutoHeightTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    value: string;
    onChange: (evt: ChangeEvent<HTMLTextAreaElement>) => void;
    textareaRef?: (instance: HTMLTextAreaElement) => void;
    className?: string | undefined;
}
