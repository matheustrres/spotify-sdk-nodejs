import {
	type SpotifySeveralArtists,
	type Response,
	type SpotifyArtist,
	type SpotifyApiPaginationOptions,
	type SpotifyArtistAlbums,
} from '../typings';
import { generateQParams } from '../utils/gen-q-params';
import { type TokenManager } from '../utils/token-manager';
import { Resource } from './resource';

type GroupsToInclude = 'album' | 'single' | 'appears_on' | 'compilation';

export interface ISpotifyArtistsResource {
	getArtist(artistId: string): Promise<Response<SpotifyArtist>>;
	getArtistAlbums(
		artistId: string,
		market?: string,
		includeGroups?: Array<GroupsToInclude>,
		pagOptions?: SpotifyApiPaginationOptions,
	): Promise<Response<SpotifyArtistAlbums>>;
	getSeveralArtists(
		artistsIds: string[],
	): Promise<Response<SpotifySeveralArtists>>;
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
	public constructor(tokenManager: TokenManager) {
		super(tokenManager);
	}

	/**
	 * Get Spotify catalog information for a single artist
	 *
	 * @param {String} artistId - The Spotify ID of the artist
	 * @returns {Promise<Response<SpotifyArtist>>}
	 */
	public async getArtist(artistId: string): Promise<Response<SpotifyArtist>> {
		return this.makeRequest<SpotifyArtist>(`artists/${artistId}`);
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
	 * @returns {Promise<Response<SpotifyArtistAlbums>>}
	 */
	public async getArtistAlbums(
		artistId: string,
		market: string = 'US',
		includeGroups?: Array<GroupsToInclude>,
		pagOptions?: SpotifyApiPaginationOptions,
	): Promise<Response<SpotifyArtistAlbums>> {
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

		return this.makeRequest<SpotifyArtistAlbums>(`${endpoint}&${qParam}`);
	}

	/**
	 * Get Spotify catalog information for several artists
	 *
	 * @param {Array<String>} artistsIds - A comma-separated list of the Spotify IDs for the artists
	 */
	public async getSeveralArtists(
		artistsIds: string[],
	): Promise<Response<SpotifySeveralArtists>> {
		return this.makeRequest<SpotifySeveralArtists>(
			`artists?ids=${artistsIds.slice(0, 49).join(',')}`,
		);
	}
}
