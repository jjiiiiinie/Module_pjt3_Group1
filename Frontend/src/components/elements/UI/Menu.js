import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Menu() {
  
  var process = require('../../../myprocess.json');
  
  const [ menuData, setmenuData ] = useState([]);

  useEffect(() => {
    fetch(`http://${process.IP}:${process.PORT}/menu`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      setmenuData(data);
    })
    // .catch(error => console.log(error));
  },[]);

  const menuList = menuData.map(item => {
    if(menuData.children) {
      return (
        <li key={item.id} className="px-4">
          <Link to={item.url}>{item.name}<i className="fa fa-angle-down"></i></Link>
          <ul className="mega-menu">
            <li>
              <ul>
                {
                  item.children.map(subitem => (
                    <li><Link key={subitem.id} to={subitem.url}>{subitem.name}</Link></li>
                  ))
                }
              </ul>
            </li>
          </ul>
        </li>
      );
    } else {
      return(
        <li key={item.id} className="px-4"><Link to={item.url}>{item.name}</Link></li>
      );
    }
  })

  return(
    <div className="col-xl-8 col-lg-8 d-none d-lg-block">
      <div className="main-menu">
        <nav>
          <ul>
            {menuList}
          </ul>
        </nav>
      </div>
    </div>
    // <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
    //   {menuList}
    // </ul>
  );
}