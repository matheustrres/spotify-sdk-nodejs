import { type HttpClient } from '../http-client';
import {
	type SpotifyApiPaginationOptions,
	type Result,
	type SpotifyPlaylist,
	type SpotifyFeaturedPlaylists,
} from '../typings';
import { generateQParams } from '../utils/gen-q-params';
import { type SpotifyTokenManager } from '../utils/token-manager';
import { Resource } from './resource';

type PlaylistAdditionalTypes = 'track' | 'episode';

export interface ISpotifyPlaylistsResource {
	getFeaturedPlaylists(
		country?: string,
		locale?: string,
		timestamp?: string,
		pagOptions?: SpotifyApiPaginationOptions,
	): Promise<Result<SpotifyFeaturedPlaylists>>;
	getPlaylist(
		playlistId: string,
		market?: string,
		additionalTypes?: Array<PlaylistAdditionalTypes>,
	): Promise<Result<SpotifyPlaylist>>;
}

/**
 * Represents the Spotify Playlists resource manager
 *
 * @extends {Resource}
 * @implements {ISpotifyPlaylistsResource}
 */
export class SpotifyPlaylistsResource
	extends Resource
	implements ISpotifyPlaylistsResource
{
	public constructor(
		spotifyTokenManager: SpotifyTokenManager,
		httpClient: HttpClient,
	) {
		super(spotifyTokenManager, httpClient);
	}

	/**
	 * Get a list of Spotify featured playlists
	 *
	 * @param {String} [country] - An ISO-3166-1 alpha-2 country code (e.g. `US`, `BR`)
	 * @param {String} [locale] - The desired language (e.g. `en_US`, `es_MX`)
	 * @param {String} [timestamp] - A timestamp in ISO 8601 format (e.g. `2023-09-06T09:00:00`)
	 * @param {SpotifyApiPaginationOptions} [pagOptions] - The pagination options for the request
	 * @param {Number} [pagOptions.limit] - The maximum number of items to return (default is 20, min is 1, max is 50)
	 * @param {Number} [pagOptions.offset] - The index of the first item to return (default is 0)
	 * @returns
	 */
	public async getFeaturedPlaylists(
		country?: string,
		locale?: string,
		timestamp?: string,
		pagOptions?: SpotifyApiPaginationOptions,
	): Promise<Result<SpotifyFeaturedPlaylists>> {
		const endpoint: string = 'browse/featured-playlists';
		const qParams: string = generateQParams<FeaturePlaylistsQParams>({
			country,
			locale,
			timestamp,
			...pagOptions,
		});

		const spotifyApiResponse = await this.makeRequest<SpotifyFeaturedPlaylists>(
			`${endpoint}?${qParams}`,
		);

		return this.reply(spotifyApiResponse);
	}

	/**
	 * Get a playlist owned by a Spotify user
	 *
	 * @param {String} playlistId - The Spotify ID of the playlist
	 * @param {String} [market] - An ISO-3166-1 alpha-2 country code (e.g. `US`, `BR`)
	 * @param {Array<PlaylistAdditionalTypes>} [additionalTypes] - A list of item types to be added to the playlist
	 * @returns {Promise<>}
	 */
	public async getPlaylist(
		playlistId: string,
		market?: string,
		additionalTypes?: Array<PlaylistAdditionalTypes>,
	): Promise<Result<SpotifyPlaylist>> {
		const endpoint: string = `playlists/${playlistId}`;
		const qParams: string = generateQParams<PlaylistQParams>({
			market,
			additional_types: additionalTypes?.join(','),
		});

		const spotifyApiResponse = await this.makeRequest<SpotifyPlaylist>(
			`${endpoint}?${qParams}`,
		);

		return this.reply(spotifyApiResponse);
	}
}

type PlaylistQParams = {
	market?: string;
	additional_types?: string[];
};

type FeaturePlaylistsQParams = SpotifyApiPaginationOptions & {
	country?: string;
	locale?: string;
	timestamp?: string;
};
