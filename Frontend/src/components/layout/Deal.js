import React, { useState } from 'react';
import Title from '../elements/UI/Title';
import Tab from '../elements/UI/TabMenu';
import ProductViews from '../elements/widgets/product/ProductViews';

export default function Deal() {

  const [ categoryName, setCategoryName ] = useState("인문");
  let sliceNumber = 12;
  let columnNumber = 3;
  
  return(
    <section id="deal">
      <div className="container">
        <Title title = "오늘의 책"></Title>
        <Tab 
          setCategoryName = {setCategoryName}
          category = {categoryName} 
        />  
        <ProductViews 
          category = {categoryName}
          sliceNumber = {sliceNumber}
          columnNumber = {columnNumber}
        />
      </div>
    </section>
  );
}