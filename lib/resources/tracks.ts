import { type IHttpClient } from '../http-client';
import {
	type SpotifyTrack,
	type Result,
	type SpotifySeveralTracks,
	type SpotifyTrackAudioFeatures,
	type SpotifyTrackAudioAnalysis,
	type SpotifyTracksAudioFeatures,
} from '../typings';
import { generateQParams } from '../utils/gen-q-params';
import { type SpotifyTokenManager } from '../utils/token-manager';
import { Resource } from './resource';

export interface ISpotifyTracksResource {
	getSeveralTracks(
		tracksIds: string[],
		market?: string,
	): Promise<Result<SpotifySeveralTracks>>;
	getTrack(trackId: string, market?: string): Promise<Result<SpotifyTrack>>;
	getTrackAudioFeatures(
		trackId: string,
	): Promise<Result<SpotifyTrackAudioFeatures>>;
	getTracksAudioFeatures(
		tracksIds: string[],
	): Promise<Result<SpotifyTracksAudioFeatures>>;
	getTrackAudioAnalysis(
		trackId: string,
	): Promise<Result<SpotifyTrackAudioAnalysis>>;
}

/**
 * Represents the Spotify Tracks resource manager
 *
 * @extends {Resource}
 * @implements {ISpotifyTracksResource}
 */
export class SpotifyTracksResource
	extends Resource
	implements ISpotifyTracksResource
{
	public constructor(
		spotifyTokenManager: SpotifyTokenManager,
		httpClient: IHttpClient,
	) {
		super(spotifyTokenManager, httpClient);
	}

	/**
	 * Get Spotify catalog information for multiple tracks
	 *
	 * @param {Array<String>} tracksIds - A comma-separated list of the Spotify IDs for the tracks
	 * @param {String} [market] - An ISO-3166-1 alpha-2 country code (e.g. `US`, `BR`)
	 * @returns {Promise<Result<SpotifySeveralTracks>>}
	 */
	public async getSeveralTracks(
		tracksIds: string[],
		market: string = 'US',
	): Promise<Result<SpotifySeveralTracks>> {
		const endpoint: string = 'tracks';
		const qParams: string = generateQParams<SeveralTracksQParams>({
			market,
			ids: tracksIds.join(','),
		});

		const spotifyApiResponse = await this.makeRequest<SpotifySeveralTracks>(
			`${endpoint}?${qParams}`,
		);

		return this.reply(spotifyApiResponse);
	}

	/**
	 * Get Spotify catalog information for a single track
	 *
	 * @param {String} trackId - The Spotify ID for the track
	 * @param {String} [market] - An ISO-3166-1 alpha-2 country code (e.g. `US`, `BR`)
	 * @returns {Promise<Result<SpotifyTrack>>}
	 */
	public async getTrack(
		trackId: string,
		market: string = 'US',
	): Promise<Result<SpotifyTrack>> {
		const spotifyApiResponse = await this.makeRequest<SpotifyTrack>(
			`tracks/${trackId}?market=${market}`,
		);

		return this.reply(spotifyApiResponse);
	}

	/**
	 * Get audio feature information for a single track
	 *
	 * @param {String} trackId - The Spotify ID for the track
	 * @returns {Promise<Result<SpotifyTrackAudioFeatures>>}
	 */
	public async getTrackAudioFeatures(
		trackId: string,
	): Promise<Result<SpotifyTrackAudioFeatures>> {
		const spotifyApiResponse =
			await this.makeRequest<SpotifyTrackAudioFeatures>(
				`audio-features/${trackId}`,
			);

		return this.reply(spotifyApiResponse);
	}

	/**
	 * Get audio features for multiple tracks
	 *
	 * @param {Array<String>} tracksIds - A comma-separated list of the Spotify IDs for the tracks
	 * @returns {Promise<Result<SpotifyTracksAudioFeatures>>}
	 */
	public async getTracksAudioFeatures(
		tracksIds: string[],
	): Promise<Result<SpotifyTracksAudioFeatures>> {
		const spotifyApiResponse =
			await this.makeRequest<SpotifyTracksAudioFeatures>(
				`audio-features?ids=${tracksIds.slice(0, 99).join(',')}`,
			);

		return this.reply(spotifyApiResponse);
	}

	/**
	 * Get a low-level audio analysis for a track in the Spotify catalog
	 *
	 * @param {String} trackId - The Spotify ID for the track
	 * @returns {Promise<Result<SpotifyTrackAudioAnalysis>>}
	 */
	public async getTrackAudioAnalysis(
		trackId: string,
	): Promise<Result<SpotifyTrackAudioAnalysis>> {
		const spotifyApiResponse =
			await this.makeRequest<SpotifyTrackAudioAnalysis>(
				`audio-analysis/${trackId}`,
			);

		return this.reply(spotifyApiResponse);
	}
}

type SeveralTracksQParams = {
	ids: string;
	market?: string;
};
