import React, {Component} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '../redux/store';
import {AdjustmentsIcon,BookmarkIcon,PencilAltIcon,ClockIcon,ChatIcon,CollectionIcon} from '@heroicons/react/outline';

class Sidebar extends Component<SidebarProps> {
   public render(){
       const iconStyle='h-7 w-7 pb-1 inline pr-3';

       return(
           <div className={'fixed z-50'}>
               <input type="checkbox" id="check" />
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
                       <hr />
                       <li><a href="#"><AdjustmentsIcon className={iconStyle}/>Einstellungen</a></li>

                       <li><a href="#"><ChatIcon className={iconStyle}/>Kontakt</a></li>
                       <hr />
                       <li><h6>KATEGORIEN</h6></li>
                       {
                           this.props.categories.map((c) => <li key={c.title}><a href={'#'}>{c.title}</a></li>)
                       }
                       {/*TODO link categories to category pages*/}
                   </ul>
               </div>
           </div>
       );
   }
}


const connector = connect(
    (state: RootState) => {
        return {
            categories: state.data.categories ?? [],
        };
    },
);

type SidebarProps = ConnectedProps<typeof connector>;

export default connector(Sidebar);