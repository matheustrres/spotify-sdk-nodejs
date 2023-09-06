import { type MockProxy, mock } from 'jest-mock-extended';

import { type IHttpClient } from '../lib/http-client';
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
// fixtures/playlists
// ------------------
import spotifyApiGetFeaturedPlaylistsResponse from './fixtures/playlists/spotify_api_get_featured_playlists_response.json';
import spotifyApiGetPlaylistResponse from './fixtures/playlists/spotify_api_get_playlist_response.json';
import spotifyApiClientCredentialsResponse from './fixtures/spotify_api_client_credentials_response.json';
// ------------------
// fixtures/tracks
// ------------------
import spotifyApiGetSeveralTracksResponse from './fixtures/tracks/spotify_api_get_several_tracks_response.json';
import spotifyApiGetTrackAudioAnalysisResponse from './fixtures/tracks/spotify_api_get_track_audio_analysis_response.json';
import spotifyApiGetTrackAudioFeatures from './fixtures/tracks/spotify_api_get_track_audio_features_response.json';
import spotifyApiGetTrackResponse from './fixtures/tracks/spotify_api_get_track_response.json';
import spotifyApiGetTracksAudioFeaturesResponse from './fixtures/tracks/spotify_api_get_tracks_audio_features_response.json';

describe('SpotifySDK', (): void => {
	let httpClient: MockProxy<IHttpClient>;
	let sdk: SpotifySDK;

	beforeAll((): void => {
		httpClient = mock();

		httpClient.POST.mockResolvedValue(spotifyApiClientCredentialsResponse);

		httpClient.GET.mockResolvedValueOnce(spotifyApiGetAlbumResponse)
			.mockResolvedValueOnce(spotifyApiGetAlbumTracksResponse)
			.mockResolvedValueOnce(spotifyApiGetNewsReleasesResponse)
			.mockResolvedValueOnce(spotifyApiGetSeveralAlbumsResponse)
			.mockResolvedValueOnce(spotifyApiGetArtistResponse)
			.mockResolvedValueOnce(spotifyApiGetArtistAlbumsResponse)
			.mockResolvedValueOnce(spotifyApiGetArtistTopTracksResponse)
			.mockResolvedValueOnce(spotifyApiGetSeveralArtistsResponse)
			.mockResolvedValueOnce(spotifyApiGetPlaylistResponse)
			.mockResolvedValueOnce(spotifyApiGetFeaturedPlaylistsResponse)
			.mockResolvedValueOnce(spotifyApiGetSeveralTracksResponse)
			.mockResolvedValueOnce(spotifyApiGetTrackResponse)
			.mockResolvedValueOnce(spotifyApiGetTrackAudioFeatures)
			.mockResolvedValueOnce(spotifyApiGetTracksAudioFeaturesResponse)
			.mockResolvedValueOnce(spotifyApiGetTrackAudioAnalysisResponse);
	});

	beforeEach((): void => {
		sdk = new SpotifySDK(
			{
				clientId: process.env.SPOTIFY_CLIENT_ID as string,
				clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
			},
			httpClient,
		);
	});

	it('should be defined', (): void => {
		expect(sdk).toBeDefined();
		expect(sdk.albums).toBeDefined();
		expect(sdk.artists).toBeDefined();
		expect(sdk.playlists).toBeDefined();
		expect(sdk.tracks).toBeDefined();
	});

	describe('.albums', (): void => {
		describe('.getAlbum', (): void => {
			it('should return spotify catalog information for a single album', async (): Promise<void> => {
				const result = await sdk.albums.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');

				expect(result.error).toBe(undefined);
				expect(result.timestamp).toBeDefined();
				expect(result.data).toMatchObject(spotifyApiGetAlbumResponse);
			});
		});

		describe('.getAlbumTracks', (): void => {
			it("should return spotify catalog information about an album's tracks", async (): Promise<void> => {
				const result = await sdk.albums.getAlbumTracks(
					'4aawyAB9vmqN3uQ7FjRGTy',
				);

				expect(result.error).toBe(undefined);
				expect(result.timestamp).toBeDefined();
				expect(result.data).toMatchObject(spotifyApiGetAlbumTracksResponse);
			});
		});

		describe('.getNewReleases', (): void => {
			it('should return a list of new album releases featured in Spotify', async (): Promise<void> => {
				const result = await sdk.albums.getNewReleases('SE', {
					limit: 5,
					offset: 2,
				});

				expect(result.error).toBe(undefined);
				expect(result.timestamp).toBeDefined();
				expect(result.data).toMatchObject(spotifyApiGetNewsReleasesResponse);
			});
		});

		describe('.getSeveralAlbums', (): void => {
			it('should return spotify catalog information for multiple albums', async (): Promise<void> => {
				const result = await sdk.albums.getSeveralAlbums([
					'382ObEPsp2rxGrnsizN5TX',
					'1A2GTWGtFfWp7KSQTwWOyo',
				]);

				expect(result.error).toBe(undefined);
				expect(result.timestamp).toBeDefined();
				expect(result.data).toMatchObject(spotifyApiGetSeveralAlbumsResponse);
			});
		});
	});

	describe('.artists', (): void => {
		describe('.getArtist', (): void => {
			it('should return spotify catalog information for a single artist', async (): Promise<void> => {
				const result = await sdk.artists.getArtist('0TnOYISbd1XYRBk9myaseg');

				expect(result.error).toBe(undefined);
				expect(result.timestamp).toBeDefined();
				expect(result.data).toMatchObject(spotifyApiGetArtistResponse);
			});
		});

		describe('.getArtistAlbums', (): void => {
			it("should return spotify catalog information about an artist's albums", async (): Promise<void> => {
				const result = await sdk.artists.getArtistAlbums(
					'0TnOYISbd1XYRBk9myaseg',
				);

				expect(result.error).toBe(undefined);
				expect(result.timestamp).toBeDefined();
				expect(result.data).toMatchObject(spotifyApiGetArtistAlbumsResponse);
			});
		});

		describe('.getArtistTopTracks', (): void => {
			it('should return spotify catalog information about an artist top tracks', async (): Promise<void> => {
				const result = await sdk.artists.getArtistTopTracks(
					'0TnOYISbd1XYRBk9myaseg',
				);

				expect(result.error).toBe(undefined);
				expect(result.timestamp).toBeDefined();
				expect(result.data).toMatchObject(spotifyApiGetArtistTopTracksResponse);
			});
		});

		describe('.getSeveralArtists', (): void => {
			it('should return spotify catalog information for several artists', async (): Promise<void> => {
				const result = await sdk.artists.getSeveralArtists([
					'0TnOYISbd1XYRBk9myaseg',
					'57dN52uHvrHOxijzpIgu3E',
				]);

				expect(result.error).toBe(undefined);
				expect(result.timestamp).toBeDefined();
				expect(result.data).toMatchObject(spotifyApiGetSeveralArtistsResponse);
			});
		});
	});

	describe('.playlists', (): void => {
		describe('.getPlaylist', (): void => {
			it('should return a playlist', async (): Promise<void> => {
				const result = await sdk.playlists.getPlaylist(
					'3cEYpjA9oz9GiPac4AsH4n',
				);

				expect(result.error).toBe(undefined);
				expect(result.timestamp).toBeDefined();
				expect(result.data).toMatchObject(spotifyApiGetPlaylistResponse);
			});
		});

		describe('.getFeaturedPlaylists', (): void => {
			it('should return a list of Spotify featured playlists', async (): Promise<void> => {
				const result = await sdk.playlists.getFeaturedPlaylists(
					'BR',
					'pt_BR',
					undefined,
					{
						limit: 3,
					},
				);

				expect(result.error).toBe(undefined);
				expect(result.timestamp).toBeDefined();
				expect(result.data).toMatchObject(
					spotifyApiGetFeaturedPlaylistsResponse,
				);
			});
		});
	});

	describe('.tracks', (): void => {
		describe('.getSeveralTracks', (): void => {
			it('should return spotify catalog information for several tracks', async (): Promise<void> => {
				const result = await sdk.tracks.getSeveralTracks([
					'7ouMYWpwJ422jRcDASZB7P',
					'4VqPOruhp5EdPBeR92t6lQ',
					'2takcwOaAZWiXQijPHIx7B',
				]);

				expect(result.error).toBe(undefined);
				expect(result.timestamp).toBeDefined();
				expect(result.data).toMatchObject(spotifyApiGetSeveralTracksResponse);
			});
		});

		describe('.getTrack', (): void => {
			it('should return spotify catalog information for a single track', async (): Promise<void> => {
				const result = await sdk.tracks.getTrack('7ouMYWpwJ422jRcDASZB7P');

				expect(result.error).toBe(undefined);
				expect(result.timestamp).toBeDefined();
				expect(result.data).toMatchObject(spotifyApiGetTrackResponse);
			});
		});

		describe('.getTrackAudioFeatures', (): void => {
			it('should return audio feature information for a single track', async (): Promise<void> => {
				const result = await sdk.tracks.getTrackAudioFeatures(
					'7ouMYWpwJ422jRcDASZB7P',
				);

				expect(result.error).toBe(undefined);
				expect(result.timestamp).toBeDefined();
				expect(result.data).toMatchObject(spotifyApiGetTrackAudioFeatures);
			});
		});

		describe('.getTracksAudioFeatures', (): void => {
			it('should return audio features information for multiple tracks', async (): Promise<void> => {
				const result = await sdk.tracks.getTracksAudioFeatures([
					'7ouMYWpwJ422jRcDASZB7P',
					'4VqPOruhp5EdPBeR92t6lQ',
				]);

				expect(result.error).toBe(undefined);
				expect(result.timestamp).toBeDefined();
				expect(result.data).toMatchObject(
					spotifyApiGetTracksAudioFeaturesResponse,
				);
			});
		});

		describe('.getTrackAudioAnalysis', (): void => {
			it('should return a low-level audio analysis for a track', async (): Promise<void> => {
				const result = await sdk.tracks.getTrackAudioAnalysis(
					'7ouMYWpwJ422jRcDASZB7P',
				);

				expect(result.error).toBe(undefined);
				expect(result.timestamp).toBeDefined();
				expect(result.data).toMatchObject(
					spotifyApiGetTrackAudioAnalysisResponse,
				);
			});
		});
	});
});
