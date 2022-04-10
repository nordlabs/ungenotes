import React from 'react';
import Sidebar from './Sidebar';
import {Route, Routes } from 'react-router-dom';
import CategoryRoute from '../routes/CategoryRoute';
import {useAppSelector} from '../util/hooks';

export default function App(): JSX.Element {
    const sidebarOpened = useAppSelector(state => state.data.sidebarOpened);

    return (
        <div>
            <Sidebar />
            <div className={sidebarOpened ? 'ml-64' : 'ml-16'} style={{transition: 'all 0.5s ease'}}>
                <Routes>
                    <Route path={'category'}>
                        <Route path={':categoryId'} element={<CategoryRoute />} />
                    </Route>
                </Routes>
            </div>
        </div>
    );
}
