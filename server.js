const express = require('express');
const path = require('path');

const connectDb = require('./config/db');
const usersRoute = require('./routes/api/users');
const postsRoute = require('./routes/api/posts');
const profileRoute = require('./routes/api/profile');
const authRoute = require('./routes/api/auth');
const HttpError = require('./models/Http-error');

const app = express();

connectDb();

app.use(express.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin,X-requested-With,Content-Type,Accept,x-auth-token');
	res.setHeader('Access-Control-Allow-Methods', 'POST,GET,DELETE,PUT');

	next();
});

app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);
app.use('/api/profiles', profileRoute);
app.use('/api/auth', authRoute);

app.use((error, req, res, next) => {
	res.status(error.code || 500);
	res.json({ message: error.message || 'An unkown error occurred' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('server is running'));
