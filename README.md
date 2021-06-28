# geneRATION

## Table of contents

- [Status](#status)
- [General Info](#general-info)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Development](#development)
- [Features](#features)

## Status

Project is at early stages of development.

## General Info

<b>Problem Identification & Motivation: </b>
When it comes to food drives, there are always bumps in the process of soliciting donations from the public as well as the selection, sorting, and distribution of food products.  

One of the problems is a shortage of manpower to go door-to-door and engage with members of the public in attempt to prompt them to contribute to the food drive. There is also a manpower shortage to visit each unit a week later to check if would like to donate. Since volunteers have no clue which units would be donating, the conventional method would be to knock on every unit.  

Other problems include a lack of food donations to evenly allocate to the beneficiaries, leading to the charitable organisations spending their own money to supplement these missing products. Also, food products that are donated must be re-screened to ensure that they are halal certified and have a minimum of three months left on their shelf life.  

As a result, as individuals who recognise the value of food donation drives and their effect on the less fortunate in our society, we want to build a website that will make it easier for charitable organisations to organise food drives in the future.  

<b>Aim:</b>
The aim of this website is to make the process of organising food drives for charitable organisations easier and more effective, requiring less manpower.  

## Tech Stack

- MongoDB
- ExpressJS
- VueJS
- NodeJS

## Setup

### Ensure that you have Node.js and npm installed.

If you do not have Node.js installed, it is recommended to install from their site [here](https://nodejs.org/en/). This will install the latest version of Node.js along with npm.

### Clone the repository

```bash
git clone git@github.com:glennbjorn/geneRATION.git
```

### Install dependencies

1. The first thing we need to do is to install nodemon globally so that it can be accessed anywhere on our local machine. To install that open ur terminal and type this command:
```bash
npm install -g nodemon
```

2. We can now install packages
```bash
cd client
npm i vue express mongoose bcrypt jsonwebtoken nodemon morgan body-parser cors dotenv --save
cd ..
```

## Development

### Start server in development

1. Set the node environment to "development"

For Windows:
    ```
    SET NODE_ENV=development
    ```

For MacOS:
    ```
    export NODE_ENV=development
    ```

2. Run the back end server (on port 4000)
    ```bash
    cd server
    nodemon
    ```

The server should now be running locally on `localhost:4000`

The backend server must be running before starting the app.

### Start app in development

1. Start the app on another terminal (on port 8080)
    ```bash
    cd ../client
    npm run serve
    ```

The app should now be running locally on `localhost:8080`.

The website should be now be live and connected with the backend server and database.

## Features

<b>List of core features</b>

- Organisers can create new food drive campaigns
- Every food drive will have a new form for members of the public to fill
- Structured database for organisers to easily refer to
- Target and progression charts for each food drive campaign
