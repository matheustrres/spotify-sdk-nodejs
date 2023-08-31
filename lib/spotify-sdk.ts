import { SpotifyAlbumsResource } from './resources/albums';
import { SpotifyArtistsResource } from './resources/artists';
import { SpotifyTracksResource } from './resources/tracks';
import { SpotifyTokenManager } from './utils/token-manager';

export type SpotifySDKOptions = {
	clientId: string;
	clientSecret: string;
};

/**
 * Represents the main SpotifySDK
 */
export class SpotifySDK {
	private readonly albumsResource: SpotifyAlbumsResource;
	private readonly artistsResource: SpotifyArtistsResource;
	private readonly tracksResource: SpotifyTracksResource;

	private readonly spotifyTokenManager: SpotifyTokenManager;

	/**
	 * Create a new SpotifySDK instance
	 *
	 * @param {SpotifySDKOptions} options - The SpotifySDK options
	 * @param {String} options.clientId - The Spotify client id
	 * @param {String} options.clientSecret - The Spotify client secret
	 */
	public constructor(options: SpotifySDKOptions) {
		this.spotifyTokenManager = new SpotifyTokenManager(
			options.clientId,
			options.clientSecret,
		);

		this.albumsResource = new SpotifyAlbumsResource(this.spotifyTokenManager);
		this.artistsResource = new SpotifyArtistsResource(this.spotifyTokenManager);
		this.tracksResource = new SpotifyTracksResource(this.spotifyTokenManager);
	}

	/**
	 * The Spotify Albums resource manager
	 */
	public get albums(): SpotifyAlbumsResource {
		return this.albumsResource;
	}

	/**
	 * The Spotify Artists resource manager
	 */
	public get artists(): SpotifyArtistsResource {
		return this.artistsResource;
	}

	/**
	 * The Spotify Tracks resource manager
	 */
	public get tracks(): SpotifyTracksResource {
		return this.tracksResource;
	}
}
