import { SpotifyAlbumsResource } from './resources/albums';
import { SpotifyArtistsResource } from './resources/artists';
import { SpotifyTracksResource } from './resources/tracks';
import { TokenManager } from './utils/token-manager';

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

	private readonly tokenManager: TokenManager;

	/**
	 * Create a new SpotifySDK instance
	 *
	 * @param {SpotifySDKOptions} options - The SpotifySDK options
	 * @param {String} options.clientId - The Spotify client id
	 * @param {String} options.clientSecret - The Spotify client secret
	 */
	public constructor(options: SpotifySDKOptions) {
		this.tokenManager = new TokenManager(
			options.clientId,
			options.clientSecret,
		);

		this.albumsResource = new SpotifyAlbumsResource(this.tokenManager);
		this.artistsResource = new SpotifyArtistsResource(this.tokenManager);
		this.tracksResource = new SpotifyTracksResource(this.tokenManager);
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
