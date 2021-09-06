import React, { useState, useEffect } from 'react';

export default function Brand(){

  var process = require('../../../../myprocess.json')
  const [ newBrand, setNewBrand ] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:3006/brand")
  //   .then(res => {
  //     return res.json();
  //   })
  //   .then(data => {
  //     setNewBrand(data);
  //   })
  //   // .catch(error => console.log(error));
  // },[]);
  
  const brandList = newBrand.map(item => (
    <div className="col-12 col-md-3" key={item.id}>
      <div className="row">
        <div className="col-12 col-md-4 brandImg"><i className={item.img}></i></div>
          <div className="col-12 col-md-auto">
            <p className="brandTitle">{item.name}</p>
            <p className="brandText">{item.content}</p>
          </div>
      </div>
    </div>
  )).slice(0,4)

  return(
    // First Contents
    <section id="brand">
      <div className="container">
        <div className="row">
          { brandList }
        </div>
      </div>
    </section>
  );
}