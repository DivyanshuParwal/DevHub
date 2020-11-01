const mongoose = require('mongoose');
const config = require('config');
const dbUrl = config.get('mongoURI');

const connectDb = async () => {
	try {
		await mongoose.connect(dbUrl, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false
		});
		console.log('mongodb connected');
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

module.exports = connectDb;
