# [NewLine] TinyHouse: A Fullstack React Masterclass with TypeScript and GraphQL [ENG, 2020]

<br/>

**Final Project**:  
https://www.tinyhouse.app/

<br/>

**Current Project Code Quality**:  
https://sonarcloud.io/dashboard?id=webmakaka_TinyHouse-A-Fullstack-React-Masterclass-with-TypeScript-and-GraphQL

<br/>

## How to run apps

I am working in ubuntu 20.04.1 LTS

Docker, Minikube, Kubectl, Skaffold should be installed.

<br/>

### Docker

```
$ docker -v
Docker version 20.10.0, build 7287ab3
```

<br/>

### Minikube installation

```
$ curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/

```

<br/>

```
$ minikube version
minikube version: v1.16.0
```

<br/>

### Kubectl installation

```
$ curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl && chmod +x kubectl && sudo mv kubectl /usr/local/bin/

$ kubectl version --client --short
Client Version: v1.20.1

```

<br/>

### Skaffold installation

```
$ curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-amd64

$ chmod +x skaffold
$ sudo mv skaffold /usr/local/bin

$ skaffold version
v1.17.2
```

<br/>

### Run minikube

```
$ {
    minikube --profile my-profile config set memory 8192
    minikube --profile my-profile config set cpus 4

    // minikube --profile my-profile config set vm-driver virtualbox
    minikube --profile my-profile config set vm-driver docker

    minikube --profile my-profile config set kubernetes-version v1.20.1
    minikube start --profile my-profile
}
```

<br/>

    // Enable ingress
    $ minikube addons --profile my-profile enable ingress

<br/>

    $ minikube --profile my-profile ip
    172.17.0.2

<br/>

    $ sudo vi /etc/hosts

```
#---------------------------------------------------------------------
# Minikube
#---------------------------------------------------------------------
172.17.0.2 tinyhouse.dev
```

<br/>

## How to run the app

<br/>

### Run app from part 1

Need to switch to commit:

commit: 3934dd627e244a12907ea7c4595cb52474a47e18

<br/>

    $ cd skaffold

    $ docker login

Need to update my docker image name webmakaka/tinyhouse\*\*\* to your in scripts from skaffold and k8s folders.

    $ skaffold dev

<br/>

    $ kubectl get pods
    NAME                                           READY   STATUS    RESTARTS   AGE
    tinyhouse-client-deployment-d65d5b866-km548    1/1     Running   0          92s
    tinyhouse-mongo-deployment-755b899c89-qd44c    1/1     Running   0          92s
    tinyhouse-server-deployment-5744884c7c-lf8kp   1/1     Running   0          92s

<br/>

    $ kubectl exec -it tinyhouse-server-deployment-5744884c7c-lf8kp sh

<br/>

    # cd /app/
    # npm run seed

<br/>

**chrome browser**

```
client --->  https://tinyhouse.dev/
graphql -->  https://tinyhouse.dev/api/
```

<br/>

type: **thisisunsafe** in the browser window with security warning.

<br/>

**Expected result:**

<br/>

![Application](/img/pic-app-1-final.png?raw=true)

<br/>

### Delete minikube with project

    $ minikube --profile my-profile stop && minikube --profile my-profile delete

<hr/>

<br/>

<br/>

### Run app from part 2

https://console.developers.google.com/

**New Project**

Credentials --> Create Credentials --> Oauth client id --> Configure consent screen --> UserType --> External --> AppName: TinyHouse --> Save

Credentials --> Create Credentials --> Application type : Web Application, Name: TinyHouse Web Client, Authorised JavaScript origins : https://tinyhouse.dev, Authorised redirect URIs : https://tinyhouse.dev/login --> Create

<br/>

https://console.developers.google.com/

Library --> Google People API --> Manage

People API --> Credentials --> TinyHouse Web client

<br/>

    $ kubectl create secret generic google-client-id --from-literal=GOOGLE_CLIENT_ID=<GOOGLE_CLIENT_ID>

    $ kubectl create secret generic google-client-secret --from-literal=GOOGLE_CLIENT_SECRET=<GOOGLE_CLIENT_SECRET>

<br/>

    $ cd skaffold

    $ docker login

<br/>

Need to update my docker image name webmakaka/tinyhouse\*\*\* to your in scripts from skaffold and k8s folders.

    $ skaffold dev

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

    $ kubectl exec -it tinyhouse-server-deployment-659df7c559-8q75j sh

<br/>

    # cd /app/
    # npm run seed

<br/>

<br/>

**chrome browser**

```
graphql -->  https://tinyhouse.dev/api/
```

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

### [Development step by step](./Development.md)

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
