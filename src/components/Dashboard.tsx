import React from 'react';
import CategoryLink from './CategoryLink';
import {useAppDispatch, useAppSelector} from '../util/hooks';
import {NavLink, useNavigate} from 'react-router-dom';
import classNames from 'classnames';
import {PlusIcon} from '@heroicons/react/solid';
import {CategoryHelper} from '../util/CategoryHelper';
import {addCategory} from '../redux/dataSlice';


export default function Dashboard(): JSX.Element {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const iconStyle = 'h-7 w-7 pb-1 inline pr-3';
    const categories = useAppSelector(state => state.data.categories);

    return (
        <div>
            <h1 className={classNames('text-3xl mb-8 text-center')}>Deine Kategorien</h1>
            <div className={'overview-wrapper'}>
                <div className={'overview'} style={{display: 'flex', justifyContent: 'spaceBetween',}}>
                    {
                        categories.length > 0
                            ? categories.map(
                                (c) =>
                                    <div className="mr-3" key={c.id}>
                                        <div className="p-6 rounded-lg max-w-sm mb-5 category-card">
                                            <h5 className="text-xl leading-tight font-medium mb-2"><CategoryLink category={c} key={c.id} /></h5>
                                            <div className="inline-block px-6 py-2.5 font-medium text-xs leading-tight uppercase rounded transition duration-150 ease-in-out category-card-btn">
                                                <NavLink className={(navData) => classNames({active: navData.isActive}, 'link')} to={`/category/${c.id}`}>
                                                    Alle Anzeigen
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                )
                            : <div className={classNames('flex', 'flex-col', 'justify-items-center')}>
                                <div>Keine Kategorien vorhanden.</div>
                                <button
                                    className={classNames('mt-3')}
                                    onClick={() => {
                                        const newId = CategoryHelper.getNewId();

                                        dispatch(addCategory({
                                            category: {
                                                id: newId,
                                                title: '',
                                                notes: [],
                                            }
                                        }));
                                        navigate(`/category/${newId}`);
                                    }}
                                >
                                    <PlusIcon className={iconStyle}/>Kategorie
                                </button>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}
