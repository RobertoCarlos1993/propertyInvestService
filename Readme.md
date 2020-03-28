# Property Investment service

 Using Idealista API the app retrieve information from certain location and save data such as price, size and etc.

## Example of Idealista API response

- It can be found it backend/idealista_api_response.json

## Setup-Backend 

- Create .env with your environment variables and Idealista API credentials
- Install dependencies: `npm install`
- Running backend/db/initDb.js with Node, we will able to create the proper table and seed it with the data from API response
- Run the b/e module: `npm run start`

## Setup-Frontend

- Install dependencies: `npm install`
- Run in dev environment: `npm run start`


## Unit testing the f/e components 

The testing has been done using Jest and Enzyme.

- Run the following command to inspect results: `npm run test`
