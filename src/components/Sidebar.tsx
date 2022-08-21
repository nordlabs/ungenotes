import React from 'react';
import {
    AdjustmentsIcon,
    BookmarkIcon,
    PencilAltIcon,
    ClockIcon,
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

export default function Sidebar(): JSX.Element {
    const iconStyle = 'h-7 w-7 pb-1 inline pr-3';
    const categories = useAppSelector(state => state.data.categories);
    const sidebarOpened = useAppSelector(state => state.data.sidebarOpened);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <div className={'z-50'}>
            <input type="checkbox" id="check" defaultChecked={sidebarOpened} />
            <label htmlFor="check">
                <p id="btn" onClick={() => dispatch(toggleSidebar())}>❯</p>
                <p id="cancel" onClick={() => dispatch(toggleSidebar())}>❮</p>
            </label>
            <div className="sidebar">
                <header>
                    <svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
                         viewBox="0 0 83.6 105.5" className={"sidebar-logo"}>
<path d="M53,48.2c-4.7,0.6-8.5,0.9-12.2,1.5c-3.3,0.5-4,0.2-4.1-3.2c-0.1-4.3,0-8.5,0-12.8c-1-0.2-1.4-0.4-1.8-0.3
	c-9.5,1.8-18.9,3.6-28.4,5.4c-2.3,0.4-3.1,1.4-2.9,3.8c1,10.1,1.8,20.3,2.6,30.4c0.2,2.6,0.8,5.4,0.2,7.9c-1.8,8,0.7,15.7,1.1,23.6
	c-0.5-1.4-1-2.8-1.4-4.3C1.5,80.9-0.3,61.4,0.6,41.6C0.7,40,0.3,38.4,0,36c4.8-1.4,10.3-2.9,16.3-4.6c-2.5-8-2.2-16-2.1-23.4
	c2,0,3.4,0.2,4.7,0c7.6-1.2,15.1-2.6,22.7-3.9c7-1.2,14-2.1,20.9-3.4c7.8-1.5,8.8-0.9,10,7.2c2.3-0.6,4.7-1,6.9-1.8
	c1.7-0.6,2.3,0.2,2.8,1.5c0.1,0.2,0.1,0.4,0.1,0.5c2.3,10,1.9,9-6.7,11.3c-0.8,0.2-1.5,0.5-2.2,0.7c0.5,8.2,1,16.3,1.4,24.3
	c0.3,5.5,0.6,11.1,1.1,16.6c0.1,1,0.9,2,1.7,3.6c-0.5,0.8-1.2,2.1-3.4,2.7c-5.7,1.6-11.2,3.9-16.7,6c-0.5,0.2-1.2,1.2-1.1,1.8
	c0.1,3.4,0.3,6.9,0.7,10.3c0.1,0.7,1,1.3,1.6,1.9c-0.4,0.7-0.8,1.5-1.3,2.4c0.2,0.2,0.4,0.4,0.5,0.6c0.9-0.5,1.8-1.1,2.7-1.3
	c0.7-0.2,1.6,0,2.4,0c-0.3,0.8-0.5,1.8-1.1,2.2c-1.8,1.2-3.7,2.3-5.8,3c-4.2,1.6-8.4,3-12.6,4.3c-6.3,2-12.7,4-19.1,5.6
	c-3.7,0.9-7.7,1.1-11.5,1.5c-1,0.1-2-0.4-2.9-0.6c0-0.3-0.1-0.6-0.1-0.8c0.9-0.4,1.8-0.8,2.7-1.1c13.8-4.1,27.6-8,40.6-14.2
	c1.4-0.7,2-1.3,1.8-3c-0.8-7.8-1.6-15.7-2.1-23.6C52.8,57.7,53,53.3,53,48.2z M73.6,63.8c-6.5-20.2-1.9-41-6.5-61
	c-0.5,0.1-1.1,0.2-1.6,0.3c-7,1.6-13.9,3.5-20.9,4.8c-6.7,1.2-13.5,1.5-20.2,2.7c-6.1,1-6.1,1.3-4.9,7.2c0.1,0.5,0.2,1.1,0.3,1.6
	c0.5,3.5,0.9,6.9,1.4,10.7c5.5-0.8,10.8-1.5,16-2.3c3.5-0.6,6.4,0.1,8.6,3.2c2.3,3.2,4.7,6.2,7.1,9.3c1.3,1.6,2.7,3.1,4.1,4.6
	c2.5,7.4-2,15.3,0.2,23.6c1.6-0.7,3-1.2,4.4-1.9c1.2-0.6,2.3-1.7,3.6-2C67.7,64.2,70.3,64.1,73.6,63.8z M39.5,47.4
	c4.3-0.6,8.1-1,11.9-1.5c-3.6-4.8-7.2-9.7-10.9-14.5c-0.3-0.3-1-0.6-1.3-0.5c-0.4,0.1-0.8,0.8-0.8,1.2
	C38.6,37.1,39.1,42.1,39.5,47.4z M73.7,17.3c7-1.6,8.1,0.1,6.1-8.7C73.4,8.9,71.9,10.9,73.7,17.3z M57.6,90.8
	c-2.3-1.5-7.4,0.5-10.5,3.6C50.8,93.1,53.9,92.1,57.6,90.8z"/>
                        <path d="M47.3,70.6c-9.9,3.1-19.9,6.2-29.8,9.3c-1.2-2.5-0.5-3.9,1.7-4.5c7.8-2.3,15.6-4.7,23.5-6.8c1.4-0.4,3.1,0.3,4.7,0.5
	C47.3,69.6,47.3,70.1,47.3,70.6z"/>
                        <path d="M12.8,63.9c9.1-4.8,18.8-6.3,28.4-8.2c1.2-0.3,2.5-0.3,3.8-0.3c0.6,0,1.2,0.5,1.9,0.8c-0.5,0.6-0.8,1.5-1.4,1.7
	c-3.3,0.9-6.6,1.9-10,2.5c-7,1.3-14.1,2.4-21.2,3.6C13.8,64,13.3,63.9,12.8,63.9z"/>
                        <path d="M11.6,49.8c0.9-0.4,1.8-0.9,3-1.4c-1.3-2.5,0.1-2.8,2.2-3.1c5-0.8,9.9-2,14.9-2.9c0.8-0.2,1.7,0.2,2.6,0.4
	c-0.6,0.6-1,1.5-1.7,1.7c-5.9,2-11.9,3.9-17.9,5.7c-1,0.3-2.1,0.1-3.1,0.2C11.6,50.1,11.6,49.9,11.6,49.8z"/>
                        <path d="M42.5,83c-7.3,3.6-14.8,6.4-23,7.5c2.4-3.6,2.4-3.7,6.1-4.6c5.5-1.4,11-2.7,16.5-4.1C42.2,82.2,42.3,82.6,42.5,83z"/>
                        <path d="M30.9,19.8c3.4-0.9,6.8-2,10.3-2.7c3.7-0.7,7.5-1,11.3-1.4c0.3,0,0.6-0.1,0.8,0c0.7,0.4,1.4,0.8,2.1,1.2
	c-0.6,0.3-1.3,0.9-2,1c-6.2,1.1-12.4,2.1-18.7,3C33.6,21,32.4,21,31.2,21C31.1,20.6,31,20.2,30.9,19.8z"/>
</svg>
                </header>
                <ul>
                    <li><NavLink className={(navData) => classNames({active: navData.isActive})} to={'/dashboard'}><CollectionIcon className={iconStyle}/>Dashboard</NavLink></li>
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
