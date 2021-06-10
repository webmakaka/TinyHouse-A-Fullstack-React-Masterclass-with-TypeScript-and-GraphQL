# [NewLine] TinyHouse: A Fullstack React Masterclass with TypeScript and GraphQL [ENG, 2020]

<br/>

### Run app from part 2

<br/>

    $ cd app1
    $ cd postgresql

    $ npm install typeorm reflect-metadata

    $ npm install pg

<br/>

https://github.com/typeorm/typeorm

<br/>

```
$ npm run seed
$ npm run start
```

<br/>

```
CREATE INDEX location_index ON public.listings (country, admin, city);
```

<br/>

http://localhost:3000/api

<br/>

Frontend. Possible need to update uri to:

<br/>

```
const httpLink = createHttpLink({
  uri: 'http://localhost:3000/api',
});
```

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
