import React, {useEffect, useState} from 'react';
import {VersionHelper} from '../util/VersionHelper';
import {useAppDispatch, useAppSelector} from '../util/hooks';
import {setUpdateAvailable} from '../redux/preferencesSlice';
import {shell} from 'electron';
import classNames from 'classnames';

export default function UpdateNotifier(): JSX.Element {
    const updateAvailable = useAppSelector((state) => state.preferences.updateAvailable);
    const dispatch = useAppDispatch();
    const checkForUpdates = () => {
        VersionHelper.checkForUpdates().then((u) => {
            dispatch(setUpdateAvailable({value: u}));

            // schedule new checking
            setTimeout(
                () => {
                    checkForUpdates();
                },
                VersionHelper.checkingInterval * 1000,
            );
        });
    };
    const [hidden, setHidden] = useState(false);

    useEffect(
        checkForUpdates,
        []
    );

    return (
        updateAvailable
            ? <div
                className={classNames('update-notifier', 'fixed', 'right-3', 'bottom-3', 'p-5', 'inline', 'rounded', {hidden}, 'border-2')}
                style={{backgroundColor: 'var(--note-bg)', borderColor: 'var(--sidebar-font-color)'}}
            >
                <span
                    style={{cursor: 'pointer'}}
                    title={'Schließen'}
                    onClick={() => setHidden(true)}
                    className={classNames('absolute', 'right-3', 'top-3', 'p-1')}
                >
                    x
                </span>
                <div className={classNames('text-xl')}>Update verfügbar!</div>
                <div className={classNames('underline')}>
                    <a
                        style={{cursor: 'pointer'}}
                        onClick={() => shell.openExternal(`${VersionHelper.repoUrl}releases/latest`)}
                    >
                        Hier herunterladen & installieren
                    </a>
                </div>
            </div>
            : null
    );
}
