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
Docker version 20.10.6, build 370c289
```

<br/>

### Minikube installation

```
$ curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/

```

<br/>

```
$ minikube version
minikube version: v1.20.0
```

<br/>

### Kubectl installation

```
$ curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl && chmod +x kubectl && sudo mv kubectl /usr/local/bin/

$ kubectl version --client --short
Client Version: v1.21.1

```

<br/>

### Skaffold installation

```
$ curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-amd64

$ chmod +x skaffold
$ sudo mv skaffold /usr/local/bin

$ skaffold version
v1.25.0
```

<br/>

### Run minikube

<br/>

```
$ {
    minikube --profile TinyHouse config set memory 8192
    minikube --profile TinyHouse config set cpus 4

    // minikube --profile TinyHouse config set vm-driver virtualbox
    minikube --profile TinyHouse config set vm-driver docker

    minikube --profile TinyHouse config set kubernetes-version v1.21.1
    minikube start --profile TinyHouse --embed-certs
}
```

<br/>

```
// If needed start / stop / delete
// $ minikube --profile TinyHouse start
// $ minikube --profile TinyHouse stop
// $ minikube --profile TinyHouse delete
```

<br/>

    // Enable ingress
    $ minikube addons --profile TinyHouse enable ingress

<br/>

    $ minikube --profile TinyHouse ip
    192.168.49.2

<br/>

    $ sudo vi /etc/hosts

```
#---------------------------------------------------------------------
# Minikube
#---------------------------------------------------------------------
192.168.49.2 tinyhouse.dev
```

<br/>

### k9s instllation (Optional)

<br/>

    // homebrew install
    $ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

    // commands from output of previous command
    // set your home, not mine
    $ echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /home/marley/.profile
    $ eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"

    $ brew install k9s

<br/>

    $ sudo vi /etc/profile.d/k9s.sh

<br/>

```
# set your home, not mine
#### k9s #######################

export MINIKUBE_HOME=/home/marley/.minikube

#### k9s #######################
```

<br/>

```
$ sudo chmod 755 /etc/profile.d/k9s.sh
$ source /etc/profile.d/k9s.sh
```

<br/>

    $ k9s

<br/>

![Application](/img/pic-setup-k9s-01.png?raw=true)

<br/>

![Application](/img/pic-setup-k9s-02.png?raw=true)

<br/>

### [App1](./App1-Readme.md)

### [App2](./App2-Readme.md)

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
