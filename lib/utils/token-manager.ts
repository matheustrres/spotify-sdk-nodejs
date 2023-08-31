import { makePOST } from '../request';
import { type SpotifyApiClientCredentials } from '../typings';

export interface ITokenManager {
	getAuthToken(): Promise<string>;
}

export class TokenManager implements ITokenManager {
	private readonly basicAuthCredentials: string; // base64 encoded credential

	private authToken: string; // Bearer <token>
	private tokenExpirationDate: number;

	constructor(clientId: string, clientSecret: string) {
		this.basicAuthCredentials = Buffer.from(
			`${clientId}:${clientSecret}`,
		).toString('base64');

		this.tokenExpirationDate = 0;
		this.authToken = '';
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
		const response = await makePOST<SpotifyApiClientCredentials>(
			'https://accounts.spotify.com/api/token?grant_type=client_credentials',
			{
				headers: {
					Authorization: `Basic ${this.basicAuthCredentials}`,
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			},
		);

		if (response.error) {
			throw new Error(
				`Error while fetching client token: "${response.error.message}"`,
			);
		}

		this.authToken = `${response.token_type} ${response.access_token}`;
		this.tokenExpirationDate = Date.now() + response.expires_in * 1000 - 5000;
	}
}
