import React, {Component} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../redux/store";

class Sidebar extends Component<SidebarProps> {

   public render(){
       return(
           <div>
               <input type="checkbox" id="check"></input>
               <label htmlFor="check">
                   <p id="btn">→</p>
                   <p id="cancel">←</p>
               </label>
               <div className="sidebar">
                   <header>ungenotes</header>
                   <ul>
                       <li><a href="#">Dashboard</a></li>
                       <li><a href="#">Notizen</a></li>
                       <li><a href="#">Favoriten</a></li>
                       <li><a href="#">Historie</a></li>
                       <hr></hr>
                       <li><a href="#">Einstellungen</a></li>
                       <li><a href="#">Kontakt</a></li>
                       <hr></hr>
                       <li><h6>KATEGORIEN</h6></li>
                       {/*TODO List categories and link them to category pages*/}
                   </ul>
               </div>
           </div>
       );
   }
}


const connector = connect(
    (state: RootState) => {
        return {
        };
    },
);

type SidebarProps = ConnectedProps<typeof connector>;

export default connector(Sidebar);