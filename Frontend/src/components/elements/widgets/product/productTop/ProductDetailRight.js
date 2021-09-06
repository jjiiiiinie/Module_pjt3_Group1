import React from 'react';
import ProDetRgtTop from './ProDetRgtTop';
import ProDetRgtMiddle from './ProDetRgtMiddle';
import ProDetRgtBottom from './ProDetRgtBottom';


export default function ProductDetailRight() {

  return(
    <div className="col-lg-6 col-md-6">
      <div className="product-details-content ml-70">
        <ProDetRgtTop />
        <ProDetRgtMiddle />
        <ProDetRgtBottom />
      </div>
    </div>
  );
}