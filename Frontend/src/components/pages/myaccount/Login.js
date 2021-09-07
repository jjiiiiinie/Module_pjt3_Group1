import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [ values, setValues ] = useState({
    email: '',
    password: '',
  })

  const login = (e) => {
    let url = '/user-service/nosec/login'
    let User = {
      'email':values.email,
      'password':values.password
    }
    
    var config={
      header:{
        'Content-Type' : 'application/json',
      }
    }
    // axios.post(url, User, config, {withCredentials: true})
    axios.post(url, User, config)
    .then((res)=>{
      alert("로그인성공")
      console.log(res);
    }).catch((error)=>{
      alert("로그인실패")
      console.log(error);
    })
  }

  const handleChangeForm = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  return(
    <div className="accordion-item single-my-account mb-20 card">
      <div className="panel-heading card-header" id="panelsStayOpen-headingOne">
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
          <h3 className="panel-title"><span>1 .</span> Login </h3>
        </button>
      </div>
      <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
        <div className="card-body">
          <form onSubmit={login}>
            <div className="myaccount-info-wrapper">
              <div className="account-info-wrapper">
                <h4>로그인</h4>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="billing-info">
                    <label>Email</label>
                    <input 
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChangeForm}
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-md-12">
                  <div className="billing-info">
                    <label>Password</label>
                    <input 
                      type="password"
                      name="password"  
                      value={values.password}
                      onChange={handleChangeForm}
                    />
                  </div>
                </div>
              </div>
              <div className="billing-back-btn">
                <div className="billing-btn">
                  <button type="submit">로그인하기</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}