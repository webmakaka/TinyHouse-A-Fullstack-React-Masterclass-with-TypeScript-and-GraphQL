# [NewLine] TinyHouse: A Fullstack React Masterclass with TypeScript and GraphQL [ENG, 2020]

<br/>

### Run app from part 1

<br/>

    $ cd app1
    $ cd postgresql

    $ npm install typeorm reflect-metadata

    $ npm install pg

<br/>

https://github.com/typeorm/typeorm

<br/>

    $ npm run seed
    $ npm run start

<br/>

http://localhost:3000/api

```
query{
  listings{
    id,
  	title,
    image,
    address,
    price,
    numOfGuests,
    numOfBeds,
    numOfBaths,
    rating
  }
}
```

OK!

```
query($id: ID!){
  listing(id: $id) {
    id,
  	title,
    image,
    address,
    price,
    numOfGuests,
    numOfBeds,
    numOfBaths,
    rating
  }
}
```

<br/>

```
{
  "id": "608cab1c6229455e8df0896ec344d386"
}
```

OK

```
mutation{
  createListing{
    id,
  	title,
    image,
    address,
    price,
    numOfGuests,
    numOfBeds,
    numOfBaths,
    rating
  }
}
```

OK

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
