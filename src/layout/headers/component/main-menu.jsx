import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getDatabase, onValue, ref } from 'firebase/database';
import firebaseInitialization from '../../../firebase/firebase.init';


console.log("hi");
const MainMenu = () => {

    const [menuData, setMenuData] = useState([]);
    const database=getDatabase(firebaseInitialization())
    useEffect(()=>{
        const query = ref(database,"Menu")
        return onValue(query,(snapshot)=>{
          const data = snapshot.val();
      
          if(snapshot.exists()){
              Object.values(data).map((menu)=>{
                  setMenuData((menus)=>[...menus,menu])
              })
          }
        })
      },[])

    return (
        <ul className="mainmenu">
            {menuData.map((menu, i) => (
                <li key={i} className="has-droupdown"><a href="#">{menu.title}</a>
                    {!menu.mega_menu && 
                        <ul className="submenu">
                            {menu.submenus?.map((nav, i) => (
                                <li key={i}>
                                    <Link href={`${nav.link}`}>
                                        <a>
                                            {nav.title}
                                            {nav?.hot && <span className="badge-1">hot</span>}
                                            {nav?.new && <span className="badge">new</span>}
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    }
                    {menu.mega_menu && 
                        <ul className="mega-menu">
                            {menu.submenus?.map((nav, i) => (
                                <li key={i}>
                                    <h6 className="menu-title">{nav.title}</h6>
                                    <ul className="submenu mega-sub-menu-01">
                                        {nav.mega_submenu.map((m, i) => (
                                            <li key={i}>
                                                <Link href={`${m.link}`}>
                                                    <a>{m.title}</a>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    }
                </li>
            ))}
        </ul>
    )
}

export default MainMenu;