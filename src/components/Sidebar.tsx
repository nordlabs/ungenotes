import React from 'react';
import {
    AdjustmentsIcon,
    ChatIcon,
    CollectionIcon
} from '@heroicons/react/outline';
import {NavLink, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../util/hooks';
import {addCategory, toggleSidebar} from '../redux/dataSlice';
import {PlusIcon} from '@heroicons/react/solid';
import {CategoryHelper} from '../util/CategoryHelper';
import CategoryLink from './CategoryLink';
import classNames from 'classnames';
import {VersionHelper} from '../util/VersionHelper';

export default function Sidebar(): JSX.Element {
    const iconStyle = 'h-7 w-7 pb-1 inline pr-3';
    const categories = useAppSelector(state => state.data.categories);
    const sidebarOpened = useAppSelector(state => state.data.sidebarOpened);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <div className={classNames('z-50', 'sidebar')}>
            <input type="checkbox" className={classNames('check')} id={'navbar-check'} defaultChecked={sidebarOpened} />
            <label htmlFor={'navbar-check'}>
                <p className={classNames('btn', 'btn-left')} onClick={() => dispatch(toggleSidebar())}>❯</p>
                <p className={classNames('cancel', 'cancel-left')} onClick={() => dispatch(toggleSidebar())}>❮</p>
            </label>
            <div className={classNames('sidebar-content', 'sidebar-content-left')}>
                <header>ungenotes</header>
                <small className={classNames('block', 'text-center', 'm-2')}>{VersionHelper.getVersionString()}</small>
                <ul>
                    <li><a href="#"><CollectionIcon className={iconStyle}/>Dashboard</a></li>
                    {/*<li><a href="#"><PencilAltIcon className={iconStyle}/>Notizen</a></li>*/}
                    {/*<li><a href="#"><BookmarkIcon className={iconStyle}/>Favoriten</a></li>*/}
                    {/*<li><a href="#"><ClockIcon className={iconStyle}/>Historie</a></li>*/}
                    <hr/>
                    <li><NavLink className={(navData) => classNames({active: navData.isActive})} to={'/preferences'}><AdjustmentsIcon className={iconStyle}/>Einstellungen</NavLink></li>

                    <li><NavLink className={(navData) => classNames({active: navData.isActive})} to={'/contact'}><ChatIcon className={iconStyle}/>Kontakt</NavLink></li>
                    <hr/>
                    <li><h6>KATEGORIEN</h6></li>
                    {
                        categories.map(
                            (c) => <CategoryLink category={c} key={c.id}/>
                        )
                    }
                    <li>
                        <a
                            href={'#'}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();

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
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
