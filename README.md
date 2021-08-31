<h1 align="center"><b>Nomalog v1.0.0</b></h1>
<p align="center">
<img src="https://img.shields.io/badge/made by-noma-red">
<img src="https://img.shields.io/badge/JS-77.0%25-blueviolet">
<img src="https://img.shields.io/badge/React-17.0.2-blue">
<img src="https://img.shields.io/badge/Open%20Source-%F0%9F%A7%A1-brightgreen">
</p>
  
<img width="100%" alt="thumbnail" src="https://user-images.githubusercontent.com/69305320/129465117-b1274c03-ef86-49d6-bb79-bf396f9ae3bf.PNG">
  
<h2 align="center"><a href="https://nomalog.netlify.app/"><b>Live Demo</b></a></h2>    


# **📝 Description**
MERN 스텍으로 CRUD를 구현한 블로그 프로젝트입니다. 네이버, 구글, 카카오, 깃허브의 Oauth를 활용하여 사용자가 편하게 소셜 로그인이 가능하도록 하였고, 이 외에 일반 회원 가입 및 로그인 기능을 통해서도 서비스 이용이 가능합니다. 

로그인을 하면 하나의 블로그 공간(https://nomalog.netlify.app/@닉네임)을 가지게 되고 자유롭게 포스팅을 생성, 수정 및 삭제할 수 있습니다. 또한 포스팅을 잘 정리할 수 있게 폴더로 구분할 수 있게 하였습니다.

사용자는 자신의 공간을 설명할 소개글도 작성할 수 있고, 프로필 사진도 업로드 할 수 있습니다. 블로그 홈 화면에는 모든 사용자들이 작성한 글들이 공유됩니다. 로그인 하지 않은 일반 사용자들도 다른 사용자들이 작성한 포스팅들을 자유롭게 볼 수 있습니다.

# **✨New ! version 2**
1. 사이드 메뉴 하단에 현재 위치에 기반한 날씨를 제공합니다.

    <img width="157" alt="날씨" src="https://user-images.githubusercontent.com/69305320/131519085-466f3a49-850a-4ebe-8a8d-e878f4a44479.PNG">

2. 블로그 글쓰기 에디터 기능을 다양화하였습니다.

    <img width="606" alt="에디터 기능" src="https://user-images.githubusercontent.com/69305320/131519163-ab8d1968-2a57-4a4c-b139-7cbe6b40c907.PNG">

    
    ➕ 추가된 기능: 사진 업로드, 임베디드 동영상, 코드 블럭, 글자 효과(굵게, 이택리체, 밑줄, 지우기), 인용문, 글자 크기, 글자 색상 및 배경색, 리스트, 정렬


3. 포스팅에 댓글 기능을 추가하였습니다. 

    <img width="642" alt="댓글" src="https://user-images.githubusercontent.com/69305320/131519126-5789eee9-f280-41e8-bf43-b63bf61f22cd.PNG">

4. 게시글에 썸네일 기능을 추가하였습니다.  

    <img width="612" alt="썸네일업로드" src="https://user-images.githubusercontent.com/69305320/131519140-22cae2ef-02e4-45dc-ac9b-62072df5e256.PNG">

5. 기존에 해당 게시글 저자의 블로그 홈으로 갈 수 없었던 점을 개선하였습니다. 이제는 사용자 아이디 클릭시 해당 사용자 블로그 홈으로 바로 갈 수 있습니다. 
6. 불필요한 렌더링을 줄여 속도를 개선하였습니다.
7. 헤더와 브라우저 탭 부분에 고유한 로고를 넣어주었습니다. 

### Bug Fix
1. 게시글 삭제 후 올바르지 않은 경로로 이동되는 것을 수정하였습니다.


# **🔍 About the project**
자세한 기능 및 코드 설명은 조금 더 성능 및 기능이 안정화되면 정리할 예정입니다.
### **💻 Development Environment** 
: NodeJS, express, MongoDB, Moogoose, AWS S3, React, React Router, PostCSS

### **🚀 Deployment**
- front : Netlify
- back : Heroku 



# **🔔 Additional packages used**
```
//frontend
"react-tooltip-lite": "^1.12.0",
"react-router-dom": "^5.2.0",
"netlify-cli": "^6.2.3",
"react-google-login": "^5.2.2",
"react-responsive": "^9.0.0-beta.3",
"axios": "^0.21.1",

//backend
"@babel/runtime": "^7.15.3",
"aws-sdk": "^2.968.0",
"axios": "^0.21.1",
"bcrypt": "^5.0.1",
"cookie-parser": "^1.4.5",
"cors": "^2.8.5",
"dotenv": "^10.0.0",
"express": "^4.17.1",
"jsonwebtoken": "^8.5.1",
"mongoose": "^5.13.3",
"multer": "^1.4.2",
"multer-s3": "^2.9.0"
"@babel/cli": "^7.14.8",
"@babel/core": "^7.15.0",
"@babel/node": "^7.14.9",
"@babel/plugin-transform-runtime": "^7.15.0",
"@babel/preset-env": "^7.14.7",
"morgan": "^1.10.0",
"nodemon": "^2.0.12"
 ```
