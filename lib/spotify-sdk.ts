import { HttpClient, type IHttpClient } from './http-client';
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
	private readonly httpClient: IHttpClient;

	/**
	 * The Spotify Albums resource manager
	 */
	public readonly albums: SpotifyAlbumsResource;
	/**
	 * The Spotify Artists resource manager
	 */
	public readonly artists: SpotifyArtistsResource;
	/**
	 * The Spotify Tracks resource manager
	 */
	public readonly tracks: SpotifyTracksResource;

	private readonly spotifyTokenManager: SpotifyTokenManager;

	/**
	 * Create a new SpotifySDK instance
	 *
	 * @param {SpotifySDKOptions} options - The SpotifySDK options
	 * @param {String} options.clientId - The Spotify client id
	 * @param {String} options.clientSecret - The Spotify client secret
	 */
	public constructor(options: SpotifySDKOptions, httpClient?: IHttpClient) {
		this.httpClient = httpClient || new HttpClient();

		this.spotifyTokenManager = new SpotifyTokenManager(
			options.clientId,
			options.clientSecret,
			this.httpClient,
		);

		this.albums = new SpotifyAlbumsResource(
			this.spotifyTokenManager,
			this.httpClient,
		);
		this.artists = new SpotifyArtistsResource(
			this.spotifyTokenManager,
			this.httpClient,
		);
		this.tracks = new SpotifyTracksResource(
			this.spotifyTokenManager,
			this.httpClient,
		);
	}
}
