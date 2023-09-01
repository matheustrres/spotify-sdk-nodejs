import { type IHttpClient } from '../http-client';
import { type SpotifyApiClientCredentials } from '../typings';

export interface ISpotifyTokenManager {
	getAuthToken(): Promise<string>;
}

export class SpotifyTokenManager implements ISpotifyTokenManager {
	private readonly httpClient: IHttpClient;

	private readonly basicAuthCredentials: string; // base64 encoded credential

	private authToken: string; // Bearer <token>
	private tokenExpirationDate: number;

	constructor(clientId: string, clientSecret: string, httpClient: IHttpClient) {
		this.basicAuthCredentials = Buffer.from(
			`${clientId}:${clientSecret}`,
		).toString('base64');

		this.tokenExpirationDate = 0;
		this.authToken = '';

		this.httpClient = httpClient;
	}

	public async getAuthToken(): Promise<string> {
		if (!this.authToken || this.isAuthTokenExpired()) {
			await this.fetchClientToken();
		}

		return this.authToken;
	}

	private isAuthTokenExpired(): boolean {
		return (
			this.tokenExpirationDate === 0 || Date.now() > this.tokenExpirationDate
		);
	}

	private async fetchClientToken(): Promise<void> {
		const response = await this.httpClient.POST<SpotifyApiClientCredentials>(
			'https://accounts.spotify.com/api/token?grant_type=client_credentials',
			{
				headers: {
					Authorization: `Basic ${this.basicAuthCredentials}`,
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			},
		);

		if (response.error) {
			throw new Error(`Error while fetching client token: "${response.error}"`);
		}

		this.authToken = `${response.token_type} ${response.access_token}`;
		this.tokenExpirationDate = Date.now() + response.expires_in * 1000 - 5000;
	}
}
