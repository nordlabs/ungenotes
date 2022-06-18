import React from 'react';
import Sidebar from './Sidebar';
import {Route, Routes } from 'react-router-dom';
import CategoryRoute from '../routes/CategoryRoute';
import {useAppSelector} from '../util/hooks';
import Preferences from './Preferences';
import classNames from 'classnames';

export default function App(): JSX.Element {
    const sidebarOpened = useAppSelector(state => state.data.sidebarOpened);

    return (
        <div>
            <Sidebar />
            <div className={classNames(sidebarOpened ? 'ml-64' : 'ml-16', 'p-2')} style={{transition: 'all 0.5s ease'}}>
                <Routes>
                    <Route path={'category'}>
                        <Route path={':categoryId'} element={<CategoryRoute />} />
                    </Route>
                    <Route path={'preferences'} element={<Preferences />} />
                </Routes>
            </div>
        </div>
    );
}
