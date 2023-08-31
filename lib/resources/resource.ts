import { makeGET, type SpotifyApiResponse } from '../utils/request';
import { type TokenManager } from '../utils/token-manager';

export class Resource {
	protected readonly tokenManager: TokenManager;

	public constructor(tokenManager: TokenManager) {
		this.tokenManager = tokenManager;
	}

	protected async makeRequest<T>(
		endpoint: string,
	): Promise<SpotifyApiResponse<T>> {
		const authToken: string = await this.tokenManager.getAuthToken();

		return makeGET<T>(`https://api.spotify.com/v1/${endpoint}`, {
			headers: {
				Authorization: authToken,
			},
		});
	}
}
