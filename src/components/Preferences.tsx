import React from 'react';
import classNames from 'classnames';
import {useAppDispatch, useAppSelector} from '../util/hooks';
import {setMinimizeLoadingScreenTime, setTheme} from '../redux/preferencesSlice';
import {Theme} from '../util/types';

export default function Preferences(): JSX.Element {
    const captionTitleClasses = classNames('text-2xl');
    const tableClasses = classNames('w-full', 'mt-3');
    const dispatch = useAppDispatch();

    return (
        <div className={classNames('preferences')}>
            <h1 className={classNames('text-3xl mb-5')}>Einstellungen</h1>
            <div className={classNames('mt-3 mb-10')}>
                Hier können verschiedene Einstellungen vorgenommen werden, welche das Verhalten bzw. das Aussehen der Anwendung bestimmen.

                Alle Änderungen werden automatisch gespeichert.
            </div>
            <div className={classNames('mt-5 preference-list')}>
                {
                    [
                        {
                            title: 'Aussehen',
                            children: [
                                {
                                    name: 'Theme',
                                    id: 'theme',
                                    child: (
                                        <select
                                            id={'theme'}
                                            value={useAppSelector((state) => state.preferences.theme)}
                                            onChange={(evt) => dispatch(setTheme({theme: evt.target.value as Theme}))}
                                        >
                                            <option value={'standard-bright'}>Standard (hell)</option>
                                            <option value={'standard-dark'}>Standard (dunkel)</option>
                                            <option value={'unge-bright'}>Unge (hell)</option>
                                            <option value={'unge-dark'}>Unge (dunkel)</option>
                                        </select>
                                    ),
                                },
                            ],
                        },
                        {
                            title: 'Start',
                            children: [
                                {
                                    name: 'Ladebildschirmzeit minimieren',
                                    id: 'minimizeLoadingScreenTime',
                                    child: (
                                        <input
                                            id={'minimizeLoadingScreenTime'}
                                            type={'checkbox'}
                                            checked={useAppSelector((state) => state.preferences.minimizeLoadingScreenTime)}
                                            onChange={(evt) => dispatch(setMinimizeLoadingScreenTime({value: evt.target.checked}))}
                                        />
                                    ),
                                },
                            ],
                        },
                    ].map((conf) => {
                        return (
                            <React.Fragment key={conf.title}>
                                <h2 className={captionTitleClasses}>{conf.title}</h2>
                                <table className={tableClasses}>
                                    <tbody>
                                        {
                                            conf.children.map((child) => {
                                                return (
                                                    <tr key={child.name}>
                                                        <td><label htmlFor={child.id}>{child.name}</label></td>
                                                        <td>
                                                            {child.child}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                            </React.Fragment>
                        );
                    })
                }
            </div>
        </div>
    );
}
