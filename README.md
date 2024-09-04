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

- Node.js
- npm
- Docker
- Docker Compose

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/nazgula/bitsnark-explorer
cd your-repo
```

### 2. Install Dependencies

```sh
npm install
```

### 4. Set Environment Variables

In the `backend` directory:

```sh
BLOCKSTREAM_API_URL=https://blockstream.info/testnet/api
DATABASE_URL=postgres://<user>:<password>@localhost:5432/bitsnark
```

### 5. Start the PostgreSQL Container

Still in the `backend` directory:

```sh
docker-compose up -d
```

### 5. Run the Backend

Still in the `backend` directory:

```sh
npx nodemon
```

### 5. Run the Frontend

In the `frontend` directory:

```sh
npm serve
```
