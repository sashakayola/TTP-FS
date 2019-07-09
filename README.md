## Stockfront: a web based stock portfolio application

Stockfront is an application that allows users to buy stocks and keep track of their assets in a portfolio. Stockfront provides an easy way for users to see both past transactions and current holdings.
&nbsp;

## Backend Overview

### Three layers

***1. API layer***
  - Hierarchical design: endpoints are heirarchical such that subsequent and more specific endpoints provide drilled down data
    - For example, '/users/:id' will retrieve all data associated with a user (basic user info ***&*** the user's current holdings ***&*** user's past transactions)
    - The endpoint 'users/:id/holdings' will drill down and retrieve only the user's current holdings
    
***2. Domain layer***
  - Contains functions designed to provide data in the form of objects to the api layer
  - Acts as the intermediary between the database and the api routes
    
***3. Database layer***
  - Defines the three models users, transactions, and holdings. Schema:
  - ***User*** contains basic user information such as name, email, password, cash balance
  - ***Transaction*** holds all transactions a user has made, the date the transaction was made, ticker, quantity, and price bought or sold. Contains foreign key with user id.
  - ***Portfolio*** holds a user's current holdings (ticker and quantity). Aggregates transactions for a specific ticker to show the total quantity of a stock a user has in their current holdings.
  
&nbsp;

## Frontend Overview

### Overview
- Utilized React context to keep track of user authentication once the user logins/logouts
- Dashboard component acts as the parent component for the trading form, the portfolio, and the transactions components
  - Performs all logic needed to render child components (child components are simple and purely presentational)
  - Dashboard component makes axios calls to the api to process transactions, update user data such as current cash balance, retrieve stock price data from the IEX api

***Components:***
- Login
- Signup
- Navbar
- Dashboard - parent component for:
  - Portfolio: displays a table with the user's current holdings
  - Trading form: form to allow user to buy stock based on ticker and number of shares
  - Transactions: displays a table of all transactions a user has made to date
  
<img src="/public/assets/login.png" width="90%" height="90%"> <img src="/public/assets/signup.png" width="90%" height="90%">
<img src="/public/assets/portfolio.png" width="90%" height="90%"> <img src="/public/assets/transactions.png" width="90%" height="90%">
&nbsp;

## Getting started - install dependencies and start server
In order to run this app on your device, ....
`npm install`
`npm run dev`
&nbsp;

## Technology used
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Sequelize](https://www.npmjs.com/package/sequelize)
- [React](https://reactjs.org/)
- [Create React App](https://github.com/facebook/create-react-app)
- [IEX API](https://iextrading.com/developer/docs/#getting-started)

