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

### 3. Environment Variables

in backend add an .env file containing
(Note that the blockstream URL below is of the testing API):

```sh
BLOCKSTREAM_API_URL=https://blockstream.info/testnet/api
DATABASE_URL=postgres://your-user:your-passward@localhost:5432/bitsnark
POSTGRES_PASSWORD=your-passward
```
### 4. Start the PostgreSQL Container

Run the following command to start the PostgreSQL container:

```sh
docker-compose up -d
```

### 5.Run the backend server
Navigate to the backend folder and start the server with nodemon:

```sh
cd backend
npx nodemon
```

### 6.Run the backend 

Navigate to the frontend folder and start the development server:

```sh
cd ../frontend
npm run dev
```
