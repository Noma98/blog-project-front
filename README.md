<h1 align="center"><b>Nomalog v1.6.5</b></h1>
<p align="center">
<img src="https://img.shields.io/badge/made by-noma-red">
<img src="https://img.shields.io/badge/React-17.0.2-blue">
<img src="https://img.shields.io/badge/Express-4.17.1-purple">
<img src="https://img.shields.io/badge/Open%20Source-%F0%9F%A7%A1-brightgreen">
</p>
  
<img width="100%" alt="thumbnail" src="https://user-images.githubusercontent.com/69305320/129465117-b1274c03-ef86-49d6-bb79-bf396f9ae3bf.PNG">
  
<h2 align="center"><a href="https://nomalog.netlify.app/"><b> Live Demo (Click Here!🌟) </b></a></h2>    


<br/>

# 📰 Table Of Contents
1. [ 프로젝트 소개](#1-프로젝트-소개)
2. [ 개발 및 배포 환경](#2-개발-및-배포-환경)
3. [ 어플리케이션 기능](#3-어플리케이션-기능)
    * [ 로그인 및 회원 가입](#1-로그인-및-회원-가입)
    * [ 사용자, 폴더, 게시글 CRUD 기능](#2-사용자-폴더-게시글-crud-기능)
    * [ 검색 기능](#3-검색-기능)
    * [ 접근 제한 기능](#4-접근-제한-기능)
    * [ 모바일 및 태블릿 PC로 이용](#5-모바일-및-태블릿-pc로-이용)
4. [ Version 1.6.5 업데이트](#4-version-165-업데이트)
    * [추가된 기능](#추가된-기능)
    * [버그 수정](#버그-수정)
5. [개발 중 어려웠던 점과 극복 과정](#5-개발-중-어려웠던-점과-극복-과정)
    * [프로젝트 초기 구조 잡기](#1-프로젝트-초기-구조-잡기)
    * [보안을 고려한 로그인 인증 과정](#2-보안을-고려한-로그인-인증-과정)
    * [OAuth 2.0 Authorization code grant](#3-oauth-20-authorization-code-grant)
    * [블로그의 공용화](#4-블로그의-공용화)
    * [CORS 설정과 쿠키 문제](#5-CORS-설정과-쿠키-문제)
<br/>

>Client와 Server가 서로 다른 Github Repository를 갖고 있어, 해당 페이지에서 프로젝트 관련된 모든 내용을 정리합니다.
## 1. 프로젝트 소개

Nomalog는 MERN 스텍으로 CRUD를 구현한 블로그 프로젝트입니다. 네이버, 구글, 카카오, 깃허브의 Oauth를 활용하여 사용자가 편하게 소셜 로그인이 가능하도록 하였고, 이 외에 일반 회원 가입 및 로그인 기능을 통해서도 서비스 이용이 가능합니다. 

처음 서비스에 로그인을 하게 되면 사용자는 하나의 블로그 공간(https://nomalog.netlify.app/@닉네임) 을 가지게 되고, 이곳에서 자유롭게 게시글을 생성, 수정 및 삭제할 수 있습니다. 또한 글들을 일목요연하게 정리할 수 있도록 폴더 기능을 추가하였습니다.

사용자는 설정에서 자신의 블로그를 소개하는 글을 작성할 수 있고, 프로필 사진도 업로드 할 수 있습니다. 블로그 퍼블릭 홈에는 모든 글들이 최신글 순으로 공유됩니다. 로그인 하지 않은 일반 사용자들도 다른 사용자들이 작성한 게시글들을 자유롭게 볼 수 있습니다.



<br/>

## 2. 개발 및 배포 환경
- 💻 Development Environment
: NodeJS, express, MongoDB, Moogoose, AWS S3, React, React Router, PostCSS

- 🚀 Deployment
    - FRONT : Netlify
    - BACK : Heroku 
- 📅 Period
    - 7/19 ~ 8/14 - Version 1.0.0
    - 8/16 ~ 시간 있을 때마다 유지 보수 중

- 🔔 Modules
    - FRONT : lodash, react-quill, react-responsive, react-tooltip-lite, react-google-login, axios, netlify-cli
    - BACK : bcrypt, cookie-parser, cors, jsonwebtoken, multer, multer-s3, aws-sdk, mongoose, axios, dotenv, @babel/runtime, @babel/cli, @babel/core, @babel/node, @babel/plugin-transform-runtime, @babel/preset-env, morgan, nodemon

<br/>

## 3. 어플리케이션 기능
### 1. 로그인 및 회원 가입
#### ✅ 1.1. 깃허브, 카카오 계정을 이용하여 회원가입 없이 쉽게 서비스 이용이 가능합니다. 
>⛔ 구글 및 네이버로 로그인 : 기능 구현은 완료되었으나, 각 브랜드의 검수 절차가 진행 중이어 현재 관리자만 로그인이 가능한 상태입니다.

- 서비스 이용 필수 정보 동의에 사용자가 거부할 경우, 다시 허용할 수 있도록 하거나 다른 로그인 방법을 이용하도록 안내합니다.

    ![네이버 오류처리](https://user-images.githubusercontent.com/69305320/131630786-84af0a1f-5ae2-4d47-b6a6-5f132632e960.gif)
- 정보 제공에 모두 동의했을 경우 로그인이 완료됩니다.
![네이버 로그인](https://user-images.githubusercontent.com/69305320/131630800-7071a46b-1bf6-4b0b-96ef-b267460b2974.gif)
- 만약 소셜 계정으로부터 받아온 닉네임이 이미 서비스에서 사용 중이면, 따로 새로운 닉네임을 입력해야할 수 있습니다.
- 모든 계정은 이메일로 구분되므로 소셜 계정끼리 같은 이메일을 사용 중이라면 하나의 계정으로 통일되어 로그인됩니다. 

#### ✅ 1.2. 소셜 계정이 없다면 일반 회원가입도 가능합니다. 회원 가입시 이메일 중복 검사, 닉네임 중복 및 유효성 검사, 비밀번호 동일 여부 확인이 진행됩니다.

![가입중복검사](https://user-images.githubusercontent.com/69305320/131630956-88732900-a3e7-44bb-8d0f-3f1157e4c0bc.gif)

![가입검증2](https://user-images.githubusercontent.com/69305320/131630978-26da0aca-67a9-4beb-b958-fc3cc27e7f91.gif)
### 2. 사용자, 폴더, 게시글 CRUD 기능
✅ 2.1. 개인 블로그 정보 및 프로필 이미지, 비밀번호 등을 변경할 수 있습니다.

![블로그정보수정](https://user-images.githubusercontent.com/69305320/131630820-9dfbf1da-9574-493c-8c47-3f61fd4c5290.gif)

![아바타변경](https://user-images.githubusercontent.com/69305320/131630830-5252caa7-7dbc-4bbe-b39b-1fa4c30fe41f.gif)

>⛔ 소셜 계정으로 가입한 회원은 변경할 수 있는 비밀번호가 없습니다.

✅ 2.2. 폴더에 커서를 올리면 폴더 이름을 수정하거나 삭제할 수 있는 버튼이 생깁니다. 해당 버튼들과 사이드 메뉴에 있는 +New Folder 버튼을 통해 폴더를 생성, 수정 및 삭제할 수 있습니다.

![폴더변경](https://user-images.githubusercontent.com/69305320/131630843-a6c07f30-5657-47b1-b84b-506747c027bc.gif)

✅ 2.3. 게시글 작성 기능
- React-Quill 에디터를 통해 편리하게 글을 작성할 수 있습니다.

    <img width="959" alt="글쓰기" src="https://user-images.githubusercontent.com/69305320/131631804-30ad0540-16f3-48ca-9f15-ed573c666e24.PNG">

- 쉼표 또는 엔터를 사용하여 태그를 만들 수 있습니다. 만들어진 태그는 마우스로 클릭하거나 키보드로 태그를 지워주면 삭제할 수 있습니다.

    ![태그 입력](https://user-images.githubusercontent.com/69305320/131630899-f19a20c4-53ea-465a-bc97-9655bbdbbb60.gif)

✅ 2.4. 게시글 삭제 기능

게시글 내에서도 삭제가 가능하지만, 각 게시글 폴더 화면에서도 ⁝ 버튼을 통해 편집모드로 전환하여 삭제가 가능합니다.

![게시글 삭제](https://user-images.githubusercontent.com/69305320/131631030-d892eb0a-0414-4b7d-bb95-d5bbc977a0c4.gif)

✅ 2.5. 블로그 공용 홈에서 모든 사용자의 게시글을 볼 수 있습니다. 이 곳은 로그인 하지 않은 사용자도 자유롭게 글을 읽을 수 있습니다.

![게시글보기](https://user-images.githubusercontent.com/69305320/131630918-1b9256d8-2cd0-493f-8ff9-289427e38cfa.gif)

### 3. 검색 기능
lodash의 debounce를 이용하여 타이핑시 많은 이벤트가 발생하는 것을 줄였습니다. 어느 정도 검색어가 작성이 되면 이벤트를 처리해줍니다.

✅ 3.1. 전체 게시글에서 검색하기

![전체검색](https://user-images.githubusercontent.com/69305320/131630929-f03cc50a-beba-461d-9068-0fbf28e09f13.gif)

✅ 3.2. 개인 블로그내에서 검색하기 

![개인검색](https://user-images.githubusercontent.com/69305320/131630942-c95d531e-b3fd-466b-bc09-46257f427928.gif)

### 4. 접근 제한 기능
로그인한 유저만 접근이 가능한 공간에서 로그아웃할 경우 바로 접근 불가 페이지를 보여줍니다. 이외에도 개인적인 공간은 모두 사용자 인증 과정을 거친 후 진행됩니다. 

![접근권한제한](https://user-images.githubusercontent.com/69305320/131630903-bdb9fe9c-05d3-44a9-ba5f-667a0e0550c6.gif)

### 5. 모바일 및 태블릿 PC로 이용
사용하는 기기에 따라 사용이 편리하도록 UI가 변경됩니다.
- 사이드 메뉴가 상단으로 이동됩니다.
- 로그인, 로그아웃, 가입하기, 홈으로 가기 기능은 하단의 토글 버튼으로 변경됩니다. 

![모바일](https://user-images.githubusercontent.com/69305320/131631001-7b466c1d-b326-498a-b461-2353cb4fab42.gif)

- 데스크탑 화면 예시

    <img width="960" alt="퍼플릭데스크탑" src="https://user-images.githubusercontent.com/69305320/131630984-c6791847-3e43-4e11-92f8-40eea14056a7.PNG">

- 모바일 화면 예시

    <img width="374" alt="퍼플릭핸드폰" src="https://user-images.githubusercontent.com/69305320/131630994-0ecd3feb-f3cd-4a6e-8b4a-84a73b24ce0d.PNG">

    <img width="375" alt="핸드폰로그인" src="https://user-images.githubusercontent.com/69305320/131631019-a5f6983d-62ec-4a22-95d7-99ff25b588d9.PNG">


<br/>

## 4. Version 1.6.5 업데이트
### 추가된 기능
1. 사이드 메뉴 하단에 현재 위치에 기반한 날씨를 제공합니다.

    <img width="157" alt="날씨" src="https://user-images.githubusercontent.com/69305320/131519085-466f3a49-850a-4ebe-8a8d-e878f4a44479.PNG">

2. 블로그 글쓰기 에디터 기능을 다양화하였습니다.

    <img width="606" alt="에디터 기능" src="https://user-images.githubusercontent.com/69305320/131519163-ab8d1968-2a57-4a4c-b139-7cbe6b40c907.PNG">

    
    ➕ 추가된 기능: 사진 업로드, 임베디드 동영상, 코드 블럭, 글자 효과(굵게, 이택리체, 밑줄, 지우기), 인용문, 글자 크기, 글자 색상 및 배경색, 리스트, 정렬


3. 게시글에 댓글 기능을 추가하였습니다. 

    <img width="642" alt="댓글" src="https://user-images.githubusercontent.com/69305320/131519126-5789eee9-f280-41e8-bf43-b63bf61f22cd.PNG">

4. 게시글에 썸네일 기능을 추가하였습니다.  

    ![썸네일업로드](https://user-images.githubusercontent.com/69305320/131630881-e87e8271-018e-4e34-a424-59c164aac304.gif)

5. 기존에 해당 게시글 저자의 블로그 홈으로 갈 수 없었던 점을 개선하였습니다. 이제는 사용자 아이디 클릭시 해당 사용자 블로그 홈으로 바로 갈 수 있습니다. 
6. 보조 설명이 필요한 곳은 툴팁으로 정보가 제공되도록 하였습니다.
    <div style="display:flex">
    <img width="290" height="150" alt="툴팁1" src="https://user-images.githubusercontent.com/69305320/131781670-3422e981-55cf-4daa-92ea-41b15b6ab283.PNG">
    <img width="200" height="120" alt="툴팁2" src="https://user-images.githubusercontent.com/69305320/131781673-c91a11f1-8721-4b5a-82b8-9e689996ebe1.PNG">
    </div>

7. 불필요한 렌더링을 줄여 속도를 개선하였습니다.
8. 헤더와 브라우저 탭 부분에 고유한 로고를 넣어주었습니다. 
9. 회원가입 비밀번호 보안을 강화하였습니다. (기본 6자 이상 -> 숫자, 영문, 특수문자를 포함한 8자 이상)

### 버그 수정
1. 게시글 삭제 후 올바르지 않은 경로로 이동되는 것을 수정하였습니다.
2. 회원 탈퇴가 정상적으로 작동하지 않는 점을 수정하였습니다.
3. 프로필 사진이 없을 때 엑박으로 뜨는 점을 수정하였습니다.
## 5. 개발 중 어려웠던 점과 극복 과정
### 1.  프로젝트 초기 구조 잡기

항상 CSR 방식으로 프론트만 개발해보다가 백엔드를 처음 배우게 되었고, 백엔드 수업에선 SSR 방식으로 개발했다보니 이 둘을 어떻게 연결해야 할 지 어려웠습니다. 처음엔 단순히 백엔드 프로젝트 그대로 초기 설정을 하고 Pug로 렌더링 하던 걸 React로 바꿔주면 되지 않을까 했습니다. 하지만 백엔드 개념 따로, 프론트 개념 따로 머릿속에 있다보니 생각만큼 쉽게 구조가 짜지지 않았습니다. 
    
그래서 개발 커뮤니티에 자문하여 아이디어를 얻었고 이를 바탕으로 방법을 구글링하여 다양한 글들을 읽어보고 각 방법을 비교해보았습니다. 또 이미 깃허브에 올려진 mern 스텍 구조의 프로젝트를 찾아 구조를 참고하기도 하고, boiler plate 관련 유튜브 강의를 들으며 따라해 보기도 하였습니다. 
    
이러한 과정을 통해 node js와 react 프로젝트에 대한 초기 설정 구조를 스스로 짤 수 있게 되었고, 필요에 따라 확장 및 변경도 가능하게 되었습니다.

### 2. 보안을 고려한 로그인 인증 과정

이전 프로젝트(wetube)에서 세션을 기반으로한 로그인 인증 방법(express-session, connect-mongo)을 사용해봤기 때문에, 처음엔 이 방법을 동일하게 적용할 예정이었습니다. 하지만 보일러 플레이트 강의에서 JWT를 사용하는 방법을 접하게 되었고, JWT의 개념과 사용에 좀더 익숙해지고 싶어서 이번 프로젝트에선 JWT를 사용해보기로 하였습니다.

이에 관련 자료들을 구글링 해보았고, JWT를 어디에 저장해야 할 지에 대해 localStorage와 cookie, 이 두 가지로 의견이 갈리고 있다는 것을 알게 되었습니다. 어느 것이 더 보안상 안전할까 많이 찾아봤지만 정답은 없었습니다. 각각 장단점이 있고 어느 공격(CSRF, XSS)에 더 초점을 둘 것인지에 따라 다르게 선택할 수 있다는 결론이 서 이번에는 쿠키에 저장하는 방법으로 진행하였습니다.
    
이렇게 사용자 인증을 구현하는 과정에서 XSS, CSRF와 같은 공격과 cookie의 httpOnly, sameSite, secret 옵션 등 웹 보안에 대해 공부해보는 시간을 가질 수 있었습니다.

하지만 다양한 방법을 경험해보고, 상황과 개발 환경에 따라 적절하게 구현할 수 있는 개발자가 되고 싶기 때문에 다음 개인프로젝트에서는 localStorage에 저장해보고, 또 그 다음에는 refresh token을 사용해 accessToken을 JS private variable에 저장하는 방법도 사용해보고 싶습니다.

### 3. OAuth 2.0 Authorization code grant

이전 프로젝트(wetube)에서 처음 OAuth 2.0 Authorization code grant 방식을 접해봤고, 아직 여러번 해보지 않아 그 개념이 낯설고 조금은 어렵기도한 상태였습니다. 그래서 이번 프로젝트를 통해 확실하게 그 흐름을 체화시키고 싶어서 네이버, 카카오, 구글, 깃허브 총 네 가지의 OAuth를 사용하게 되었습니다. 또한 이 과정 속에서 다양한 방법을 경험해 보고싶어 카카오와 깃허브는 Rest API로, 구글은 라이브러리, 네이버는 JavaScript SDK를 이용하여 로그인을 구현하였습니다. 그 결과 OAuth 2.0 Authorization code grant 방식에 익숙해졌고, 다양한 업체의 각기 조금씩 다른 요구사항들을 지키며 유연하게 로그인 기능을 개발할 수 있게 되었습니다.

### 4. 블로그의 공용화

처음에 별 생각 없이 로그인 페이지는 로그인 안한 사용자만, 홈 화면은 로그인 한 사용자만 접근이 가능하도록 구조를 잡아나갔습니다. 이에 블로그이지만 노션처럼 개인화 되어 있었고, 링크를 통해 모든 사람이 게시글에 접근하는 것이 불가능한 구조가 되었습니다. 

문제를 인지한 순간 현재 데이터 구조와 흐름을 분석해보았고, 어떻게 하면 공용화 할 수 있는지 고민해보게 되었습니다. 그 결과 공용화를 위해 모든 컴포넌트들의 router path들이 변경되었고, 관련된 로직들이 추가되기도, 기존의 로직들이 변경되기도 하였습니다. 
    
상당히 많은 시간을 들여 잘못된 구조를 고쳐나게 되자, 기존에 가지고 있던 '일단 만들면서 문제가 있으면 바꿔 나가자'와 같은 생각을 버리게 되었습니다. 지금 당장 만드는 것보다, 시간이 조금 걸리더라도 제대로 설계하고 진행하는 것이 훨씬 효율적이고 결과적으로 더 빠른 길이라는 것을 느낄 수 있었습니다.

### 5. CORS 설정과 쿠키 문제

처음엔 프론트측에 proxy server를 만들어 백엔드와 API 요청을 해나갔습니다. 그렇게 잘 개발해나가던 도중 갑자기 cross-origin error가 뜨기 시작했습니다. 이전에 이미 잘됐기에 CORS 문제는 아닐거라 생각했지만, 에러명에 cross-origin 이라는 단어가 있다보니 먼저 CORS에 대해 구글링 했습니다. 결과적으로 localStorage 문제였지만, 해결책을 찾는 과정([링크](https://velog.io/@wiostz98kr/ERROR-A-cross-origin-error-was-thrown.-React-doesnt-have-access-to-the-actual-error-object-in-development)) 에서 CORS 개념에 대해 또 한번 공부할 수 있었습니다. 
    
그러다 배포 이후, 진짜 CORS 이슈가 발생했습니다. 로컬에선 잘만 되던게 왜 배포하고 안되나 관련 문서를 찾아봤고 그 결과 기존에 설정한 방법은 개발 환경에선 웹팩이 요청을 프록싱해주니 아무 이상이 없었지만, 어플리케이션을 빌드하고 서버에 올리고 나면 더 이상 webpack-dev-server가 구동되는 환경이 아니기 때문에 이상한 곳으로 API 요청을 보내게 된다는 것을 알았습니다. 이 과정에서 proxy 서버에 대해 한번 더 공부할 수 있었고, COR를 백엔드에서 설정해주어 기존의 문제 또한 해결할 수 있었습니다.
    
그렇게 프러덕션 환경에서의 API 요청은 성공적이었습니다. 하지만, 이번엔 브라우저에 쿠키가 설정되지 않아 로그인이 안되는 문제가 발생했습니다. 이에 CORS와 관련된 쿠키의 보안 특성에 대해 공부해보게 되었고 각각 프론트와 백단에서 요청/응답 헤더에 credentials 관련 속성을 true로 설정하였습니다. 대부분의 블로그 포스팅들을 보면 이 두 가지를 설정하라고 안내하지만, 저의 경우 이것만으론 해결되지 않았습니다.
    
그래서 더 많은 구글링을 하게 되었고, 그 결과 크롬 80버전이 배포되면서 브라우저 쿠키의 SameSite 기본값이 None에서 Lax로 변경된 점에 영향을 받고 있음을 알게 되었습니다. 띠라서 해당 문제는 SameSite를 none으로 secure를 true로 설정하는 방법으로 해결할 수 있었습니다.하지만 웹 보안을 더 강화하려는 크롬의 변화(none→lax)에 발맞출 수 있도록, 현재 방법의 문제점을 인지하고 추후 계속 좋은 해결책을 모색하며 이를 개선하려고 합니다.  