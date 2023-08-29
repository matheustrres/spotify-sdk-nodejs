import { type Response, type SpotifyArtist } from '../typings';
import { type TokenManager } from '../utils/token-manager';
import { Resource } from './resource';

export interface ISpotifyArtistsResource {
	getArtist(artistId: string): Promise<Response<SpotifyArtist>>;
}

/**
 * Represents the Spotify Artists resource manager
 *
 * @extends {Resource}
 * @implements {ISpotifyArtistsResource}
 */
export class SpotifyArtistsResource
	extends Resource
	implements ISpotifyArtistsResource
{
	public constructor(tokenManager: TokenManager) {
		super(tokenManager);
	}

	/**
	 * Get Spotify catalog information for a single artist
	 *
	 * @param {String} artistId - The Spotify ID of the artist
	 * @returns {Promise<Response<SpotifyArtist>>}
	 */
	public async getArtist(artistId: string): Promise<Response<SpotifyArtist>> {
		return this.makeRequest<SpotifyArtist>(`artists/${artistId}`);
	}
}
