# Nutrien Backend Interview Project

## Overview

This project is a simple RESTful API built using TypeScript, Node.js, Express.js, and Mikro-ORM. The API provides endpoints to retrieve data related to agricultural projections from a database.

## Technologies Used

* TypeScript
* Node.js
* Express.js
* Mikro-ORM
* PostgreSQL

## Project Structure

* `dist`: Compiled JavaScript code directory
* `tsconfig.json`: Configures the TypeScript compiler
* `src`: Source code directory
* `src/entities/`: Directory for entity definitions for the database
* `src/mikro-orm.config.ts`: Configures the Mikro-ORM connection to the database
* `src/server.ts`: Contains the main application logic

## Development Environment Setup

1. Clone the repository: `git clone https://github.com/jasonharrison/nutrien-be-interview`.
2. Install dependencies: `npm install -D`.
3. Create a PostgreSQL database and set the following environment variables: `RDS_HOSTNAME`, `RDS_PORT`, `RDS_DB_NAME`, `RDS_USERNAME`, and `RDS_PASSWORD`.
4. Run `npm run createSchema` to create the database schema.
5. Run `npm run seed` to seed the database with data (from `seed_data/Projection2021.csv`).
6. Run the application: `npm run dev`. This will start the development server, accessible at http://localhost:3123/ . The development server will automatically recompile and restart after any code changes.

## Running Locally with Docker Compose

To run the application and a PostgreSQL server container locally with Docker Compose, follow these steps:

1. Make sure you have Docker and Docker Compose installed on your system.
2. Clone the repository: `git clone https://github.com/jasonharrison/nutrien-be-interview`.
3. Navigate to the project directory: `cd nutrien-be-interview`.
4. Build and run the application with Docker Compose: `docker compose -f compose.dev.yml up --build --remove-orphans`.
5. The application will be accessible at http://localhost:3123/ .

## Deployment on AWS Elastic Beanstalk

To deploy this project on AWS Elastic Beanstalk using the EB CLI, follow these steps:

1. Clone the repository: `git clone https://github.com/jasonharrison/nutrien-be-interview`.
2. Install the EB CLI by following the instructions at https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html .
3. Initialize an Elastic Beanstalk application by running `eb init` in the project root directory. Follow the prompts to select your AWS region, application name, and platform (Docker running on 64bit Amazon Linux).
4. Create an environment and deploy your application by running `eb create nutrien-api --single --database`. This command sets up a single-instance environment named `nutrien-api`, configures a database, and deploys the application.

## API Endpoints

* `GET /:columnName`: Retrieve counts by column name
  * Returns a JSON object containing the counts for the specified column
  * Example request: `GET /commodity`
  * Example response: `{"Corn": 10, "Soybeans": 20}`
* `GET /:columnName/:value`: Retrieve type counts by column name and value
  * Returns a JSON object containing the type counts for the specified column and value
  * Example request: `GET /commodity/Corn`
  * Example response: `{"count": 10}`
* `GET /healthz`: Health check endpoint for Docker container

## Testing

Unit tests and integration tests were out of scope for this interview project. However, a testing framework like Jest or Mocha could be used to write tests for the API endpoints.
