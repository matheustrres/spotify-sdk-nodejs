import { generateQParams } from 'lib/utils/gen-q-params';

import {
	type SpotifyAlbumReleases,
	type Response,
	type SpotifyAlbum,
	type SpotifyApiPaginationOptions,
	type SpotifySeveralAlbums,
	type SpotifyAlbumTracks,
} from '../typings';
import { type TokenManager } from '../utils/token-manager';
import { Resource } from './resource';

export interface ISpotifyAlbumsResource {
	getAlbum(albumId: string): Promise<Response<SpotifyAlbum>>;
	getAlbumTracks(
		albumId: string,
		market?: string,
		pagOptions?: SpotifyApiPaginationOptions,
	): Promise<Response<SpotifyAlbumTracks>>;
	getNewReleases(
		country?: string,
		pagOptions?: SpotifyApiPaginationOptions,
	): Promise<Response<SpotifyAlbumReleases>>;
	getSeveralAlbums(
		albumsIds: string[],
		market?: string,
	): Promise<Response<SpotifySeveralAlbums>>;
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
	public constructor(tokenManager: TokenManager) {
		super(tokenManager);
	}

	/**
	 * Get Spotify catalog information for a single album
	 *
	 * @param {String} albumId - The Spotify ID of the album
	 * @returns {Promise<Response<SpotifyAlbum>>}
	 */
	public async getAlbum(albumId: string): Promise<Response<SpotifyAlbum>> {
		return this.makeRequest<SpotifyAlbum>(`albums/${albumId}`);
	}

	/**
	 * Get Spotify catalog information about an album’s tracks
	 *
	 * @param {String} albumId - The Spotify ID of the album
	 * @param {String} [market] - An ISO-3166-1 alpha-2 country code (e.g. `US`, `BR`)
	 * @param {SpotifyApiPaginationOptions} [pagOptions] - The pagination options for the request
	 * @param {Number} [pagOptions.limit] - The maximum number of items to return (default is 20, min is 1, max is 50)
	 * @param {Number} [pagOptions.offset] - The index of the first item to return (default is 0)
	 * @returns {Promise<Response<SpotifyAlbumTracks>>}
	 */
	public async getAlbumTracks(
		albumId: string,
		market: string = 'US',
		pagOptions?: SpotifyApiPaginationOptions,
	): Promise<Response<SpotifyAlbumTracks>> {
		let endpoint: string = `albums/${albumId}/tracks?market=${market}`;

		if (pagOptions)
			endpoint += `?${generateQParams<SpotifyApiPaginationOptions>(
				pagOptions,
			)}`;

		return this.makeRequest<SpotifyAlbumTracks>(endpoint);
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
	): Promise<Response<SpotifyAlbumReleases>> {
		let endpoint: string = `browse/new-releases?country=${country}`;

		if (pagOptions)
			endpoint += `?${generateQParams<SpotifyApiPaginationOptions>(
				pagOptions,
			)}`;

		return this.makeRequest<SpotifyAlbumReleases>(endpoint);
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
	): Promise<Response<SpotifySeveralAlbums>> {
		return this.makeRequest<SpotifySeveralAlbums>(
			`albums?ids=${albumsIds.slice(0, 19).join(',')}&market=${market}`,
		);
	}
}
