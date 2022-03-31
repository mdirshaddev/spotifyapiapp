import type { Request, Response } from 'express';

import { getNowPlaying } from 'utilities/spotify';

const GetCurrentPlaying = async (
	req: Request,
	res: Response
): Promise<void | unknown> => {
	const response = await getNowPlaying();
	console.log('Response ', response.data.item?.uri);

	if (
		response.status === 204 ||
		response.status > 400 ||
		response.data.currently_playing_type !== 'track'
	) {
		return res.status(200).json({ isPlaying: false });
	}

	const data = {
		isPlaying: response.data.is_playing,
		title: response.data.item.name,
		album: response.data.item.album.name,
		artist: response.data.item.album.artists
			.map(artist => artist.name)
			.join(', '),
		albumImageUrl: response.data.item.album.images[0].url,
		songUrl: response.data.item.external_urls.spotify
	};

	res.status(200).json(data);
};

export { GetCurrentPlaying };
