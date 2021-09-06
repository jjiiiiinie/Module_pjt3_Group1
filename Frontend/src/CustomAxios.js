import axios from 'axios'; // 엑시오스

export default function CustomAxios(url, callback) {
  axios(
    {
      url: '/user-service' + url,
      method: 'post',

      // 개발 환경에서의 크로스 도메인 이슈를 해결하기 위한 코드, 
      // 운영 환경에 배포할 경우 12~13행 주석처리   
      // 크로스 도메인 이슈: 브라우저에서 다른 도메인으로 URL 요청을 하는 경우 나타나는 보안문제  
      baseURL: 'http://192.168.162.89:8000',
      withCredentials: true,
    }
  ).then(function (response) {
    callback(response.data);
    console.log(response);
  }).catch(error => {
    console.log(error);
  });
}