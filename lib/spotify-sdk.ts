import { type Response, type SpotifyAlbum } from './typings';
import { makeGET } from './utils/request';
import { TokenManager } from './utils/token-manager';

export type SpotifySDKOptions = {
	clientId: string;
	clientSecret: string;
};

export interface ISpotifySDK {
	getAlbum(albumId: string): Promise<Response<SpotifyAlbum>>;
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

	private async makeRequest<T>(endpoint: string): Promise<Response<T>> {
		const authToken: string = await this.tokenManager.getAuthToken();

		return makeGET<T>(`https://api.spotify.com/v1/${endpoint}`, {
			headers: {
				Authorization: authToken,
			},
		});
	}
}
