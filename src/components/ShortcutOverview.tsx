import React, {useState} from 'react';
import classNames from 'classnames';

export default function ShortcutOverview(): JSX.Element {
    const [opened, setOpened] = useState(false);

    return (
        <div className={classNames('shortcut-overview', 'sidebar', 'z-50')}>
            <input type="checkbox" id={'shortcut-overview-check'} className={classNames('check')} defaultChecked={opened} />
            <label htmlFor="shortcut-overview-check">
                <p className={classNames('cancel', 'cancel-right', 'font-bold')} style={{fontSize: '10px', bottom: 'inherit', top: '10px'}} onClick={() => setOpened(false)}>x</p>
                <p className={classNames('btn', 'btn-right', 'font-bold')} style={{fontSize: '10px', bottom: 'inherit', top: '10px', right: '10px'}} title={'Tastenkombinationen'} onClick={() => setOpened(true)}>?</p>
            </label>
            <div className={classNames('sidebar-content', 'sidebar-content-right', 'p-5')}>
                <div className={classNames('text-2xl', 'pb-3')}>Tastenkombinationen</div>
                <hr />
                <ul className={classNames('shortcuts')}>
                    {
                        [
                            {
                                title: 'Anwendung',
                                items: [
                                    {
                                        name: 'Anwendung schließen',
                                        keys: ['Strg', 'Q'],
                                    },
                                ],
                            },
                            {
                                title: 'Ansicht',
                                items: [
                                    {
                                        name: 'Zoom zurücksetzen',
                                        keys: ['Strg', '0'],
                                    },
                                    {
                                        name: 'Heranzoomen',
                                        keys: ['Strg', '+'],
                                    },
                                    {
                                        name: 'Herauszoomen',
                                        keys: ['Strg', '-'],
                                    },
                                    {
                                        name: 'Vollbild',
                                        keys: ['F11'],
                                    },
                                    {
                                        name: 'Minimieren',
                                        keys: ['Strg', 'M'],
                                    },
                                ],
                            },
                            {
                                title: 'Notiz',
                                items: [
                                    {
                                        name: 'Neue Notiz',
                                        keys: ['Strg', 'N'],
                                    },
                                    {
                                        name: 'Notiz löschen',
                                        keys: ['Strg', 'Entf'],
                                    },
                                    {
                                        name: 'Link öffnen',
                                        keys: ['Strg', 'O'],
                                    },
                                    {
                                        name: 'Notiztitel selektieren',
                                        keys: ['Strg', 'T'],
                                    },
                                    {
                                        name: 'Notizbeschreibung selektieren',
                                        keys: ['Strg', 'D'],
                                    },
                                    {
                                        name: 'Notizlink selektieren',
                                        keys: ['Strg', 'L'],
                                    },
                                    {
                                        name: 'Notiz nach oben verschieben',
                                        keys: ['Alt', '↑'],
                                    },
                                    {
                                        name: 'Notiz nach unten verschieben',
                                        keys: ['Alt', '↓'],
                                    },
                                ],
                            },
                        ]
                        .map((e) => (
                            <React.Fragment key={e.title}>
                                <li className={classNames('shortcut-group-name', 'text-xl')}>{e.title}</li>
                                <li className={classNames('shortcut-group-list', 'span-list', 'span-list-4')}>
                                    {
                                        e.items.map((i) => (
                                            <React.Fragment key={i.name}>
                                                <span className={classNames('name')}>{i.name}</span>
                                                {
                                                    [0, 1].map((k, idx) => (
                                                        <React.Fragment key={k}>{idx !== 0 ? (i.keys[idx] !== undefined ? '+' : <span />) : ''}<span className={classNames({key: i.keys[idx] !== undefined})}>{i.keys[idx] ?? ''}</span></React.Fragment>
                                                    ))
                                                }
                                            </React.Fragment>
                                        ))
                                    }
                                </li>
                            </React.Fragment>
                        ))
                    }
                </ul>
                <div className={classNames('text-2xl', 'pb-3', 'pt-5')}>Weitere Funktionen</div>
                <hr />
                <ul className={classNames('shortcuts')}>
                    <li className={classNames('shortcut-group-name', 'text-xl')}>Notiz</li>
                    <li className={classNames('shortcut-group-list', 'span-list', 'span-list-2')}>
                        <span className={classNames('name')}>Beschreibung selektieren</span>
                        <span>
                            <span className={classNames('key')}>Strg</span>
                            <span>+</span>
                            <span className={classNames('key')}>Enter</span>
                            <span className={classNames('inline-block')}>in Titel</span>
                        </span>
                        <span className={classNames('name')}>Link selektieren</span>
                        <span>
                            <span className={classNames('key')}>Strg</span>
                            <span>+</span>
                            <span className={classNames('key')}>Enter</span>
                            <span className={classNames('inline-block')}>in Beschreibung</span>
                        </span>
                        <span className={classNames('name')}>Beschreibung selektieren</span>
                        <span>
                            <span className={classNames('key')}>Shift</span>
                            <span>+</span>
                            <span className={classNames('key')}>Enter</span>
                            <span className={classNames('inline-block')}>in Link</span>
                        </span>
                        <span className={classNames('name')}>Titel selektieren</span>
                        <span>
                            <span className={classNames('key')}>Shift</span>
                            <span>+</span>
                            <span className={classNames('key')}>Enter</span>
                            <span className={classNames('inline-block')}>in Beschreibung</span>
                        </span>
                        <span className={classNames('name')}>Cursor in Link platzieren</span>
                        <span>
                            <span className={classNames('key')}>Strg</span>
                            <span>+</span>
                            <span className={classNames('key')}>Klick</span>
                            <span className={classNames('inline-block')}>auf Link</span>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
