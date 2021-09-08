import React, { useEffect, useState } from 'react';

export default function CartContainer(props) {

  const [ cartDatas, setCartDatas ] = useState([]);

  var process = require('../../../myprocess.json');
  
  // 컴포넌트 렌더링 시 카트 데이터 로드
  useEffect(() => {
    fetch(`http://${process.IP}:${process.PORT}/cart`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      setCartDatas(data);
    })
    // .catch(error => console.log(error));
  },[process.IP, process.PORT]);
    return (
        <div>
            
        </div>
    );
}