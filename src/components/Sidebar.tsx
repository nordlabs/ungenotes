import React from 'react';
import {
    AdjustmentsIcon,
    BookmarkIcon,
    PencilAltIcon,
    ClockIcon,
    ChatIcon,
    CollectionIcon
} from '@heroicons/react/outline';
import {Link, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../util/hooks';
import {addCategory, toggleSidebar} from '../redux/dataSlice';
import classNames from 'classnames';
import {PlusIcon} from '@heroicons/react/solid';
import {CategoryHelper} from '../util/CategoryHelper';

export default function Sidebar(): JSX.Element {
    const iconStyle = 'h-7 w-7 pb-1 inline pr-3';
    const categories = useAppSelector(state => state.data.categories);
    const sidebarOpened = useAppSelector(state => state.data.sidebarOpened);
    const selectedCategory = useAppSelector(state => state.data.selectedCategory);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <div className={'fixed z-50'}>
            <input type="checkbox" id="check" defaultChecked={sidebarOpened} />
            <label htmlFor="check">
                <p id="btn" onClick={() => dispatch(toggleSidebar())}>→</p>
                <p id="cancel" onClick={() => dispatch(toggleSidebar())}>←</p>
            </label>
            <div className="sidebar">
                <header>ungenotes</header>
                <ul>
                    <li><a href="#"><CollectionIcon className={iconStyle}/>Dashboard</a></li>
                    <li><a href="#"><PencilAltIcon className={iconStyle}/>Notizen</a></li>
                    <li><a href="#"><BookmarkIcon className={iconStyle}/>Favoriten</a></li>
                    <li><a href="#"><ClockIcon className={iconStyle}/>Historie</a></li>
                    <hr/>
                    <li><a href="#"><AdjustmentsIcon className={iconStyle}/>Einstellungen</a></li>

                    <li><a href="#"><ChatIcon className={iconStyle}/>Kontakt</a></li>
                    <hr/>
                    <li><h6>KATEGORIEN</h6></li>
                    {
                        categories.map(
                            (c) => (
                                <li key={c.id} className={classNames({active: selectedCategory === c.id, empty: c.title.trim() === ''})}>
                                    <Link to={`/category/${c.id}`}>
                                        {
                                            c.title.trim() !== '' ?
                                                c.title :
                                                '<kein Titel>'
                                        }
                                    </Link>
                                </li>
                            )
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
