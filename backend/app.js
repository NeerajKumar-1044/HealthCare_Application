import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import authRouter from './src/routes/auth.route.js';
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import * as AdminJSMongoose from '@adminjs/mongoose'
import { User } from './src/models/user.model.js';


AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
})

const adminOptions = {
    resources: [User],
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const admin = new AdminJS(adminOptions)

const adminRouter = AdminJSExpress.buildRouter(admin)
app.use(admin.options.rootPath, adminRouter)




app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'https://remotecare.netlify.app',
    credentials: true,
}));



app.get('/health-check', (req, res) => {
    res.send('Server is running healthy 👍');
});


app.use('/api/users', authRouter);

export default app;
