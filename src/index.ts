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
import axios from 'axios';

const {
	SPOTIFY_CLIENT_ID: client_id,
	SPOTIFY_CLIENT_SECRET_TOKEN: client_secret,
	SPOTIFY_REFRESH_TOKEN: refresh_token
} = process.env;

const token = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

console.log('Authorization ', token);

const getAccessToken = async (): Promise<string | unknown> => {
	try {
		const res = await axios.post<{ access_token: string }>(
			process.env.TOKEN_ENDPOINT,
			new URLSearchParams([
				['grant_type', 'refresh_token'],
				['refresh_token', refresh_token]
			]).toString(),
			{
				headers: {
					Authorization: `Basic ${token}`,
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}
		);

		return res.data.access_token;
	} catch (err) {
		console.log(err);
	}
};

getAccessToken().then(data => console.log('Access Token', data));

console.log('Client ID ', process.env.SPOTIFY_CLIENT_ID);

app.use('/spotify', SpotifyRoute);

app.listen(process.env.PORT, (): void => {
	console.log(`Server is up and running in ${process.env.PORT}`);
});
