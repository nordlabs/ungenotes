import React from 'react';
import {useParams} from 'react-router-dom';
import Category from '../components/Category';
import {useAppSelector} from '../util/hooks';

export default function CategoryRoute(): JSX.Element {
    const params = useParams() as unknown as {categoryId: string};
    const categoryId = parseInt(params.categoryId);
    const category = useAppSelector(state => state.data.categories.find((c) => c.id === categoryId));

    return <Category category={category} />;
}
