import {
	type SpotifySeveralAlbums,
	type Response,
	type SpotifyAlbum,
} from './typings';
import { makeGET } from './utils/request';
import { TokenManager } from './utils/token-manager';

export type SpotifySDKOptions = {
	clientId: string;
	clientSecret: string;
};

export interface ISpotifySDK {
	getAlbum(albumId: string): Promise<Response<SpotifyAlbum>>;
	getSeveralAlbums(
		albumsIds: string[],
		market?: string,
	): Promise<Response<SpotifySeveralAlbums>>;
}

/**
 * Represents the main SpotifySDK client
 *
 * @implements {ISpotifySDK}
 */
export class SpotifySDK implements ISpotifySDK {
	private readonly tokenManager: TokenManager;

	/**
	 * Create a new SpotifySDK instance
	 *
	 * @param {SpotifySDKOptions} options - The SpotifySDK options
	 * @param {String} options.clientId - The Spotify client id
	 * @param {String} options.clientSecret - The Spotify client secret
	 */
	constructor(options: SpotifySDKOptions) {
		this.tokenManager = new TokenManager(
			options.clientId,
			options.clientSecret,
		);
	}

	/**
	 * Get Spotify catalog information for a single album
	 *
	 * @param {String} albumId - The Spotify ID of the album
	 * @returns {Promise<Response<SpotifyAlbum>>}
	 */
	public async getAlbum(albumId: string): Promise<Response<SpotifyAlbum>> {
		return this.makeRequest<SpotifyAlbum>(`albums/${albumId}`);
	}

	/**
	 * Get Spotify catalog information for multiple albums
	 *
	 * @param {Array<string>} albumsIds - A comma-separated list of Spotify IDs for the albums
	 * @param {String} [market] - An ISO-3166-1 alpha-2 country code (e.g. `US`, `BR`)
	 * @returns {Promise<Response<SpotifySeveralAlbums>>}
	 */
	public async getSeveralAlbums(
		albumsIds: string[],
		market: string = 'US',
	): Promise<Response<SpotifySeveralAlbums>> {
		return this.makeRequest<SpotifySeveralAlbums>(
			`albums?ids=${albumsIds.slice(0, 19).join(',')}&market=${market}`,
		);
	}

	private async makeRequest<T>(endpoint: string): Promise<Response<T>> {
		const authToken: string = await this.tokenManager.getAuthToken();

		return makeGET<T>(`https://api.spotify.com/v1/${endpoint}`, {
			headers: {
				Authorization: authToken,
			},
		});
	}
}
