import React from 'react';
import {
    AdjustmentsIcon,
    BookmarkIcon,
    PencilAltIcon,
    ClockIcon,
    ChatIcon,
    CollectionIcon
} from '@heroicons/react/outline';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../util/hooks';

export default function Sidebar() {
    const iconStyle = 'h-7 w-7 pb-1 inline pr-3';
    const categories = useAppSelector(state => state.data.categories);

    return (
        <div className={'fixed z-50'}>
            <input type="checkbox" id="check"/>
            <label htmlFor="check">
                <p id="btn">→</p>
                <p id="cancel">←</p>
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
                                <Link to={`/category/${c.id}`} key={c.id}>
                                    {/*<li key={c.title}><a href={'#'}>*/}
                                    {c.title}
                                    {/*</a></li>*/}
                                </Link>
                            )
                        )
                    }
                    {/*TODO link categories to category pages*/}
                </ul>
            </div>
        </div>
    );
}
