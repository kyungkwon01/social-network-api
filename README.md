# Social Network API

## Description

The Social Network API is a backend project that provides API for building social networking applications. It is built using the Express.js framework for handling HTTP requests and Mongoose for interacting with the MongoDB database. This API allows users to create, read, update, and delete various resources.

## Table of Contents

-   [Technology](#technology)
-   [Installation](#installation)
-   [Using the API](#using-the-api)
-   [Routes](#routes)
-   [Video Walkthrough](#video-walkthrough)
-   [Questions](#questions)

## Technology

-   Express
-   Mongoose
-   Moment

## Installation

-   To use this API you would need to clone the repository, and use it locally. From your favorite IDE, run `npm i` or `npm install`. After installing all dependencies, run `node server` to start the server.

## Using the API

-   Once you have the code locally, run `node server` to create a connection to the server. The API server will start and be accessible at http://localhost:3001.

## Routes

Users

-   Get /api/users/: Get all users
-   GET /api/users/:userId: Get user by Id
-   POST /api/users/: Create new user
-   PUT /api/users/:userId: Update user
-   DELETE /api/users/:userId: Delete user

Thoughts

-   Get /api/thoughts/: Get all thoughts
-   GET /api/thoughts/:thoughtId: Get thought by Id
-   POST /api/thoughts/: Create new thought
-   PUT /api/thoughts/:thoughtId: Update thought
-   DELETE /api/thoughts/:thoughtId: Delete thought

Reactions

-   POST /api/thoughts/:thoughtId/reactions: Create new thought
-   DELETE /api/thoughts/:thoughtId/reactions/:reactionId: Delete thought

## Video Walkthrough

[Video Demo](https://drive.google.com/file/d/1tyL3bZnrDAIPAppm5tDBJVzCeLcrThVH/view?usp=drive_link)

## Questions

Github - https://github.com/kyungkwon01
