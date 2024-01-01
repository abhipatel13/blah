import { getDatabase, onValue, ref } from 'firebase/database';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import firebaseInitialization from '../../../firebase/firebase.init';


const OffCanvas = ({ isOpen, setIsOpen }) => {

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

    const [navTitle, setNavTitle] = useState('')

    const openMobileMenu = (menu) => {
        if(navTitle === menu){
            setNavTitle('')
        }
        else {
            setNavTitle(menu)
        }
    }
    return (
        <>
            <div className={`popup-mobile-menu ${isOpen?'active':''}`}>
                <div className="inner">
                    <div className="header-top">
                        <div className="logo">
                            <Link href="/">
                                <a>
                                    <img className="logo-light" src='/assets/images/logo/logo-dark.png' alt="logo" />
                                    <img className="logo-dark" src='/assets/images/logo/logo-white.png' alt="logo" />
                                </a>
                            </Link>
                        </div>

                        <div className="close-menu" onClick={() => setIsOpen(false)}>
                            <button className="close-button">
                                <i className="icon-73"></i>
                            </button>
                        </div>
                    </div>

                    <div className="mm-menu">
                        <ul>
                            {menuData.map((menu, i) => (
                                <li key={i} className={!menu.submenus ? '' : navTitle === menu?.title ? 
                                "has-droupdown active" : "has-droupdown"}>
                                    {menu.submenus && <button  onClick={() => openMobileMenu(menu.title)}>{menu.title} </button>}

                                    {!menu.mobile_pages_menu &&
                                        <ul className={navTitle === menu?.title ? "sub-menu active" : "sub-menu"}>
                                            {menu?.submenus?.map((sub,i) => (
                                                <li key={i}><Link href={`${sub.link}`}>{sub.title}</Link></li>
                                            ))}
                                        </ul>
                                    }

                                    {menu.mobile_pages_menu &&
                                        <ul className={navTitle === menu?.title ? "sub-menu active" : "sub-menu"}>
                                            {menu?.mobile_pages_menu?.map((sub,i) => (
                                                <li key={i}><Link href={`${sub.link}`}>{sub.title}</Link></li>
                                            ))}
                                        </ul>
                                    }
                                    
                                    {!menu.submenus && <Link href={menu.link}>{menu.title}</Link>}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* overlay start */}
            <div onClick={() => setIsOpen(false)} className={`body-overlay ${isOpen ? 'apply' : ''}`}></div>
            {/* overlay end */}
        </>
    )
}

export default OffCanvas;