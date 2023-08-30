import { type TokenManager } from '../utils/token-manager';
import { Resource } from './resource';

export interface ISpotifyTracksResource {}

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
}
