# OAuth-NodeJS

This project demonstrates how to implement OAuth 2.0 authentication in a Node.js application.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Example](#Example Request)
- [License](#license)

## Introduction

This project implements an OAuth2 authorization server using Express.js, TypeScript and JWT-based authentication with refresh tokens.

## Features

- OAuth 2.0 authentication
- Access Token and Refresh Token Implementation
- JWT-Based Token Management
- Express.js with TypeScript


## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Desusha/OAuth-NodeJS.git
    ```
2. Navigate to the project directory:
    ```bash
    cd OAuth-NodeJS
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Usage

1. Create a `.env` file in the root directory :
    ```env
    OAUTH_CLIENT_ID= upfirst
    OAUTH_CLIENT_SECRET=test-secret
    OAUTH_REDIRECT_URL= http://localhost:3000/process
    OAUTH_EXPIRES_IN= 3600
    ```
2. build the application:
   ```bash
     npm run buld
   ```
3. Start the application:
   ```bash
     npm run start
   ```

4. Run test:
  ```bash
     npm run test
   ```
   

## Example Request

1️⃣ Get Authorization Code

```bash
curl --location 'http://localhost:3000/api/oauth/authorize?response_type=code&client_id=upfirst&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fprocess&state=xyz123'
 ```

2️⃣ Exchange Authorization Code for Access Token

```bash
curl --location 'http://localhost:3000/api/oauth/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=authorization_code' \
--data-urlencode 'code=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6InVwZmlyc3QiLCJpYXQiOjE3Mzg5MjI0MDksImV4cCI6MTczODkyNDIwOX0.OpHYqXxbPl2QqC4R3tRxl28qEai3YeEZ7AN5xj3_q7U' \
--data-urlencode 'client_id=test-client-id' \
--data-urlencode 'redirect_uri=http://localhost:3000/process'
 ```

3️⃣ Refresh Access Token

```bash
curl --location 'http://localhost:3000/api/oauth/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=refresh_token' \
--data-urlencode 'refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6InVwZmlyc3QiLCJpYXQiOjE3Mzg5MjI0MDksImV4cCI6MTczODkyNDIwOX0.OpHYqXxbPl2QqC4R3tRxl28qEai3YeEZ7AN5xj3_q7U' \
--data-urlencode 'client_id=test-client-id' \
--data-urlencode 'redirect_uri=http://localhost:3000/process'
 ```
