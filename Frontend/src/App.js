import React, {useState, useEffect} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import axios from 'axios';

import Home from './components/pages/home/Home'
import Features from './components/pages/features/Features';
import Pricing from './components/pages/pricing/Pricing';
import ProductDetail from './components/pages/productdetail/ProductDetail';
import Compare from './components/pages/compare/Compare';
import WishList from './components/pages/wishlist/WishList';
import Cart from './components/pages/cart/Cart';
import Order from './components/pages/order/Order';
import ProductList from './components/pages/product/ProductList';
import MyAccount from './components/pages/myaccount/MyAccount';
import ReduxSample from './components/pages/reduxsample/ReduxSample';
import Test from './components/pages/test/Test';

import "./assets/css/style.css";
import "./assets/css/mystyle.css";
// import "./assets/css/layout.css";
import "./assets/css/animate.css";
import "./assets/css/bootstrap.css";
import "./assets/css/googlefont.css";
import "./assets/icons8/css/line-awesome.min.css";
import ToTop from './utilities/ToTop';

import { Provider } from 'react-redux';
import store from './redux/Store';


import CustomAxios from './CustomAxios';

function App()  {

  // IP주소 변수 선언
  const [ip, setIp] = useState('');

  // IP주소 값을 설정합니다.
  function callback(data) {
    setIp(data);
  }

  // // 첫번째 렌더링을 다 마친 후 실행합니다.
  useEffect(
    () => {
  //     // 클라이언트의 IP주소를 알아내는 백엔드의 함수를 호출합니다.
      CustomAxios('/users', callback);
    }, []
  );

  return (
    <BrowserRouter>
      <header className="App-header">
        이 기기의 IP주소는 {ip}입니다.
      </header>
      <ToTop>
        <Switch>   
          <Route exact path="/"><Home /></Route>
          <Route exact path="/features"><Features /></Route>
          <Route exact path="/pricing"><Pricing /></Route>
          <Route exact path="/productdetail/:id"><ProductDetail /></Route>
          <Route exact path="/compare"><Compare /></Route>
          <Route exact path="/wishlist"><WishList /></Route>
          <Route exact path="/cart"><Cart /></Route>
          <Route exact path="/order"><Order /></Route>
          <Route exact path="/productlist"><ProductList /></Route>
          <Route exact path="/myaccount"><MyAccount /></Route>
          <Route exact path="/test"><Test/></Route>
          <Provider store={store}>
            <Route exact path="/reduxsample"><ReduxSample /></Route>
          </Provider>
        </Switch>
      </ToTop>
    </BrowserRouter>
  );
};

export default App;
