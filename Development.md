# [NewLine] TinyHouse: A Fullstack React Masterclass with TypeScript and GraphQL [ENG, 2020]

<br/>

## Module 2

<br/>

### 09. React Router

    $ cd client
    $ npm install react-router-dom @types/react-router-dom

<br/>

    $ npm install @apollo/client

<br/>

## Module 3

<br/>

### 11. Database Collection Structure

<br/>

### 12. Database Document Structure

<br/>

### 13. Seed & Clear Data from MongoDB

<br/>

    $ kubectl exec -it tinyhouse-server-deployment-5744884c7c-lf8kp sh

<br/>

    # cd /app/
    # npm run seed

<br/>

## Module 4

<br/>

### 15. OAuth 2.0

https://developers.google.com/identity/protocols/oauth2

<br/>

### 16. Google Sign-In (OAuth)

console.developers.google.com

New Project

Credentials --> Create Credentials --> Oauth client id --> Configure consent screen --> UserType --> External --> AppName: TinyHouse --> Save

Credentials --> Create Credentials --> Application type : Web Application, Name: TinyHouse Web Client, Authorised JavaScript origins : https://tinyhouse.dev, Authorised redirect URIs : https://tinyhouse.dev/login --> Create

<br/>

### 17. Google Sign-In GraphQL Fields

https://tinyhouse.dev/api/

```
query{
  authUrl
}
```

```
mutation{
  logIn
}
```

<br/>

### 18. Using Google Sign-In & People API

    $ cd server
    $ npm install googleapis

https://console.developers.google.com/

Library --> Google People API --> Enable

<br/>

    $ kubectl create secret generic google-client-id --from-literal=GOOGLE_CLIENT_ID=<GOOGLE_CLIENT_ID>

    $ kubectl create secret generic google-client-secret --from-literal=GOOGLE_CLIENT_SECRET=<GOOGLE_CLIENT_SECRET>

<br/>

### 19. Building the Authentication Resolvers

https://tinyhouse.dev/api/

```
query{
  authUrl
}
```

<br/>

![Application](/img/pic19.png?raw=true)

<br/>

### 20. Building the UI for Login

    $ npm run codegen:schema
    $ npm run codegen:generate

https://tinyhouse.dev/login

<br/>

![Application](/img/pic20.png?raw=true)

<br/>

### 21. Executing Login

<br/>

![Application](/img/pic21.png?raw=true)

<br/>

### 22. Building the AppHeader & Logout

https://ant.design/components/icon/

    $ npm install --save @ant-design/icons

<br/>

![Application](/img/pic22.png?raw=true)

<br/>

### 23. Module 4 Summary

<br/>

## Module 5

<br/>

### 24. Module 5 Introduction

<br/>

### 25. Cookies & Login Sessions

<br/>

### 26. localStorage vs. sessionStorage vs. cookies

<br/>

### 27. Adding the Viewer Cookie on the Server

    $ cd server
    $ npm install cookie-parser
    $ npm install --save-dev @types/cookie-parser

<br/>

![Application](/img/pic23.png?raw=true)

<br/>

### 28. Adding the Viewer Cookie on the Client

<br/>

### 29. X-CSRF Token

<br/>

![Application](/img/pic24.png?raw=true)

<br/>

### 30. Module 5 Summary

<br/>

## Module 6

<br/>

### 31. Module 6 Introduction

<br/>

### 32. User GraphQL Fields

---

<br/>

**Marley**

Any questions on eng: https://jsdev.org/chat/  
Любые вопросы на русском: https://jsdev.ru/chat/
