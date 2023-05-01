// Express Typings
import type { Application, Request, Response } from 'express';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Routers
import SpotifyRoute from 'routes/spotify';

const app: Application = express();

const whitelist = [
	'http://localhost:3000',
	'http://localhost:5173',
	'http://localhost:4173',
	'http://localhost:4000',
	'http://localhost:8080',
	'https://mdirshaddev.vercel.app',
	'https://fizzy.vercel.app'
];

app.use(
	cors({
		origin: whitelist
	})
);

app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms')
);

app.get('/', async (req: Request, res: Response): Promise<void> => {
	res.status(200).json({ message: 'Heroku and Express is up and running' });
});

app.use('/spotify', SpotifyRoute);

app.listen(process.env.PORT, (): void => {
	morgan(`Server is up and running in ${process.env.PORT}`);
});
