import type { Application, Request, Response } from 'express';
import express from 'express';
import morgan from 'morgan';
import SpotifyRoute from 'routes/spotify';

const app: Application = express();

app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms')
);

app.get('/', async (req: Request, res: Response): Promise<void> => {
	res.status(200).json({ message: 'Heroku and Express is up and running' });
});

app.use('/spotify', SpotifyRoute);

app.listen(process.env.PORT, (): void => {
	console.log(`Server is up and running in ${process.env.PORT}`);
});
