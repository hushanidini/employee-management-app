import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import * as middlewares from './middlewares/middlewares';
import MessageResponse from './interfaces/MessageResponse';
import api from './api';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());



app.get<{}, MessageResponse>('/', (req, res) => {
    res.json({
        message: 'response message',
    });
});
app.use('/api/v1', api);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;