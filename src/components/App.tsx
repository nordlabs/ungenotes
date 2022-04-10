import React from 'react';
import Sidebar from './Sidebar';
import {Route, Routes } from 'react-router-dom';
import CategoryRoute from '../routes/CategoryRoute';

export default function App(): JSX.Element {
    return (
        <div>
            <Sidebar />
            <div className={'ml-64'}>
                <Routes>
                    <Route path={'category'}>
                        <Route path={':categoryId'} element={<CategoryRoute />} />
                    </Route>
                </Routes>
            </div>
        </div>
    );
}
