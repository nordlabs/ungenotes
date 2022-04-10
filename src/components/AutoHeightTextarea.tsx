import React, {
    ChangeEvent,
    MutableRefObject,
    TextareaHTMLAttributes,
    useEffect,
    useRef
} from 'react';

export default function AutoHeightTextarea(props: IAutoHeightTextareaProps) {
    const element = useRef<HTMLTextAreaElement>();
    const calcHeight = () => {
        // required to shrink field if text is smaller now
        element.current.style.height = 'auto';
        element.current.style.height = element.current.scrollHeight + 'px';
    };

    // on mount
    useEffect(
        () => {
            calcHeight();

            // add event listener
            window.addEventListener('resize', calcHeight);

            // remove event listener on dismount
            return () => {
                window.removeEventListener('resize', calcHeight);
            };
        },
        [],
    );

    // on text update
    useEffect(
        () => {
            calcHeight();
        },
        [element.current?.value ?? ''],
    );

    // textarea ref update
    useEffect(
        () => {
            if (props.textareaRef) {
                props.textareaRef.current = element.current;
            }
        },
        [element.current],
    );

    return (
        <textarea
            ref={element}
            value={props.value}
            onChange={props.onChange}
            onKeyDown={props.onKeyDown}
            onPaste={props.onPaste}
            onPasteCapture={props.onPasteCapture}
            spellCheck={props.spellCheck}
            placeholder={props.placeholder}
        />
    );
}

interface IAutoHeightTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    value: string;
    onChange: (evt: ChangeEvent<HTMLTextAreaElement>) => void;
    textareaRef?: MutableRefObject<HTMLTextAreaElement>;
    className?: string | undefined;
}
