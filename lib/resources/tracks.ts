import {
	type SpotifyTrack,
	type Response,
	type SpotifySeveralTracks,
	type SpotifyTrackAudioFeatures,
	type SpotifyTrackAudioAnalysis,
	type SpotifyTracksAudioFeatures,
} from '../typings';
import { type TokenManager } from '../utils/token-manager';
import { Resource } from './resource';

export interface ISpotifyTracksResource {
	getSeveralTracks(
		tracksIds: string[],
		market?: string,
	): Promise<Response<any>>;
	getTrack(trackId: string, market?: string): Promise<Response<SpotifyTrack>>;
	getTrackAudioFeatures(
		trackId: string,
	): Promise<Response<SpotifyTrackAudioFeatures>>;
	getTracksAudioFeatures(
		tracksIds: string[],
	): Promise<Response<SpotifyTracksAudioFeatures>>;
	getTrackAudioAnalysis(
		trackId: string,
	): Promise<Response<SpotifyTrackAudioAnalysis>>;
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
	public constructor(tokenManager: TokenManager) {
		super(tokenManager);
	}

	/**
	 * Get Spotify catalog information for multiple tracks
	 *
	 * @param {Array<String>} tracksIds - A comma-separated list of the Spotify IDs for the tracks
	 * @param {String} [market] - An ISO-3166-1 alpha-2 country code (e.g. `US`, `BR`)
	 * @returns {Promise<Response<SpotifySeveralTracks>>}
	 */
	public async getSeveralTracks(
		tracksIds: string[],
		market: string = 'US',
	): Promise<Response<SpotifySeveralTracks>> {
		return this.makeRequest(
			`tracks?ids=${tracksIds.join(',')}&market=${market}`,
		);
	}

	/**
	 * Get Spotify catalog information for a single track
	 *
	 * @param {String} trackId - The Spotify ID for the track
	 * @param {String} [market] - An ISO-3166-1 alpha-2 country code (e.g. `US`, `BR`)
	 * @returns {Promise<Response<SpotifyTrack>>}
	 */
	public async getTrack(
		trackId: string,
		market: string = 'US',
	): Promise<Response<SpotifyTrack>> {
		return this.makeRequest<SpotifyTrack>(`tracks/${trackId}?market=${market}`);
	}

	/**
	 * Get audio feature information for a single track
	 *
	 * @param {String} trackId - The Spotify ID for the track
	 * @returns {Promise<Response<SpotifyTrackAudioFeatures>>}
	 */
	public async getTrackAudioFeatures(
		trackId: string,
	): Promise<Response<SpotifyTrackAudioFeatures>> {
		return this.makeRequest<SpotifyTrackAudioFeatures>(
			`audio-features/${trackId}`,
		);
	}

	public async getTracksAudioFeatures(
		tracksIds: string[],
	): Promise<Response<SpotifyTracksAudioFeatures>> {
		return this.makeRequest<SpotifyTracksAudioFeatures>(
			`audio-features?ids=${tracksIds.slice(0, 99).join(',')}`,
		);
	}

	/**
	 * Get a low-level audio analysis for a track in the Spotify catalog
	 *
	 * @param {String} trackId - The Spotify ID for the track
	 * @returns {Promise<Response<SpotifyTrackAudioAnalysis>>}
	 */
	public async getTrackAudioAnalysis(
		trackId: string,
	): Promise<Response<SpotifyTrackAudioAnalysis>> {
		return this.makeRequest<SpotifyTrackAudioAnalysis>(
			`audio-analysis/${trackId}`,
		);
	}
}
