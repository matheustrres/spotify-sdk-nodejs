import { SpotifyAlbumResource } from './resources/album';
import { TokenManager } from './utils/token-manager';

export type SpotifySDKOptions = {
	clientId: string;
	clientSecret: string;
};

/**
 * Represents the main SpotifySDK
 */
export class SpotifySDK {
	private readonly albumResource: SpotifyAlbumResource;
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

		this.albumResource = new SpotifyAlbumResource(this.tokenManager);
	}

  /**
   * The Spotify Albums resource manager
   */
	public get album(): SpotifyAlbumResource {
		return this.albumResource;
	}
}
