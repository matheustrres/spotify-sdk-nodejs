import {
	type SpotifySeveralArtists,
	type Result,
	type SpotifyArtist,
	type SpotifyApiPaginationOptions,
	type SpotifyArtistAlbums,
	type SpotifyArtistTopTracks,
} from '../typings';
import { generateQParams } from '../utils/gen-q-params';
import { type SpotifyTokenManager } from '../utils/token-manager';
import { Resource } from './resource';

type GroupsToInclude = 'album' | 'single' | 'appears_on' | 'compilation';

export interface ISpotifyArtistsResource {
	getArtist(artistId: string): Promise<Result<SpotifyArtist>>;
	getArtistAlbums(
		artistId: string,
		market?: string,
		includeGroups?: Array<GroupsToInclude>,
		pagOptions?: SpotifyApiPaginationOptions,
	): Promise<Result<SpotifyArtistAlbums>>;
	getArtistTopTracks(
		artistId: string,
		market?: string,
	): Promise<Result<SpotifyArtistTopTracks>>;
	getSeveralArtists(
		artistsIds: string[],
	): Promise<Result<SpotifySeveralArtists>>;
}

/**
 * Represents the Spotify Artists resource manager
 *
 * @extends {Resource}
 * @implements {ISpotifyArtistsResource}
 */
export class SpotifyArtistsResource
	extends Resource
	implements ISpotifyArtistsResource
{
	public constructor(spotifyTokenManager: SpotifyTokenManager) {
		super(spotifyTokenManager);
	}

	/**
	 * Get Spotify catalog information for a single artist
	 *
	 * @param {String} artistId - The Spotify ID of the artist
	 * @returns {Promise<Result<SpotifyArtist>>}
	 */
	public async getArtist(artistId: string): Promise<Result<SpotifyArtist>> {
		const response = await this.makeRequest<SpotifyArtist>(
			`artists/${artistId}`,
		);

		return response.error ? response : { data: response };
	}

	/**
	 * Get Spotify catalog information about an artist's albums
	 *
	 * @param {String} artistId - The Spotify ID of the artist
	 * @param {String} [market] - An ISO-3166-1 alpha-2 country code (e.g. `US`, `BR`)
	 * @param {Array<GroupsToInclude>} [includeGroups] - An array of keywords to filter the response
	 * @param {SpotifyApiPaginationOptions} [pagOptions] - The pagination options for the request
	 * @param {Number} [pagOptions.limit] - The maximum number of items to return (default is 20, min is 1, max is 50)
	 * @param {Number} [pagOptions.offset] - The index of the first item to return (default is 0)
	 * @returns {Promise<Result<SpotifyArtistAlbums>>}
	 */
	public async getArtistAlbums(
		artistId: string,
		market: string = 'US',
		includeGroups?: Array<GroupsToInclude>,
		pagOptions?: SpotifyApiPaginationOptions,
	): Promise<Result<SpotifyArtistAlbums>> {
		const endpoint: string = `artists/${artistId}/albums?market=${market}`;

		const qParam: string = generateQParams<
			SpotifyApiPaginationOptions & {
				include_groups: Array<GroupsToInclude>;
			}
		>({
			include_groups: includeGroups?.join(','),
			limit: pagOptions?.limit,
			offset: pagOptions?.offset,
		});

		const response = await this.makeRequest<SpotifyArtistAlbums>(
			`${endpoint}&${qParam}`,
		);

		return response.error ? response : { data: response };
	}

	/**
	 * Get Spotify catalog information about an artist's top tracks by country
	 *
	 * @param {String} artistId - The Spotify ID of the artist
	 * @param {String} [market] - An ISO 3166-1 alpha-2 country code
	 * @returns {Promise<Result<SpotifyArtistTopTracks>>}
	 */
	public async getArtistTopTracks(
		artistId: string,
		market: string = 'US',
	): Promise<Result<SpotifyArtistTopTracks>> {
		const response = await this.makeRequest<SpotifyArtistTopTracks>(
			`artists/${artistId}/top-tracks?market=${market}`,
		);

		return response.error ? response : { data: response };
	}

	/**
	 * Get Spotify catalog information for several artists
	 *
	 * @param {Array<String>} artistsIds - A comma-separated list of the Spotify IDs for the artists
	 * @returns {Promise<Result<SpotifySeveralArtists>>}
	 */
	public async getSeveralArtists(
		artistsIds: string[],
	): Promise<Result<SpotifySeveralArtists>> {
		const response = await this.makeRequest<SpotifySeveralArtists>(
			`artists?ids=${artistsIds.slice(0, 49).join(',')}`,
		);

		return response.error ? response : { data: response };
	}
}
