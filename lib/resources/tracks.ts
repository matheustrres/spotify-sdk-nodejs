import { type SpotifyTrack, type Response } from '../typings';
import { type TokenManager } from '../utils/token-manager';
import { Resource } from './resource';

export interface ISpotifyTracksResource {
	getTrack(trackId: string): Promise<Response<SpotifyTrack>>;
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

	public async getTrack(trackId: string): Promise<Response<SpotifyTrack>> {
		return this.makeRequest<SpotifyTrack>(`tracks/${trackId}`);
	}
}
