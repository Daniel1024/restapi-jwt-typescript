import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';
import authRoutes from './routes/auth.routes';
import express, {json, urlencoded} from 'express';
import specialRoutes from './routes/special.routes';
import passportMiddleware from './middlewares/passport'

// initializations
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(urlencoded({extended: false}));
app.use(json());
app.use(passport.initialize());
passport.use(passportMiddleware);

// routes
app.get('/', (req, res) => {
    res.send(`La API esta en http://localhost:${app.get('port')}`);
});

app.use(authRoutes);
app.use(specialRoutes);

export default app;
