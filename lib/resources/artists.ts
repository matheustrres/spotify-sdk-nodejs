import {
	type SpotifySeveralArtists,
	type Response,
	type SpotifyArtist,
} from '../typings';
import { type TokenManager } from '../utils/token-manager';
import { Resource } from './resource';

export interface ISpotifyArtistsResource {
	getArtist(artistId: string): Promise<Response<SpotifyArtist>>;
	getSeveralArtists(
		artistsIds: string[],
	): Promise<Response<SpotifySeveralArtists>>;
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

	/**
	 * Get Spotify catalog information for several artists
	 *
	 * @param {Array<String>} artistsIds - A comma-separated list of the Spotify IDs for the artists
	 */
	public async getSeveralArtists(
		artistsIds: string[],
	): Promise<Response<SpotifySeveralArtists>> {
		return this.makeRequest<SpotifySeveralArtists>(
			`artists?ids=${artistsIds.slice(0, 49).join(',')}`,
		);
	}
}
