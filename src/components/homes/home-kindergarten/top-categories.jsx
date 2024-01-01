import Link from 'next/link';
import { useEffect, useState } from 'react';
import firebaseInitialization from '../../../firebase/firebase.init';
import { getDatabase, onValue, ref } from 'firebase/database';

const category_contents = {
    title: 'Top Categories',
    text: 'Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore',
}

const { title, text} = category_contents;

const TopCategories = () => {


    const [category,setCategory] = useState([]);
    const database=getDatabase(firebaseInitialization())

useEffect(()=>{
  const query = ref(database,"Category")
  return onValue(query,(snapshot)=>{
    const data = snapshot.val();

    if(snapshot.exists()){
        Object.values(data).map((category)=>{
            setCategory((categories)=>[...categories,category])
        })
    }
  })
},[])
    return (
        <div className="edu-categorie-area categorie-area-2 edu-section-gap">
            <div className="container">
                <div className="section-title section-center" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                    <h2 className="title">{title}</h2>
                    <span className="shape-line"><i className="icon-19"></i></span>
                    <p>{text}</p>
                </div>

                <div className="row g-5">
                    {category.map((item, i) => (
                        <div key={i} className="col-lg-4 col-md-6">
                            <div className={`categorie-grid categorie-style-2 ${item.color}`}>
                                <div className="icon">
                                    <i className={item.icon}></i>
                                </div>
                                <div className="content">
                                    <Link href={`${item.link}`}>
                                        <a>
                                            <h5 className="title">{item.title}</h5>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TopCategories;