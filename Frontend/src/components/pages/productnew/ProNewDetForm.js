// import React, {useState} from "react";

// export default function ProNewDetForm() {

//   const [ values, setValues ] = useState({
//     writer : '',
//     translator : '',
//     publishingCompany : '',
//     publishDate : '',
//     content : '',
//     unitPrice : '',
//     deliveryFee : '',
//     stock : '',
//     pages : '',
//     weight : '',
//     size : '',
//     isbn10 : '',
//     isbn13 : ''
//   });

//   const handleChangeForm = (e) => {
//     setValues({
//       ...values,
//       [e.target.name]: e.target.value
//     })
//   }

//   const productname = ['글쓴이', '옮긴이', '출판사', '출간일', '책내용', '가격', '배송비']
//   const productitems = productname.map((productitem, index) => {
//     return (
//       <div key={index}>
//         <label>{productitem}</label>
//         <div className="input-group mb-3">
//           <input type="text" className="form-control" placeholder="입력해주세요." value={values.index} onChange={handleChangeForm}/>
//         </div>
//       </div>
//     )}
//   );

//   const productname2 = ['재고', '쪽수', '무게', '크기', 'ISBN10', 'ISBN13', '키워드', '키워드']
//   const productitems2 = productname2.map((productitem2, index2) => {
//     return (
//     <div key={index2}>
//       <label>{productitem2}</label>
//       <div className="input-group mb-3">
//         <input type="text" className="form-control" placeholder="입력해주세요." value={values.index2} onChange={handleChangeForm}/>
//       </div>
//     </div>
//     )}
//   );

// }