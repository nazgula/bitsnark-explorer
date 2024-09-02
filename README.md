# Bitsnark Explorer

## Overview

This is the bitsnark protocol interactions explorer.

it consists of a backend Node.js (Express.js) + TS
and a frontend using React + TS
The project requires PostgreSQL running in a Docker container.

## configuration

- vite server port: 3000
- backend port: 5000
- postgresSQL: 5432

## Prerequisites

- Node.js and npm installed
- Docker and Docker Compose installed

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/nazgula/bitsnark-explorer
cd your-repo
```

### 2. Install Dependencies

```sh
cd backend
npm install

cd ../frontend
npm install
```

### 3. Install Dependencies

Set Up PostgreSQL with Docker (docker-compose.yml provided)

### 4. Environment Variables

in backend root:

```sh
BLOCKSTREAM_API_URL=https://blockstream.info/testnet/api #test-api
DATABASE_URL=postgres://<<your-user>>>>:<<your-passward>>>>@localhost:5432/<<bitsnark or other name>>

```

### 5. Start the PostgreSQL Container

Run the following command to start the PostgreSQL container:

```sh
docker-compose up -d
```

### 5.Run the Backend and Frontend

Backend
Navigate to the backend folder and start the server with nodemon:

```sh
cd backend
npx nodemon
```

Frontend
Navigate to the frontend folder and start the development server:

```sh
cd ../frontend
npm start
```
