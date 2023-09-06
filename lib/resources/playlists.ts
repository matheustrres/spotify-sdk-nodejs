import { type HttpClient } from '../http-client';
import { type Result, type SpotifyPlaylist } from '../typings';
import { generateQParams } from '../utils/gen-q-params';
import { type SpotifyTokenManager } from '../utils/token-manager';
import { Resource } from './resource';

type PlaylistAdditionalTypes = 'track' | 'episode';

export interface ISpotifyPlaylistsResource {
	getPlaylist(
		playlistId: string,
		market?: string,
		additionalTypes?: Array<PlaylistAdditionalTypes>,
	): Promise<Result<SpotifyPlaylist>>;
}

/**
 * Represents the Spotify Playlists resource manager
 *
 * @extends {Resource}
 * @implements {ISpotifyPlaylistsResource}
 */
export class SpotifyPlaylistsResource
	extends Resource
	implements ISpotifyPlaylistsResource
{
	public constructor(
		spotifyTokenManager: SpotifyTokenManager,
		httpClient: HttpClient,
	) {
		super(spotifyTokenManager, httpClient);
	}

	/**
	 * Get a playlist owned by a Spotify user
	 *
	 * @param {String} playlistId - The Spotify ID of the playlist
	 * @param {String} [market] - An ISO-3166-1 alpha-2 country code (e.g. `US`, `BR`)
	 * @param {Array<PlaylistAdditionalTypes>} [additionalTypes] - A list of item types to be added to the playlist
	 * @returns {Promise<>}
	 */
	public async getPlaylist(
		playlistId: string,
		market?: string,
		additionalTypes?: Array<PlaylistAdditionalTypes>,
	): Promise<Result<SpotifyPlaylist>> {
		const endpoint: string = `playlists/${playlistId}`;
		const qParams: string = generateQParams<PlaylistQParams>({
			market,
			additional_types: additionalTypes?.join(','),
		});

		const spotifyApiResponse = await this.makeRequest<SpotifyPlaylist>(
			`${endpoint}?${qParams}`,
		);

		return this.reply(spotifyApiResponse);
	}
}

type PlaylistQParams = {
	market?: string;
	additional_types?: string[];
};
