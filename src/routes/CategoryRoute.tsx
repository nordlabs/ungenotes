import React from 'react';
import {useParams} from 'react-router-dom';
import Category from '../components/Category';
import {useAppDispatch, useAppSelector} from '../util/hooks';
import {selectCategory} from '../redux/dataSlice';

export default function CategoryRoute(): JSX.Element {
    const params = useParams() as unknown as {categoryId: string};
    const categoryId = parseInt(params.categoryId);
    const category = useAppSelector(state => state.data.categories.find((c) => c.id === categoryId));
    const dispatch = useAppDispatch();

    // mark category as selected
    dispatch(selectCategory({category}));

    return <Category category={category} />;
}
