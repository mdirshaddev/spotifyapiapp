declare namespace NodeJS {
	export interface ProcessEnv {
		PORT: number;
		SPOTIFY_CLIENT_ID: string;
		SPOTIFY_CLIENT_SECRET_TOKEN: string;
		SPOTIFY_REFRESH_TOKEN: string;
		NOW_PLAYING_ENDPOINT: string;
		TOKEN_ENDPOINT: string;
	}
}
