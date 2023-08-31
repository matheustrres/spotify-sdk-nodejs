import { SpotifySDK } from '../lib/spotify-sdk';
// ------------------
// fixtures
// ------------------
import spotifyApiGetAlbumResponse from './fixtures/albums/spotify_api_get_album_response.json';
import spotifyApiGetAlbumTracksResponse from './fixtures/albums/spotify_api_get_album_tracks_response.json';

describe('SpotifySDK', (): void => {
	let sdk: SpotifySDK;

	beforeAll((): void => {
		sdk = new SpotifySDK({
			clientId: process.env.SPOTIFY_CLIENT_ID as string,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
		});
	});

	it('should be defined', (): void => {
		expect(sdk).toBeDefined();
		expect(sdk.albums).toBeDefined();
		expect(sdk.artists).toBeDefined();
		expect(sdk.tracks).toBeDefined();
	});

	describe('.albums', (): void => {
		describe('.getAlbum', (): void => {
			it('should return spotify catalog information for an album', async (): Promise<void> => {
				const { data, error } = await sdk.albums.getAlbum(
					'4aawyAB9vmqN3uQ7FjRGTy',
				);

				expect(error).toBe(undefined);
				expect(data).toBeDefined();
				expect(data).toMatchObject(spotifyApiGetAlbumResponse);
			});
		});

		describe('.getAlbumTracks', (): void => {
			it("should return spotify catalog information about an album's tracks", async (): Promise<void> => {
				const { data, error } = await sdk.albums.getAlbumTracks(
					'4aawyAB9vmqN3uQ7FjRGTy',
				);

				expect(error).toBe(undefined);
				expect(data).toBeDefined();
				expect(data).toMatchObject(spotifyApiGetAlbumTracksResponse);
			});
		});
	});
});
