Bank Application (Rest Backend) Concept - Assessment
===

## This project assumes that you have MYSQL DATABASE installed locally and running on your system as the project database is configured locally
## It also assumes that you have knex installed globally on your machine
---

* Pull the assessment solution repository
    - > `git clone https://github.com/onojaMatthew/lendsqr-assessment.git`
* Pull up your favorite console and change into the cloned repository
* Install the projects dependencies 
    - > `yarn install`

Set up Environment Variables
---
* To declare environment variables for the project
* Create a `.env` file in the root directory of the project and add the following environment variables
* To add Database URI connection string (local database configuration)
    - > `DB_HOST=localhost`
    - > `DB_USER=your_db_username`
    - > `DB_NAME=your_database_name`
    - > `DB_PASSWORD=your_database_password`
    SECRET_KEY=somewondu43ooksgibrdsioewsh

NODE_ENV=test
* To add secret key for jsonwebtoken token to `.env` file
    - > `SECRET_KEY=yoursecretkey`

* To set development or test environment mode in the `.env` file
    - > `NODE_ENV=development` for development mode or `NODE_ENV=test` for test mode


Start Development 
---
* Change `NODE_ENV` from development to test mode in the `.env` file to connect to the TEST mongodb database
    - > `NODE_ENV=development`
* To build the project
    - > `yarn run build`
* To continuously watch for changes 
    - > `yarn run watch`
* To run migration 
    - > `yarn run migrate`
* To create seed
    - > `yarn run seed`
* To start the development server
    - > `yarn start`

Start Test 
---
* Change `NODE_ENV` from development to test mode in the `.env` file to connect to the TEST mongodb database
    - > `NODE_ENV=test`
* To build the project
    - > `yarn run build`
* To continuously watch for changes 
    - > `yarn run watch`
* To roll back migration 
    - > `yarn run rollback`
* To run migration 
    - > `yarn run migrate`
* To create seed to database
    - > `yarn run seed`
* To start the development server
    - > `yarn start`
