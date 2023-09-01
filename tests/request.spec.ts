import { type SpotifyApiResponse, makeGET, makePOST } from '../lib/request';
import {
	type SpotifyApiClientCredentials,
	type SpotifyArtist,
} from '../lib/typings';
import { SpotifyTokenManager } from '../lib/utils/token-manager';
import spotifyApiGetArtistResponse from './fixtures/artists/spotify_api_get_artist_response.json';

const mockFetchResponse = <T>(response: T): jest.Mock =>
	jest.fn().mockImplementation(async () => {
		return {
			json: async (): Promise<T> => response,
		};
	});

describe('Request', (): void => {
	const baseURL: string = 'https://api.spotify.com/v1';
	const baseAuthURL: string = 'https://accounts.spotify.com/api';

	let tokenManager: SpotifyTokenManager;
	let authToken: string;

	afterAll((): void => {
		jest.clearAllMocks();
	});

	beforeAll(async (): Promise<void> => {
		tokenManager = new SpotifyTokenManager(
			process.env.SPOTIFY_CLIENT_ID as string,
			process.env.SPOTIFY_CLIENT_SECRET as string,
		);

		authToken = await tokenManager.getAuthToken();
	});

	describe('X GET', (): void => {
		it('should call GET with correct parameters', async (): Promise<void> => {
			global.fetch = mockFetchResponse(spotifyApiGetArtistResponse);

			await makeGET(`${baseURL}/artists/0TnOYISbd1XYRBk9myaseg`, {
				headers: {
					Authorization: authToken,
				},
			});

			expect(global.fetch).toHaveBeenCalledWith(
				new URL(`${baseURL}/artists/0TnOYISbd1XYRBk9myaseg`),
				{
					method: 'GET',
					headers: {
						Authorization: authToken,
					},
				},
			);
		});

		it('should return data on success', async (): Promise<void> => {
			global.fetch = mockFetchResponse<SpotifyApiResponse<SpotifyArtist>>(
				spotifyApiGetArtistResponse,
			);

			const response = await makeGET<SpotifyArtist>(
				`${baseURL}/artists/0TnOYISbd1XYRBk9myaseg`,
				{
					headers: {
						Authorization: authToken,
					},
				},
			);

			expect(response).toMatchObject(spotifyApiGetArtistResponse);
		});

		it('should return an error when providing invalid parameters', async (): Promise<void> => {
			global.fetch = mockFetchResponse<SpotifyApiResponse>({
				error: {
					message: 'invalid id',
					status: 400,
				},
			});

			const { error } = await makeGET(`${baseURL}/artists/fake-artist-id`, {
				headers: {
					Authorization: authToken,
				},
			});

			expect(error).toBeDefined();
			expect(error!.message).toBe('invalid id');
			expect(error!.status).toBe(400);
		});
	});

	describe('X POST', (): void => {
		it('should call POST with correct parameters', async (): Promise<void> => {
			global.fetch = mockFetchResponse(null);

			await makePOST(`${baseAuthURL}/token?grant_type=client_credentials`, {
				headers: {
					Authorization: authToken,
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});

			expect(global.fetch).toHaveBeenCalledWith(
				new URL(`${baseAuthURL}/token?grant_type=client_credentials`),
				{
					method: 'POST',
					headers: {
						Authorization: authToken,
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				},
			);
		});

		it('should return data on success', async (): Promise<void> => {
			global.fetch = mockFetchResponse<SpotifyApiClientCredentials>({
				access_token: 'random_access_token',
				expires_in: 3600,
				token_type: 'Bearer',
			});

			const response = await makePOST(
				`${baseAuthURL}/token?grant_type=client_credentials`,
				{
					headers: {
						Authorization: authToken,
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				},
			);

			expect(response.error).toBe(undefined);
			expect(response).toEqual({
				access_token: 'random_access_token',
				expires_in: 3600,
				token_type: 'Bearer',
			});
		});
	});
});
