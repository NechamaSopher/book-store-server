# Bookstore Server

This is a Bookstore Server built using Node.js and Koa framework. It includes JWT authentication and functionalities for handling payments and sending emails.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Payment Service](#payment-service)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/NechamaSopher/book-store-server.git
    ```

2. Navigate to the project directory:
    ```sh
    cd bookstore-server
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```

## Configuration

1. Create local ProgreSQL DB.
2. Create a `.env` file in the config file in your project and add the following configurations:
    ```env
        const vars = {
            PORT=3000
            DATABASE_URL=your_database_url
            ACCESS_TOKEN_SECRET=secret_key_verifying_token
            REFRESH_TOKEN_SECRET=secret_key_verifying_token_refresh
            MAIL_TRANSPORT_DETAILS: {
              SMTP_HOST=
              SMTP_PORT=
              SMTP_USER=
              SMTP_PASSWORD=
              SMTP_FROM_NAME=
              SMTP_FROM_ADDRESS=
            }
            STRIPE_SECRET_KEY=your_payment_api_key
            SERVER_URL=your_server_key
        }
    
        Object.keys(vars).forEach(key => process.env[key] = process.env[key] || vars[key]);
    ```

3. Replace the placeholders with your actual configuration values

## Usage
### Local server

Start the server:

    
    npm start
    
The server will start on the port specified in the `.env` file (default is 3000).

### Build
Build the server:

    
    npm run build
    
The build artifacts will be stored in the build/ directory.


## Payment Service

The payment service is integrated using Stripe - third-party API. To process a payment, include the payment details in the order creation endpoint.
