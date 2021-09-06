import React, {Fragment} from "react";

import Header from "../../layout/Header";
import Bread from "./Bread";
import ProductTop from "../../elements/widgets/product/productTop/ProductTop";
import Footer from "../../layout/Footer";
import DetailInformation from "./DetailInformation";

export default function ProductNew() {
  return (
    <Fragment>
      <Header />
      <Bread productName = "상품등록" />
      <ProductTop />
      <DetailInformation />
      <Footer />
    </Fragment>
  );
}