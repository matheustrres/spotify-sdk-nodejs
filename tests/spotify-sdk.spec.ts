import { SpotifySDK } from '../lib/spotify-sdk';
// ------------------
// fixtures/albums
// ------------------
import spotifyApiGetAlbumResponse from './fixtures/albums/spotify_api_get_album_response.json';
import spotifyApiGetAlbumTracksResponse from './fixtures/albums/spotify_api_get_album_tracks_response.json';
import spotifyApiGetNewsReleasesResponse from './fixtures/albums/spotify_api_get_new_releases_response.json';
import spotifyApiGetSeveralAlbumsResponse from './fixtures/albums/spotify_api_get_several_albums_response.json';
// ------------------
// fixtures/artists
// ------------------
import spotifyApiGetArtistAlbumsResponse from './fixtures/artists/spotify_api_get_artist_albums_response.json';
import spotifyApiGetArtistResponse from './fixtures/artists/spotify_api_get_artist_response.json';
import spotifyApiGetArtistTopTracksResponse from './fixtures/artists/spotify_api_get_artist_top_tracks_response.json';
import spotifyApiGetSeveralArtistsResponse from './fixtures/artists/spotify_api_get_several_artists_response.json';
// ------------------
// fixtures/tracks
// ------------------
import spotifyApiGetSeveralTracksResponse from './fixtures/tracks/spotify_api_get_several_tracks_response.json';
import spotifyApiGetTrackAudioFeatures from './fixtures/tracks/spotify_api_get_track_audio_features_response.json';
import spotifyApiGetTrackResponse from './fixtures/tracks/spotify_api_get_track_response.json';
import spotifyApiGetTracksAudioFeaturesResponse from './fixtures/tracks/spotify_api_get_tracks_audio_features_response.json';

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
			it('should return spotify catalog information for a single album', async (): Promise<void> => {
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

		describe('.getNewReleases', (): void => {
			it.skip('should return a list of new album releases featured in Spotify', async (): Promise<void> => {
				const { data, error } = await sdk.albums.getNewReleases('SE', {
					limit: 5,
					offset: 2,
				});

				expect(error).toBe(undefined);
				expect(data).toBeDefined();
				expect(data).toMatchObject(spotifyApiGetNewsReleasesResponse);
			});
		});

		describe('.getSeveralAlbums', (): void => {
			it('should return spotify catalog information for multiple albums', async (): Promise<void> => {
				const { data, error } = await sdk.albums.getSeveralAlbums([
					'382ObEPsp2rxGrnsizN5TX',
					'1A2GTWGtFfWp7KSQTwWOyo',
				]);

				expect(error).toBe(undefined);
				expect(data).toBeDefined();
				expect(data).toMatchObject(spotifyApiGetSeveralAlbumsResponse);
			});
		});
	});

	describe('.artists', (): void => {
		describe('.getArtist', (): void => {
			it('should return spotify catalog information for a single artist', async (): Promise<void> => {
				const { data, error } = await sdk.artists.getArtist(
					'0TnOYISbd1XYRBk9myaseg',
				);

				expect(error).toBe(undefined);
				expect(data).toBeDefined();
				expect(data).toMatchObject(spotifyApiGetArtistResponse);
			});
		});

		describe('.getArtistAlbums', (): void => {
			it("should return spotify catalog information about an artist's albums", async (): Promise<void> => {
				const { data, error } = await sdk.artists.getArtistAlbums(
					'0TnOYISbd1XYRBk9myaseg',
				);

				expect(error).toBe(undefined);
				expect(data).toBeDefined();
				expect(data).toMatchObject(spotifyApiGetArtistAlbumsResponse);
			});
		});

		describe('.getArtistTopTracks', (): void => {
			it('should return spotify catalog information about an artist top tracks', async (): Promise<void> => {
				const { data, error } = await sdk.artists.getArtistTopTracks(
					'0TnOYISbd1XYRBk9myaseg',
				);

				expect(error).toBe(undefined);
				expect(data).toBeDefined();
				expect(data).toMatchObject(spotifyApiGetArtistTopTracksResponse);
			});
		});

		describe('.getSeveralArtists', (): void => {
			it('should return spotify catalog information for several artists', async (): Promise<void> => {
				const { data, error } = await sdk.artists.getSeveralArtists([
					'0TnOYISbd1XYRBk9myaseg',
					'57dN52uHvrHOxijzpIgu3E',
				]);

				expect(error).toBe(undefined);
				expect(data).toBeDefined();
				expect(data).toMatchObject(spotifyApiGetSeveralArtistsResponse);
			});
		});
	});

	describe('.tracks', (): void => {
		describe('.getSeveralTracks', (): void => {
			it('should return spotify catalog information for several tracks', async (): Promise<void> => {
				const { data, error } = await sdk.tracks.getSeveralTracks([
					'7ouMYWpwJ422jRcDASZB7P',
					'4VqPOruhp5EdPBeR92t6lQ',
					'2takcwOaAZWiXQijPHIx7B',
				]);

				expect(error).toBe(undefined);
				expect(data).toBeDefined();
				expect(data).toMatchObject(spotifyApiGetSeveralTracksResponse);
			});
		});

		describe('.getTrack', (): void => {
			it('should return spotify catalog information for a single track', async (): Promise<void> => {
				const { data, error } = await sdk.tracks.getTrack(
					'7ouMYWpwJ422jRcDASZB7P',
				);

				expect(error).toBe(undefined);
				expect(data).toBeDefined();
				expect(data).toMatchObject(spotifyApiGetTrackResponse);
			});
		});

		describe('.getTrackAudioFeatures', (): void => {
			it('should return audio feature information for a single track', async (): Promise<void> => {
				const { data, error } = await sdk.tracks.getTrackAudioFeatures(
					'7ouMYWpwJ422jRcDASZB7P',
				);

				expect(error).toBe(undefined);
				expect(data).toBeDefined();
				expect(data).toMatchObject(spotifyApiGetTrackAudioFeatures);
			});
		});

		describe('.getTracksAudioFeatures', (): void => {
			it('should return audio features information for multiple tracks', async (): Promise<void> => {
				const { data, error } = await sdk.tracks.getTracksAudioFeatures([
					'7ouMYWpwJ422jRcDASZB7P',
					'4VqPOruhp5EdPBeR92t6lQ',
				]);

				expect(error).toBe(undefined);
				expect(data).toBeDefined();
				expect(data).toMatchObject(spotifyApiGetTracksAudioFeaturesResponse);
			});
		});
	});
});
