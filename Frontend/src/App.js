import React, {useState, useEffect} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/pages/home/Home'
// import Features from './components/pages/features/Features';
import Pricing from './components/pages/pricing/Pricing';
import ProductDetail from './components/pages/productdetail/ProductDetail';
// import Compare from './components/pages/compare/Compare';
import WishList from './components/pages/wishlist/WishList';
import Cart from './components/pages/cart/Cart';
import Order from './components/pages/order/Order';
import ProductList from './components/pages/product/ProductList';
import MyAccount from './components/pages/myaccount/MyAccount';
import ReduxSample from './components/pages/reduxsample/ReduxSample';
import Test from './components/pages/test/Test';
import ProductNew from './components/pages/productnew/ProductNew';
import ProductNewDetail from './components/pages/productnew/ProductNewDetail';

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

import axios from 'axios';


function App()  {
  axios.defaults.baseURL = 'http://10.10.20.52:8000' // Tmax wifi 광채님 서버

  return (
    <BrowserRouter>
      <ToTop>
        <Switch>             
          <Route exact path="/"><Home /></Route>
          {/* <Route exact path="/features"><Features /></Route> */}
          <Route exact path="/pricing"><Pricing /></Route>
          <Route exact path="/productdetail/:id"><ProductDetail /></Route>
          {/* <Route exact path="/compare"><Compare /></Route> */}
          <Route exact path="/wishlist"><WishList /></Route>
          <Route exact path="/cart"><Cart /></Route>
          <Route exact path="/order"><Order /></Route>
          <Route exact path="/productlist"><ProductList /></Route>
          <Route exact path="/myaccount"><MyAccount /></Route>
          <Route exact path="/test"><Test/></Route>
          <Route exact path="/productnew"><ProductNew /></Route>
          <Route exact path="/productnewdetail"><ProductNewDetail /></Route>
          <Provider store={store}>
            <Route exact path="/reduxsample"><ReduxSample /></Route>
          </Provider>
        </Switch>
      </ToTop>
    </BrowserRouter>
  );
};

export default App;
