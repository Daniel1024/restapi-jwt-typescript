import mongoose, {ConnectionOptions} from 'mongoose';
import config from "./config";

const dbOptions: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(config.DB.URI, dbOptions);

const connection = mongoose.connection;

connection.once('open', () => console.log('Mongodb connection stablished'));

connection.on('error', err => {
    console.error(err);
    process.exit(0);
});
