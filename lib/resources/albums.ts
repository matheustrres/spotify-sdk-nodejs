import { type IHttpClient } from '../http-client';
import {
	type SpotifyAlbumReleases,
	type SpotifyAlbum,
	type SpotifyApiPaginationOptions,
	type SpotifySeveralAlbums,
	type SpotifyAlbumTracks,
	type Result,
} from '../typings';
import { generateQParams } from '../utils/gen-q-params';
import { type SpotifyTokenManager } from '../utils/token-manager';
import { Resource } from './resource';

export interface ISpotifyAlbumsResource {
	getAlbum(albumId: string): Promise<Result<SpotifyAlbum>>;
	getAlbumTracks(
		albumId: string,
		market?: string,
		pagOptions?: SpotifyApiPaginationOptions,
	): Promise<Result<SpotifyAlbumTracks>>;
	getNewReleases(
		country?: string,
		pagOptions?: SpotifyApiPaginationOptions,
	): Promise<Result<SpotifyAlbumReleases>>;
	getSeveralAlbums(
		albumsIds: string[],
		market?: string,
	): Promise<Result<SpotifySeveralAlbums>>;
}

/**
 * Represents the Spotify Albums resource manager
 *
 * @extends {Resource}
 * @implements {ISpotifyAlbumsResource}
 */
export class SpotifyAlbumsResource
	extends Resource
	implements ISpotifyAlbumsResource
{
	public constructor(
		spotifyTokenManager: SpotifyTokenManager,
		httpClient: IHttpClient,
	) {
		super(spotifyTokenManager, httpClient);
	}

	/**
	 * Get Spotify catalog information for a single album
	 *
	 * @param {String} albumId - The Spotify ID of the album
	 * @returns {Promise<Result<SpotifyAlbum>>}
	 */
	public async getAlbum(albumId: string): Promise<Result<SpotifyAlbum>> {
		const spotifyApiResponse = await this.makeRequest<SpotifyAlbum>(
			`albums/${albumId}`,
		);

		return this.reply(spotifyApiResponse);
	}

	/**
	 * Get Spotify catalog information about an album’s tracks
	 *
	 * @param {String} albumId - The Spotify ID of the album
	 * @param {String} [market] - An ISO-3166-1 alpha-2 country code (e.g. `US`, `BR`)
	 * @param {SpotifyApiPaginationOptions} [pagOptions] - The pagination options for the request
	 * @param {Number} [pagOptions.limit] - The maximum number of items to return (default is 20, min is 1, max is 50)
	 * @param {Number} [pagOptions.offset] - The index of the first item to return (default is 0)
	 * @returns {Promise<Result<SpotifyAlbumTracks>>}
	 */
	public async getAlbumTracks(
		albumId: string,
		market: string = 'US',
		pagOptions?: SpotifyApiPaginationOptions,
	): Promise<Result<SpotifyAlbumTracks>> {
		const endpoint: string = `albums/${albumId}/tracks`;
		const qParams: string = generateQParams<AlbumTracksQParams>({
			market,
			...pagOptions,
		});

		const spotifyApiResponse = await this.makeRequest<SpotifyAlbumTracks>(
			`${endpoint}?${qParams}`,
		);

		return this.reply(spotifyApiResponse);
	}

	/**
	 * Get a list of new album releases featured in Spotify
	 *
	 * @param {String} [country] - An ISO-3166-1 alpha-2 country code (e.g. `US`, `BR`)
	 * @param {SpotifyApiPaginationOptions} [pagOptions] - The pagination options for the request
	 * @param {Number} [pagOptions.limit] - The maximum number of items to return (default is 20, min is 1, max is 50)
	 * @param {Number} [pagOptions.offset] - The index of the first item to return (default is 0)
	 * @returns {Promise<Response<SpotifyAlbumReleases>>}
	 */
	public async getNewReleases(
		country: string = 'US',
		pagOptions?: SpotifyApiPaginationOptions,
	): Promise<Result<SpotifyAlbumReleases>> {
		const endpoint: string = `browse/new-releases`;
		const qParams: string = generateQParams<NewReleasesQParams>({
			country,
			...pagOptions,
		});

		const spotifyApiResponse = await this.makeRequest<SpotifyAlbumReleases>(
			`${endpoint}?${qParams}`,
		);

		return this.reply(spotifyApiResponse);
	}

	/**
	 * Get Spotify catalog information for multiple albums
	 *
	 * @param {Array<string>} albumsIds - A comma-separated list of Spotify IDs for the albums
	 * @param {String} [market] - An ISO-3166-1 alpha-2 country code (e.g. `US`, `BR`)
	 * @returns {Promise<Response<SpotifySeveralAlbums>>}
	 */
	public async getSeveralAlbums(
		albumsIds: string[],
		market: string = 'US',
	): Promise<Result<SpotifySeveralAlbums>> {
		const endpoint: string = 'albums';
		const qParams: string = generateQParams<SeveralAlbumsQParams>({
			market,
			ids: albumsIds.slice(0, 19).join(','),
		});

		const spotifyApiResponse = await this.makeRequest<SpotifySeveralAlbums>(
			`${endpoint}?${qParams}`,
		);

		return this.reply(spotifyApiResponse);
	}
}

type AlbumTracksQParams = SpotifyApiPaginationOptions & {
	market?: string;
};

type NewReleasesQParams = SpotifyApiPaginationOptions & {
	country?: string;
};

type SeveralAlbumsQParams = {
	ids: string;
	market?: string;
};
