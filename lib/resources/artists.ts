import { type TokenManager } from '../utils/token-manager';
import { Resource } from './resource';

export interface ISpotifyArtistsResource {}

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
}
