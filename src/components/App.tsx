import React, {Component, ReactNode} from 'react';
import Sidebar from './Sidebar';
import Category from './Category';
import {useAppSelector} from '../util/hooks';

export default function App() {
    const categories = useAppSelector(state => state.data.categories) ?? [];

    return (
        <div>
            <Sidebar />
            <div className={'ml-64'}>
                {
                    categories.map((c) => <Category key={c.title} category={c} />)
                }
            </div>
        </div>
    );
}
