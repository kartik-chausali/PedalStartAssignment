# PedalStartAssignment

This project is a simple task Management application with a frontend built using React and a backend built using Hono as server side library , cloudflare workers, prisma as ORM and postgres as database .

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm (Node Package Manager).
  - Download and install Node.js from [Node.js official website](https://nodejs.org/).
- Basic understanding of Typescript.

## Setting Up the Project Locally

Follow these steps to set up and run the project locally.

### Step 1: Clone the Repository

First, clone the repository to your local machine using git:

```bash
git clone https://github.com/kartik-chausali/PedalStartAssignment.git
````

### Step 2 : Navigate to the Project Directory
````bash
cd PedalStartAssignment
````
### Step 3 : Install Dependencies
The project has two main folders, backend and frontend. You need to install the dependencies for each of these folders.
 #### Backend
 ````bash
cd backend
npm install
````
#### Frontend
````bash
cd ../frontend
npm install
````

### Step 4 : Run the project
 #### Backend 
 For convinience , DATABASE_URL, accelerate URL is already provided in repository, otherwise one should get database connection string add it in .env inside prisma folder and also get prisma accelerate string and add it in wranger.toml file.
 To start the backend server, run the following command in the backend folder:
 ````bash
npm run dev
````

#### Frontend
To start the frontend server, run the following command in the frontend folder:
````bash
npm run dev
````
