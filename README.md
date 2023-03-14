## Table of contents
* [General info](#general-info)
* [Setup](#setup)
* [Testing the app](#testing-the-app)
* [DB](#db)

## General info
This project is Klaimai backend test task.
Description - [Backend Task.pdf](https://github.com/terazumova/klaimai-test-backend/files/10954615/Backend.Task.pdf)
	
## Setup
To run this project, install it locally using npm and use docker compose:

```
$ npm install
$ docker-compose up -d
$ npm start
```

## Testing the app

```bash
$ npm run test
```

## DB

```bash
App is running on port 3001
```

Default db options:

```bash
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=klaimai_db
```

- DB schema

![DB-schema](https://user-images.githubusercontent.com/91330703/224913154-7c7be869-29fa-4574-b574-64f566220e64.png)

