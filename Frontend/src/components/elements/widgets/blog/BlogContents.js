import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import blogData from '../../../../db/blog.json';
// import img1 from '../../../../assets/blog_img/1.jpg';

export default function BlogContents() {

  const [ newData, setnewData ] = useState(blogData);

  const blogList = newData.map(item => (
    <div className="col-12 col-md-4 mb-4" key={item.id}>
      <Link to={`/blogdetail/${item.id}`}><div className="blogImg" style={{backgroundImage:`url(${item.image})`, backgroundSize:"cover"}}></div></Link>
      <div className="blogTxt">
        <Link to={`/blogdetail/${item.id}`}><p className="blogTitle">{item.title}</p></Link>
        <Link to={`/authordetail/${item.author}`}><p className="blogAuth">{item.author}</p></Link>
        dd
      </div>
    </div>
  ))

  return(
    <div className="row mt-5">
      { blogList }
    </div>
  );
}