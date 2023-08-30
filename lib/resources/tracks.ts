import { type SpotifyTrack, type Response } from '../typings';
import { type TokenManager } from '../utils/token-manager';
import { Resource } from './resource';

export interface ISpotifyTracksResource {
	getTrack(trackId: string, market?: string): Promise<Response<SpotifyTrack>>;
}

/**
 * Represents the Spotify Tracks resource manager
 *
 * @extends {Resource}
 * @implements {ISpotifyTracksResource}
 */
export class SpotifyTracksResource
	extends Resource
	implements ISpotifyTracksResource
{
	public constructor(tokenManager: TokenManager) {
		super(tokenManager);
	}

	/**
	 * Get Spotify catalog information for a single track
	 *
	 * @param {String} trackId - The Spotify ID for the track
	 * @param {String} [market] - An ISO-3166-1 alpha-2 country code (e.g. `US`, `BR`)
	 * @returns {Promise<Response<SpotifyTrack>>}
	 */
	public async getTrack(
		trackId: string,
		market: string = 'US',
	): Promise<Response<SpotifyTrack>> {
		return this.makeRequest<SpotifyTrack>(`tracks/${trackId}?market=${market}`);
	}
}
