# Typescript Restify API Server

## Overview

This repository contains the back-end submission of a 3rd year final year project demonstrating a Professional Practise in IT and a well structured, easy-to-use RESTful web server.

The server runs using Node.js and is written in Typescript using Restify. Restify borrows heavily from [Express](https://expressjs.com/) however does not provide the ability of server template files.

Development workflow is managed using npm scripts. The Typescript source is contained in the src directory and transpiled to lib - where PM2 is used as a process manager to allow live reloading of the server if changes and made and saved. The script will clean the lib directory where the server is running, rebuild the files using the Typescript compiler and restart the server - making for a smooth development workflow without having to manually restart the server when changes have been made.

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Neo4j](https://neo4j.com/download/)

## Quickstart

    npm install -g pm2@latest bunyan
    
    npm install

    npm run watch

## Healthcheck

As it stands the API provides only one test - Healthcheck. The server provides a basic healthcheck test for verifying that the /healthcheck route is a live and working. A future improvement for the server is to have to test for all pieces of functionality.

Tests are currently carried out using Mocha, Chai and Supertest.

    npm run test

