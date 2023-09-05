import { type HttpClient } from '../http-client';
import { type SpotifyTokenManager } from '../utils/token-manager';
import { Resource } from './resource';

export interface ISpotifyPlaylistsResource {}

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
}
