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

---

<br/>

**Marley**

Any questions on eng: https://jsdev.org/chat/  
Любые вопросы на русском: https://jsdev.ru/chat/
