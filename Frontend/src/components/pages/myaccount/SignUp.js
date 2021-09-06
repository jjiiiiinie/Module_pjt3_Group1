import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

export default function SignUp() {

  // const history = useHistory();
  // const [ usersDatas, setUsersDatas ] = useState([]);
  const [ values, setValues ] = useState({
    email: '',
    pwd: '',
    confirmPwd: '',
    tel: '',
    name: '',
  })

  // const [ guideTxts, setGuideTxts ] = useState({
  //   emailGuide: '이메일 형식에 맞게 작성해 주세요.',
  //   pwdGuide: '숫자,문자,특수문자를 조합해서 최소 8자 이상 입력해 주세요.',
  //   confirmpwdGuide: '한 번 더 입력해 주세요.',
  //   nameGuide: '',
  //   phoneGuide: '숫자만 입력해 주세요.( ex : 01098765432 )'
  // });

  // const [ error, setError ] = useState({
  //   emailError: '',
  //   pwdError: '',
  //   confirmpwdError: '',
  //   nameError: '',
  //   telError: ''
  // })

  // const isEmail = email => {
  // const emailRegex = /^(([^<>()\].,;:\s@"]+(\.[^<>()\].,;:\s@"]+)*)|(".+"))@(([^<>()¥[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i; 

  //   return emailRegex.test(email);
  // };

  // const isPwd = pwd => {
  //   const pwdRegex = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*#?&]).*$/;

  //   return pwdRegex.test(pwd);
  // }

  // const isTel = tel => {
  //   const telRegex = /^[0-9\b -]{0,13}$/;
  //   return telRegex.test(tel)
  // }

  // const confirmPwd = (pwd, confirmPwd) => {
  //   return pwd === confirmPwd
  // }

  // const onTextCheck = () => {
  //   let emailError = "";
  //   let pwdError = "";
  //   let confirmpwdError = "";
  //   let nameError = "";
  //   let telError = "";

    // if (!isEmail(values.email)) emailError = "email 형식이 아닙니다.";
    // if (!isPwd(values.pwd)) pwdError = "비밀번호 조건을 만족 할 수 없습니다.";
    // if (!confirmPwd(values.pwd, values.confirmPwd)) confirmpwdError = "비밀번호가 일치하지 않습니다.";
    // if (!isTel(values.tel)) telError = "휴대폰 형식이 아닙니다.";
  //   setError({
  //     emailError, pwdError, confirmpwdError, nameError, telError
  //   })
  //   if (emailError || pwdError || confirmpwdError || nameError || telError ) return false;
  //   return true;
  // }

  // var process = require('../../../myprocess.json')
  
  // useEffect(()=>{
  //   fetch(`http://${process.IP}:${process.PORT}/users`)
  //   .then(res => {
  //       return res.json();
  //   })
  //   .then(data => {
  //     setUsersDatas(data);
  //   });
  // },[process.IP, process.PORT]);

  const join = (e) => {
    // let emailpattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    let emailpattern = /^(([^<>()\].,;:\s@"]+(\.[^<>()\].,;:\s@"]+)*)|(".+"))@(([^<>()¥[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    let pwdpattern = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*#?&]).*$/;
    let telpattern = /^[0-9\b -]{0,13}$/;
    let url = '/users'
    let User = {
      'email' : this.email,
      'pwd' : this.pwd,
      'name' : this.name,
      'tel' : this.tel
    }
    var config={
      header:{
        'Content-Type' : 'application/json',
      }
    };
    if(emailpattern.test(this.email)==false){
      alert("이메일 형식에 맞게 작성해 주세요.")
      return;
    }
    if(pwdpattern.test(this.email)==false){
      alert("숫자,문자,특수문자를 조합해서 최소 8자 이상 입력해 주세요.")
      return;
    }
    if(telpattern.test(this.email)==false){
      alert("숫자만 입력해 주세요.( ex : 01098765432 )")
      return;
    }
    axios.post(url, User, config)
    .then((res)=>{
      // alert("회원가입완료")
      console.log(res);
    }).catch(error => {
      console.log(error);
    })
  }
  // const handlePutUserList = (e) => {
    
  //   e.preventDefault();
  //   const valid = onTextCheck();
  //   if (!valid) console.error("retry");
  //   else {
  //     fetch(`http://${process.IP}:${process.PORT}/users`,{
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //       email: values.email,
  //       pwd: values.pwd,
  //       name: values.name,
  //       tel: values.tel
  //       }),
  //     }).
  //     axios.post('/user-service/users', body ,headers)
	// 		.then((res)=>{
	// 			res
  //       alert("회원가입완료")
  //     })
  //     // then(
  //     //   alert("success"),
  //     //   history.push('/')
  //     // )
  //   }
  // }

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
          <h3 className="panel-title"><span>1 .</span> Edit your account information </h3>
        </button>
      </div>
      <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
        <div className="card-body">
          {/* <form onSubmit={handlePutUserList}> */}
          <form onSubmit={join}>
            <div className="myaccount-info-wrapper">
              <div className="account-info-wrapper">
                <h4>회원가입</h4>
                {/* <h5>Sign Up</h5> */}
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
                  <div>
                    <button>중복확인</button>
                  </div>
                </div>
                {/* {
                  error.emailError ? 
                    <div style={{color:"red", fontSize:"10px", margin:"-5px 0 10px 15px"}}>
                      {error.emailError}
                    </div> :
                    <div style={{color:"grey", fontSize:"10px", margin:"-5px 0 10px 15px"}}>
                      {guideTxts.emailGuide}
                    </div>
                } */}
                {/* <div className="col-lg-12 col-md-12">
                  <div className="billing-info">
                    <label>Id</label>
                    <input 
                      type="text"
                      name="userId"
                      value={values.userId}
                      onChange={handleChangeForm}
                    />
                  </div>
                </div>
                {
                  error.userIdError ? 
                    <div style={{color:"red", fontSize:"10px", margin:"-5px 0 10px 15px"}}>
                      {error.userIdError}
                    </div> :
                    <div style={{color:"grey", fontSize:"10px", margin:"-5px 0 10px 15px"}}>
                      {guideTxts.userGuide}
                    </div>
                } */}
                <div className="col-lg-12 col-md-12">
                  <div className="billing-info">
                    <label>Pwd</label>
                    <input 
                      type="password"
                      name="pwd"  
                      value={values.pwd}
                      onChange={handleChangeForm}
                    />
                  </div>
                </div>
                {/* {
                  error.pwdError ? 
                    <div style={{color:"red", fontSize:"10px", margin:"-5px 0 10px 15px"}}>
                      {error.pwdError}
                    </div> :
                    <div style={{color:"grey", fontSize:"10px", margin:"-5px 0 10px 15px"}}>
                      {guideTxts.pwdGuide}
                    </div>
                } */}
                <div className="col-lg-12 col-md-12">
                  <div className="billing-info">
                    <label>Comfirm Password</label>
                    <input 
                      type="password"
                      name="confirmPwd"
                      value={values.confirmPwd}
                      onChange={handleChangeForm}
                    />
                  </div>
                </div>
                {/* {
                  error.confirmpwdError ? 
                    <div style={{color:"red", fontSize:"10px", margin:"-5px 0 10px 15px"}}>
                      {error.confirmpwdError}
                    </div> :
                    <div style={{color:"grey", fontSize:"10px", margin:"-5px 0 10px 15px"}}>
                      {guideTxts.confirmpwdGuide}
                    </div>
                } */}
                <div className="col-lg-12 col-md-12">
                  <div className="billing-info">
                    <label>Name</label>
                    <input 
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChangeForm}
                    />
                  </div>
                </div>
                {/* {
                  error.nameError ? 
                    <div style={{color:"red", fontSize:"10px", margin:"-5px 0 10px 15px"}}>
                      {error.nameError}
                    </div> :
                    <div style={{color:"grey", fontSize:"10px", margin:"-5px 0 10px 15px"}}>
                      {guideTxts.nameGuide}
                    </div>
                } */}
                
                <div className="col-lg-12 col-md-12">
                  <div className="billing-info">
                    <label>Tel</label>
                    <input 
                      type="tel"
                      name="tel"
                      value={values.tel}
                      onChange={handleChangeForm}
                    />
                  </div>
                </div>
                {/* {
                  error.telError ? 
                    <div style={{color:"red", fontSize:"10px", margin:"-5px 0 10px 15px"}}>
                      {error.telError}
                    </div> :
                    <div style={{color:"grey", fontSize:"10px", margin:"-5px 0 10px 15px"}}>
                      {guideTxts.telGuide}
                    </div>
                } */}
              </div>
              
              <div className="billing-back-btn">
                <div className="billing-btn">
                  <button type="submit">가입하기</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}