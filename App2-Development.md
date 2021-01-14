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

    $ cd client
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

<br/>

### 33. Modifying the User, Listing, and Booking GraphQL TypeDefs

<br/>

### 34. Building the User Resolvers

take id from web app -> profile

```
query{
  user(id: "112614995982215684080"){
      name,
      avatar,
      income,
      bookings(limit:10, page: 1) {
          total
      },
      listings(limit:10, page: 1) {
          total
      }
  }
}
```

**returns:**

```
{
  "data": {
    "user": {
      "name": "Marley Marley",
      "avatar": "https://lh6.googleusercontent.com/-g_bXa-skZss/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmRS6xYvUAI2ZS0baheVKHb_l64zg/s100/photo.jpg",
      "income": null,
      "bookings": null,
      "listings": {
        "total": 0
      }
    }
  }
}
```

<br/>

### 35. The UserProfile React Component

    $ cd client
    $ npm run codegen:schema
    $ npm run codegen:generate

<br/>

![Application](/img/pic35-1.png?raw=true)

<br/>

![Application](/img/pic35-2.png?raw=true)

<br/>

### 36. The UserListings & UserBookings React Components

    $ cd client
    $ npm run codegen:schema
    $ npm run codegen:generate

<br/>

https://tinyhouse.dev/user/5d378db94e84753160e08b57

<br/>

![Application](/img/pic36-1.png?raw=true)

<br/>

### 37. Module 6 Summary

<br/>

## Module 7

<br/>

### 38. Module 7 Introduction

<br/>

### 39. Listing GraphQL Fields

<br/>

### 40. Building the Listing Resolvers

    $ kubectl get pods

    $ kubectl exec -it tinyhouse-server-deployment-5744884c7c-lf8kp sh

<br/>

**Inside container**

    # cd /app/
    # npm run clear
    # npm run seed

<br/>

```
query{
  listing(id:"5d378db94e84753160e08b33") {
    id
    title
    description
    image
    host {
      id
    }
    type
    address
    city
    bookings (limit:4, page: 1) {
      total
    }
    bookingsIndex
    price
    numOfGuests
  }
}
```

<br/>

**response:**

```
{
  "data": {
    "listing": {
      "id": "5d378db94e84753160e08b33",
      "title": "Luxury condo suite located in the heart of downtown Toronto",
      "description": "Luxury condo suite located in the heart of the city with building pool/gym/sauna available 24/7. Buses, subway, and all other amenities are available close by. Booking comes with 1 available parking spot in building underground.",
      "image": "https://res.cloudinary.com/tiny-house/image/upload/v1560641352/mock/Toronto/toronto-listing-4_ei1ngz.jpg",
      "host": {
        "id": "5d378db94e84753160e08b59"
      },
      "type": "APARTMENT",
      "address": "9531 Prince Road, Toronto, ON, CA",
      "city": "Toronto",
      "bookings": null,
      "bookingsIndex": "{}",
      "price": 21292,
      "numOfGuests": 4
    }
  }
}
```

<br/>

### 41. Querying for listing data

    $ cd client
    $ npm run codegen:schema
    $ npm run codegen:generate

<br/>

### 42. ListingDetails & ListingBookings

https://tinyhouse.dev/listing/5d378db94e84753160e08b33

<br/>

![Application](/img/pic42.png?raw=true)

<br/>

### 43. The ListingCreateBooking React Component

    $ cd client
    $ npm install moment

<br/>

![Application](/img/pic43.png?raw=true)

<br/>

### 44. Module 7 Summary

<br/>

## Module 8

<br/>

### 45. Module 8 Introduction

<br/>

### 46. Listings GraphQL Fields

<br/>

### 47. Building the Listings Resolvers

<br/>

```
query{
  listings(filter:PRICE_LOW_TO_HIGH, limit:4, page: 1){
   total,
    result {
      id
      title
      price
    }
  }
}
```

<br/>

**returns:**

```
{
  "data": {
    "listings": {
      "total": 37,
      "result": [
        {
          "id": "5d378db94e84753160e08b4a",
          "title": "Bright furnished home",
          "price": 1918
        },
        {
          "id": "5d378db94e84753160e08b36",
          "title": "Picturesque 2 Story House - great location",
          "price": 2577
        },
        {
          "id": "5d378db94e84753160e08b46",
          "title": "Stunning luxury home in central LA",
          "price": 2778
        },
        {
          "id": "5d378db94e84753160e08b3d",
          "title": "Comfortable studio in the heart of the city",
          "price": 3078
        }
      ]
    }
  }
}
```

<br/>

### 48. Building the UI of the Homepage

<br/>

![Application](/img/pic-m08-p01.png?raw=true)

<br/>

### 49. Displaying the highest-priced listings in the Homepage

    $ cd client

    // Instead of one command i have to execute next
    // $ npm run codegen:schema

    $ apollo schema:download --endpoint=https://tinyhouse.dev/api --skipSSLValidation schema.json

<br/>

```
  ✔ Loading Apollo Project
  ✖ Saving schema to schema.json
    → FetchError: request to https://tinyhouse.dev/api failed, reason: unable to
…
    Error: FetchError: request to https://tinyhouse.dev/api failed, reason:
    unable to verify the first certificate
```

<br/>

I do not know how to solve this right. If you know please send me a solution!

<br/>

My solution:

<br/>

```
NAME                                           READY   STATUS    RESTARTS   AGE
tinyhouse-client-deployment-58f46df7bb-l88fb   1/1     Running   0          49m
tinyhouse-mongo-deployment-84b444d875-62f4x    1/1     Running   0          49m
tinyhouse-server-deployment-6cc478b9c6-kvzjr   1/1     Running   0          16m

```

<br/>

    $ kubectl exec -it tinyhouse-server-deployment-6cc478b9c6-kvzjr sh

<br/>

```
# cd ~
# npm add -g apollo
# apollo schema:download --endpoint=http://localhost:3000/api
```

<br/>

    $ cd ~
    $ kubectl cp tinyhouse-server-deployment-6dfbc45479-6ws7w:/root/schema.json ~/schema.json

<br/>

    $ mv schema.json ~/projects/dev/js/ts/TinyHouse-A-Fullstack-React-Masterclass-with-TypeScript-and-GraphQL/app/client/

<br/>

    $ cd ~/projects/dev/js/ts/TinyHouse-A-Fullstack-React-Masterclass-with-TypeScript-and-GraphQL/app/client/

<br/>

    $ npm run codegen:generate

<br/>

![Application](/img/pic-m08-p02.png?raw=true)

<br/>

### 50. Module 8 Summary

<br/>

## Module 9

<br/>

### 51. Module 9 Introduction

<br/>

### 52. Google's Geocoding API

https://console.developers.google.com/apis/

- Enable Api and Services

Geocoding API

Enable

<br/>

Credentials -> Credentials in APIs & Services

<br/>

![Application](/img/pic-m09-p01.png?raw=true)

<br/>

![Application](/img/pic-m09-p02.png?raw=true)

Name: Geocoding API

API restrictions -> Restrict key -> Geocoding API

SAVE

<br/>

![Application](/img/pic-m09-p03.png?raw=true)

<br/>

    $ kubectl create secret generic google-geocoding-api-key --from-literal=GOOGLE_GEOCODING_API_KEY=<GOOGLE_GEOCODING_API_KEY>

<br/>

**I AM NOT PLANNING TO CREATE BILLING ACCOUNT FOR NOW**

<br/>

![Application](/img/pic-m09-p04.png?raw=true)

<br/>

![Application](/img/pic-m09-p05.png?raw=true)

<br/>

### 53. [Theory] Location-based searching for listings

<br/>

### 54. Updating the listings resolver

    $ cd server
    $ npm install @googlemaps/google-maps-services-js

<br/>

```
query{
  listings(filter:PRICE_HIGH_TO_LOW, limit:4, page: 1){
    result {
      id
      title
      country
      admin
      city
    }
  }
}
```

<br/>

**returns**

```
{
  "data": {
    "listings": {
      "result": [
        {
          "id": "5d378db94e84753160e08b53",
          "title": "Spacious 2 story beach house",
          "country": "Mexico",
          "admin": "Quintana Roo",
          "city": "Cancún"
        },
        {
          "id": "5d378db94e84753160e08b37",
          "title": "Chic downtown condo",
          "country": "Canada",
          "admin": "Ontario",
          "city": "Toronto"
        },
        {
          "id": "5d378db94e84753160e08b4c",
          "title": "Beautiful 2 bedroom townhouse",
          "country": "United Kingdom",
          "admin": "England",
          "city": "London"
        },
        {
          "id": "5d378db94e84753160e08b54",
          "title": "Beachfront suite",
          "country": "Mexico",
          "admin": "Quintana Roo",
          "city": "Cancún"
        }
      ]
    }
  }
}
```

<br/>

```
query{
  listings(location:"Toronto",filter:PRICE_HIGH_TO_LOW, limit:4, page: 1){
    result {
      id
      title
      country
      admin
      city
    }
  }
}
```

<br/>

Not works for me

<br/>

```
 data: {
    [tinyhouse-server]       error_message: 'You must enable Billing on the Google Cloud Project at https://console.cloud.google.com/project/_/billing/enable Learn more at https://developers.google.com/maps/gmp-get-started',
    [tinyhouse-server]       results: [],
    [tinyhouse-server]       status: 'REQUEST_DENIED'
    [tinyhouse-server]
}

```

<br/>

### 55. Building the Listings page

<br/>

https://tinyhouse.dev/listings

<br/>

    $ cd client
    $ npm run codegen:schema
    $ npm run codegen:generate

<br/>

I have some issue with css. Can't find the reason.

<br/>

![Application](/img/pic-m09-p06.png?raw=true)

<br/>

### 56. Pagination & Filtering in the Listings page

    $ cd client
    $ npm run codegen:generate

<br/>

![Application](/img/pic-m09-p07.png?raw=true)

<br/>

### 57. Searching for listings from the App Header

<br/>

### 58. Index location-based data

![Application](/img/pic-m09-p08.png?raw=true)

<br/>

![Application](/img/pic-m09-p09.png?raw=true)

<br/>

### 59. Module 9 Summary

<br/>

## Module 10

<br/>

### 60. Module 10 Introduction

<br/>

### 61. [Theory] Stripe & Stripe Connect

<br/>

![Application](/img/pic-m10-p01.png?raw=true)

<br/>

### 62. Stripe Connect OAuth

https://dashboard.stripe.com/

<br/>

Stripe -> Connected accounts

<br/>

![Application](/img/pic-m10-p02.png?raw=true)

<br/>

Developers -> API Keys

<br/>

Client Project need to add STRIPE_PUBLISHABLE_KEY

Api Project need to add STRIPE_SECRET_KEY

<br/>

Stripe -> Settings -> connect settings -> Test mode client ID

<br/>

Client Project need to add STRIPE_CONNECT_CLIENT_ID

<br/>

![Application](/img/pic-m10-p03.png?raw=true)

<br/>

![Application](/img/pic-m10-p04.png?raw=true)

<br/>

    $ kubectl create secret generic stripe-publishable-key --from-literal=STRIPE_PUBLISHABLE_KEY=<STRIPE_PUBLISHABLE_KEY>

<br/>

    $ kubectl create secret generic stripe-secret-key --from-literal=STRIPE_SECRET_KEY=<STRIPE_SECRET_KEY>

<br/>

    $ kubectl create secret generic stripe-connect-client-id --from-literal=STRIPE_CONNECT_CLIENT_ID=<STRIPE_CONNECT_CLIENT_ID>

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
