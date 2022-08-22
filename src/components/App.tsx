import React, {useEffect} from 'react';
import Sidebar from './Sidebar';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import CategoryRoute from '../routes/CategoryRoute';
import {useAppSelector} from '../util/hooks';
import Preferences from './Preferences';
import classNames from 'classnames';
import {ipcRenderer} from 'electron';
import Contact from '../routes/Contact';
import {LoadingScreen} from '../util/LoadingScreen';
import Dashboard from './Dashboard';
import ShortcutOverview from './ShortcutOverview';
import UpdateNotifier from './UpdateNotifier';
import {Toaster} from '../util/Toaster';

export default function App(): JSX.Element {
    const sidebarOpened = useAppSelector(state => state.data.sidebarOpened);
    const navigate = useNavigate();

    ipcRenderer.removeAllListeners('navigateContact');
    ipcRenderer.removeAllListeners('showLoadingScreen');
    ipcRenderer.removeAllListeners('hideLoadingScreen');
    ipcRenderer.removeAllListeners('openShortcutOverview');


    // register callbacks
    useEffect(
        () => {
            ipcRenderer.on('navigateContact', () => {
                navigate('/contact');
            });
            ipcRenderer.on('showLoadingScreen', () => {
                LoadingScreen.show();
            });
            ipcRenderer.on('hideLoadingScreen', () => {
                LoadingScreen.hide();
            });
            ipcRenderer.on('openToast', (evt, msg) => {
                Toaster.success(msg);
            });
            ipcRenderer.on('openShortcutOverview', () => {
                const shortcutOverviewInput = document.getElementById('shortcut-overview-check') as HTMLInputElement;

                if (shortcutOverviewInput) {
                    shortcutOverviewInput.checked = true;
                }
            });
        },
        [],
    );

    return (
        <div>
            <Sidebar />
            <div className={classNames(sidebarOpened ? 'ml-64' : 'ml-16', 'p-2')} style={{transition: 'all 0.5s ease'}}>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate replace to="/dashboard" />
                        }
                    />
                    <Route path={'/dashboard'} element={<Dashboard />} />
                    {/*<Route path={'/'} element={<Dashboard />} />*/}
                    <Route path={'category'}>
                        <Route path={':categoryId'} element={<CategoryRoute />} />
                    </Route>
                    <Route path={'preferences'} element={<Preferences />} />
                    <Route path={'contact'} element={<Contact />} />
                </Routes>
            </div>
            <UpdateNotifier />
            <ShortcutOverview />
        </div>
    );
}
