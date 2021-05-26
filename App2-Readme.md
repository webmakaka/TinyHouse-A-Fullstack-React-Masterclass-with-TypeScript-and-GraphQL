# [NewLine] TinyHouse: A Fullstack React Masterclass with TypeScript and GraphQL [ENG, 2020]

<br/>

### Run app from part 2

https://console.developers.google.com/

<br/>

### Google People API

**New Project**

Credentials --> Create Credentials --> Oauth client id --> Configure consent screen --> UserType --> External --> AppName: TinyHouse --> Save

Credentials --> Create Credentials --> Application type : Web Application, Name: TinyHouse Web Client, Authorised JavaScript origins : https://tinyhouse.dev, Authorised redirect URIs : https://tinyhouse.dev/login --> Create

<br/>

https://console.developers.google.com/

Library --> Google People API --> Manage

People API --> Credentials --> TinyHouse Web client

<br/>

If you do not want to use Google Clouds, set any values for secrets

<br/>

```
$ kubectl create secret generic google-client-id --from-literal=GOOGLE_CLIENT_ID=<GOOGLE_CLIENT_ID>

$ kubectl create secret generic google-client-secret --from-literal=GOOGLE_CLIENT_SECRET=<GOOGLE_CLIENT_SECRET>
```

<br/>

### Google Geocoding API

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

<br/>

Name: Geocoding API

API restrictions -> Restrict key -> Geocoding API

SAVE

<br/>

![Application](/img/pic-m09-p03.png?raw=true)

<br/>

```
$ kubectl create secret generic google-geocoding-api-key --from-literal=GOOGLE_GEOCODING_API_KEY=<GOOGLE_GEOCODING_API_KEY>
```

<br/>

**I AM NOT PLANNING TO CREATE BILLING ACCOUNT FOR NOW**

For this reason i set GOOGLE_GEOCODING_API_KEY as any text

<br/>

![Application](/img/pic-m09-p04.png?raw=true)

<br/>

![Application](/img/pic-m09-p05.png?raw=true)

<br/>

### Connect Stripe

https://dashboard.stripe.com/

<br/>

Stripe -> Connected accounts -> Facilitate multi-party payments with Connect -> Get started -> Platform or marketplace

<br/>

![Application](/img/pic-m10-p02.png?raw=true)

<br/>

Developers -> API Keys

<br/>

Client Project need to add STRIPE_PUBLISHABLE_KEY

Api Project need to add STRIPE_SECRET_KEY

<br/>

Stripe -> Settings -> connect settings

<br/>

Client Project need to add STRIPE_CONNECT_CLIENT_ID

Need to set STRIPE_CONNECT_CLIENT_ID as <Test mode client ID>

<br/>

```
$ kubectl create secret generic stripe-publishable-key --from-literal=STRIPE_PUBLISHABLE_KEY=<STRIPE_PUBLISHABLE_KEY>

$ kubectl create secret generic stripe-secret-key --from-literal=STRIPE_SECRET_KEY=<STRIPE_SECRET_KEY>

$ kubectl create secret generic stripe-connect-client-id --from-literal=STRIPE_CONNECT_CLIENT_ID=<STRIPE_CONNECT_CLIENT_ID>
```

<br/>

```
$ kubectl get secrets
NAME                       TYPE                                  DATA   AGE
default-token-2k6kh        kubernetes.io/service-account-token   3      34m
google-client-id           Opaque                                1      31m
google-client-secret       Opaque                                1      31m
google-geocoding-api-key   Opaque                                1      30m
stripe-connect-client-id   Opaque                                1      4m18s
stripe-publishable-key     Opaque                                1      3m51s
stripe-secret-key          Opaque                                1      3m37s
```

<br/>

### Additional Stripe Setup

![Application](/img/pic-m10-p03.png?raw=true)

<br/>

![Application](/img/pic-m10-p04.png?raw=true)

<br/>

### Run App with Skaffold

<br/>

```
$ cd skaffold
$ docker login --username=<your_docker_hub_username>
```

<br/>

Need to update my docker image name webmakaka/tinyhouse\*\*\* to your in scripts from skaffold and k8s folders.

<br/>

```
$ skaffold dev
```

<br/>

### Seed & Clear Data from MongoDB

<br/>

```
$ kubectl get pods
NAME                                           READY   STATUS    RESTARTS   AGE
tinyhouse-client-deployment-5cdd47b854-5ldvr   1/1     Running   0          5m33s
tinyhouse-mongo-deployment-85f8fcc6c-q87vt     1/1     Running   0          5m33s
tinyhouse-server-deployment-659df7c559-8q75j   1/1     Running   0          5m33s
```

<br/>

```
$ export POD_NAME=$(kubectl get pods --namespace default -l "app=tinyhouse-server" -o jsonpath="{.items[0].metadata.name}")

$ kubectl exec -it ${POD_NAME} sh
```

<br/>

```
# cd /app/
# npm run seed
```

<br/>

<br/>

**chrome browser**

```
graphql -->  https://tinyhouse.dev/api/
```

<br/>

type: **thisisunsafe** in the browser window with security warning.

<br/>

```
query {
  listing(id: "5d378db94e84753160e08b33") {
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
    bookings(limit: 4, page: 1) {
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

**chrome browser**

```
client --->  https://tinyhouse.dev/
```

<br/>

type: **thisisunsafe** in the browser window with security warning.

<br/>

https://tinyhouse.dev/listing/5d378db94e84753160e08b33

<br/>

**My current version**:

<br/>

![Application](/img/pic-app-2-current.png?raw=true)

<br/>

### [Development step by step](./App2-Development.md)

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
