# Full Stack Recipe Web Application

## Overview

For my capstone project, I created a full stack recipe application using React, Node.js, Express, and MongoDB.  This recipe app allows users to register as a user, login, and post recipes and memories.  Users can create, view, update, and delete both recipes and memories.  Data is stored in a MongoDB database.

Front-end deployed here: https://capstone-project-recipe-app-front-end.onrender.com
Back-end deployed here: https://capstone-project-recipe-app-back-end.onrender.com

## Features

Project Proposal

User Management: 

    •	Friends and family can create user accounts and login
    •	Logged-in users have securely managed sessions and can log out

Recipe Management:

    •	Logged in users can create new recipes with title, ingredients, instructions, and optional image
    •	Users can view a list of all recipes, but edit and delete only their own
    •	Users can view dashboard of all personal recipes
    •	Users can view individual recipes with all information for that recipe

Memory Management:

    •	Logged in users can add memories, including poems, essays, or images
    •	Users can view a list of all memories, but edit and delete only their own
    •	Users can view a dashboard of all personal memories
    •	Users can view individual memories

The project will include all of the technical requirements listed in the rubric.  The technologies that will be used are React, Node.js, Express, and MongoDB.

## Tools

- HTML
- CSS
- JavaScript
- TypeScript
- React
- Vite
- React Router
- MongoDB
- Express
- Node.js

To Run this React application, follow the following steps in the terminal:
npm create vite@latest
cd task-dashboard
npm install
npm run dev

For the back-end, enter the following commands into the terminal:
npm init -y
npm install express dotenv axios mongoose bcyrpt jsonwebtoken cors
mpm install nodemon -D

"dev" : "nodemon server.js"  added to scripts in package.json

For the back-end .env file: add MONGO_URI=your mongo bd link here
JWT_SECRET
PORT
CLIENT_ORIGIN

For the front-end .env file: add vite api url

## Reflection

After 16 weeks of lectures, labs, and skill based assessments, I felt well-prepared for this project.  While writing the code was time consuming, I don't feel like there was anything in particular that was significantly challenging.  I continue to create type errors with TypeScript, but I am able to correct those mistakes more quickly now.  Some errors take time to track to specific code, but I find I am able to do that faster and with less help.  I would like to add more features, such as sorting and searches.  I would also like to add a contributor list to the home page so that users can view the recipes and memories for each participant.  I enjoyed this project and hope my friends will appreciate sharing recipes.