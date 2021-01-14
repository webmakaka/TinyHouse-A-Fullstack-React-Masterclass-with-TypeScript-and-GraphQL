# [NewLine] TinyHouse: A Fullstack React Masterclass with TypeScript and GraphQL [ENG, 2020]

<br/>

### Run app from part 1

<br/>

    $ cd app1
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

    $ export POD_NAME=$(kubectl get pods --namespace default -l "app=tinyhouse-server" -o jsonpath="{.items[0].metadata.name}")

    $ kubectl exec -it ${POD_NAME} sh

<br/>

<!--
    $ kubectl exec -it tinyhouse-server-deployment-5744884c7c-lf8kp sh
-->

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

https://tinyhouse.dev/api/

```
query{
  listings{
    id,
  	title,
    image
  }
}
```

**returns:**

```
{
  "data": {
    "listings": [
      {
        "id": "5ff15c0989949700387558a1",
        "title": "Clean and fully furnished apartment. 5 min away from CN Tower",
        "image": "https://res.cloudinary.com/tiny-house/image/upload/v1560641352/mock/Toronto/toronto-listing-1_exv0tf.jpg"
      },
      {
        "id": "5ff15c0989949700387558a2",
        "title": "Luxurious home with private pool",
        "image": "https://res.cloudinary.com/tiny-house/image/upload/v1560645376/mock/Los%20Angeles/los-angeles-listing-1_aikhx7.jpg"
      },
      {
        "id": "5ff15c0989949700387558a3",
        "title": "Single bedroom located in the heart of downtown San Fransisco",
        "image": "https://res.cloudinary.com/tiny-house/image/upload/v1560646219/mock/San%20Fransisco/san-fransisco-listing-1_qzntl4.jpg"
      }
    ]
  }
}
```

<br/>

https://tinyhouse.dev/

**Expected result:**

<br/>

![Application](/img/pic-app-1-final.png?raw=true)

<br/>

### Delete minikube with project

    $ minikube --profile my-profile stop && minikube --profile my-profile delete

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
