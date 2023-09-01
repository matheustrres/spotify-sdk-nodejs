import { type SpotifyApiResponse, makeGET } from '../lib/request';
import { type SpotifyArtist } from '../lib/typings';
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
	});
});
