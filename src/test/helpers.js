const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

process.env.NODE_ENV = 'test';

const config = {
    db: {
        test: ''
    },
    connection: null
};

function connect() {
    return new Promise((resolve, reject) => {
        if (config.connection) {
            return resolve();
        }

        const mongoUri = 'mongodb://netflix:netflix@cluster0-shard-00-00-pxwgo.mongodb.net:27017,cluster0-shard-00-01-pxwgo.mongodb.net:27017,cluster0-shard-00-02-pxwgo.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';

        mongoose.Promise = Promise;

        const options = {
            useNewUrlParser: true,
            reconnectTries: Number.MIN_VALUE,
            reconnectInterval: 1000
        }

        mongoose.connect(mongoUri, options);

        config.connection = mongoose.connection;
        config.connection
            .once('connected', resolve)
            .on('error', err => {
                if (err.message.code === 'ETIMEDOUT') {
                    console.log(err);
                    reject(err);
                }
            })
    });
}

function clearDatabase() {
    return new Promise(resolve => {
        var count = 0;
        var max = Object.keys(mongoose.connection.collections).length;

        for (const i in mongoose.connection.collections) {
            if (mongoose.connection.collections.hasOwnProperty(i)) {
                mongoose.connection.collections[i].remove(() => {
                    count++;
                    if (count >= max) {
                        resolve();
                    }
                })
            }
        }
    })
}


module.exports = async function setupTest() {
    await connect();
    await clearDatabase();
}
