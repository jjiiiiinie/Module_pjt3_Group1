import axios from "axios";
import React, { useState } from "react";
// import ProNewDetForm from "./ProNewDetForm";

export default function ProductNewDetail() {

  const [ values, setValues ] = useState({
    productName : '',
    category : '',
    writer : '',
    translator : '',
    publishingCompany : '',
    publishDate : '',
    content : '',
    unitPrice : '',
    deliveryFee : '',
    stock : '',
    pages : '',
    weight : '',
    size : '',
    isbn10 : '',
    isbn13 : ''
  })

  const handleChangeForm = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }
    
  const productcreate = (e) => {
    let url = '/catalog-service/catalogs'
    let Product = {
      'productName' : values.productName,
      'category' : values.category,
      'writer' : values.writer,
      'translator' : values.translator,
      'publishingCompany' : values.publishingCompany,
      'publishDate' : values.publishDate,
      'content' : values.content,
      'unitPrice' : values.unitPrice,
      'deliveryFee' : values.deliveryFee,
      'stock' : values.stock,
      'pages' : values.pages,
      'weight' : values.weight,
      'size' : values.size,
      'isbn10' : values.isbn10,
      'isbn13' : values.isbn13
    }
    var config={
      header:{
        'Content-Type' : 'application/json',
      }
    };
    axios.post(url, Product, config)
    .then((res)=>{
      alert("상품등록완료")
      console.log(res);
    }).catch(err => {
      alert("상품등록실패")
      console.log(err);
    })
  }

  return (
    <div className="shop-area pt-100 pb-100">
      <div className="container">
        <form onSubmit={productcreate}>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <label>책 제목</label>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="책 제목을 입력하세요" name="productName" value={values.productName} onChange={handleChangeForm}/>
                  </div>
                </div>
              </div>
              <div className="product-large-image-wrapper">
                <div className="swiper-container swiper-container-fade swiper-container-initialized swiper-container-horizontal">
                  <div className="swiper-wrapper">
                    <div classN ame="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-next" data-swiper-slide-index="1" style={{width: "0px", opacity: "1"}}>
                      <div className="single-image">
                        <img src="/assets/img/product/fashion/7.jpg" className="img-fluid" alt=""/>
                      </div>
                    </div>
                  </div>
                  <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                </div>
                <button>이미지 등록</button>
              </div>
              <div>
                <label>책 카테고리</label>
                <select className="form-select" aria-label="Default select example" name="category" value={values.category} onChange={handleChangeForm}>
                  <option selected>선택</option>
                  <option value="1">인문</option>
                  <option value="2">역사</option>
                  <option value="3">과학</option>
                </select>
              </div>

              {/* ProNewDetForm에 map 돌려서 수정할 것 */}
              <div>
                <label>글쓴이</label>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="입력해주세요." name="writer" value={values.writer} onChange={handleChangeForm}/>
                </div>
              </div>  
              <div>
                <label>옮긴이</label>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="입력해주세요." name="translator" value={values.translator} onChange={handleChangeForm}/>
                </div>
              </div>
              <div>
                <label>출판사</label>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="입력해주세요." name="publishingCompany" value={values.publishingCompany} onChange={handleChangeForm}/>
                </div>
              </div>
              <div>
                <label>출간일</label>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="연-월-일로 입력해주세요." name="publishDate" value={values.publishDate} onChange={handleChangeForm}/>
                </div>
              </div>
              <div>
                <label>책 내용</label>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="입력해주세요." name="content" value={values.content} onChange={handleChangeForm}/>
                </div>
              </div>
              <div>
                <label>가격</label>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="입력해주세요." name="unitPrice" value={values.unitPrice} onChange={handleChangeForm}/>
                </div>
              </div>
              <div>
                <label>배송비</label>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="입력해주세요." name="deliveryFee" value={values.deliveryFee} onChange={handleChangeForm}/>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div>
                <label>재고</label>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="입력해주세요." name="stock" value={values.stock} onChange={handleChangeForm}/>
                </div>
              </div>
              <div>
                <label>쪽수</label>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="입력해주세요." name="pages" value={values.pages} onChange={handleChangeForm}/>
                </div>
              </div>
              <div>
                <label>무게</label>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="입력해주세요." name="weight" value={values.weight} onChange={handleChangeForm}/>
                </div>
              </div>
              <div>
                <label>크기</label>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="입력해주세요." name="size" value={values.size} onChange={handleChangeForm}/>
                </div>
              </div>
              <div>
                <label>ISBN10</label>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="입력해주세요." name="isbn10" value={values.isbn10} onChange={handleChangeForm}/>
                </div>
              </div>
              <div>
                <label>ISBN13</label>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="입력해주세요." name="isbn13" value={values.isbn13} onChange={handleChangeForm}/>
                </div>
              </div>

              <button type="submit">저장</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}