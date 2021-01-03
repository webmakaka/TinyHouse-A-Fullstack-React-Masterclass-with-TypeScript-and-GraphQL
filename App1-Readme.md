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

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
