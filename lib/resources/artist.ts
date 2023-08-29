import { type TokenManager } from '../utils/token-manager';
import { Resource } from './resource';

export interface ISpotifyArtistResource {}

/**
 * Represents the Spotify Artists resource manager
 *
 * @extends {Resource}
 * @implements {ISpotifyArtistResource}
 */
export class SpotifyArtistResource
	extends Resource
	implements ISpotifyArtistResource
{
	public constructor(tokenManager: TokenManager) {
		super(tokenManager);
	}
}
