import { type IHttpClient } from '../http-client';
import { type SpotifyApiResponse, type Result } from '../typings';
import { type SpotifyTokenManager } from '../utils/token-manager';

export class Resource {
	public constructor(
		protected readonly spotifyTokenManager: SpotifyTokenManager,
		private readonly httpClient: IHttpClient,
	) {}

	protected async makeRequest<T>(
		endpoint: string,
	): Promise<SpotifyApiResponse<T>> {
		const authToken: string = await this.spotifyTokenManager.getAuthToken();

		return this.httpClient.GET<T>(`https://api.spotify.com/v1/${endpoint}`, {
			headers: {
				Authorization: authToken,
			},
		});
	}

	protected reply<T>(spotifyApiResponse: SpotifyApiResponse<T>): Result<T> {
		const timestamp: string = new Date().toISOString();

		if (spotifyApiResponse.error) {
			return {
				timestamp,
				error: spotifyApiResponse.error,
			};
		}

		return {
			timestamp,
			data: spotifyApiResponse,
		};
	}
}
