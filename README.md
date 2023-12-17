# DevHub

A Social Platform for developers to communicate with their peers.

## Deployed Website

https://mern-devhub.netlify.app/

## Purpose

	DevHub is mainly designed to share ideas, skills, and knowledge to wide developers around the world. New Bees can easily interact with experienced developers and they can tune their skills. Also, Developers can expose their sharing and teaching skills.

#### User authentication/login system

Authentication is needed for clients to use the application, as a user and profile are needed to communicate with developers - the primary purpose of the application. 

- Users only have permission to use their dedicated parts of the website depending on their permission.


#### Dashboards

The dashboards serve the purpose of collecting all of the relevant information of the user like personal, experiences, education details , and also with github profiles.

#### Text chat/messaging between Developers

From either the fresher or experienced dashboard, there will be the ability to initiate a text medium to post something, that is more useful to readers also.

## Target Audience

Mainly designed for the buddies who are very eager to learn programming and they miss the oppurtunity to connect with senior or skilled devleopers. This platform will be a sugar syrup for them to build a sweet applications.

## Tech Stack

- MongoDB
- Express.js
- React
- Node.js
- React Redux
- Mongoose


DevHub is a full stack application built on the MERN stack (MongoDB, Express, React and Node) and utilises a range of open source libraries to assist with accelerating development time and improving authentication security. MongoDB was chosen as the Database Management System (DBMS) for several reasons, including that it affords dynamic and flexible document schemas that can contain a wide range of data attached to both patients and doctors respectively. Furthermore, MongoDB stores document data in Binary JSON (BSON), which integrates seamlessly with the core JavaScript-driven technologies of DevHub’s tech stack.

React is utilised on the front-end of DevHub, and is primarily responsible for handling the view layer of the application, including the user interface (UI), text, images, and making networking requests to API endpoints. The framework supports building reusable components that dramatically improve code quality, efficiency, and the scalability of the codebase. Express and Node are the server-side technologies that handle the backend business logic of DevHub, including routing, middleware integration, and network requests to RESTful API endpoints. React-Redux is used for global state control and management of themes across the entire application.

A JSON Web Token strategy for authentication of users will be employed. It allows RESTful endpoints to be authenticated without needing sessions. A local username and password authentication strategy is also being considered, to allow users to authenticate using a username and password stored in the Node.js application, to provide a familiar login flow for users of the application. 

Mongoose will be used with our MongoDB implementation, it is an Object Data Modelling (ODM) library for use with MongoDB and Node.js. It assists in managing the relationships between data, provides schema validation and is used to translate between objects in Node.js code and the representation of those objects in MongoDB.


DevHub is a single page application (SPA) that utilises the dashboard component as the main wrapper element for rendering various view layers.

Unauthenticated users can ONLY use the dashboard to view the developers profile. All other application features sit behind protected routes, and attempting to access them will push the browser navigation to the authentication component view.
