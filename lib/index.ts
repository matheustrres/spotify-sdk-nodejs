import { version } from '../package.json';
import { SpotifySDK } from './spotify-sdk';
import type {
	Result,
	SpotifyAlbum,
	SpotifyAlbumArtist,
	SpotifyAlbumBase,
	SpotifyAlbumReleases,
	SpotifyAlbumTracks,
	SpotifyArtist,
	SpotifyArtistAlbums,
	SpotifyArtistTopTracks,
	SpotifyCopyright,
	SpotifyExternalIDs,
	SpotifyExternalURLs,
	SpotifyImage,
	SpotifyResultWithItems,
	SpotifySeveralAlbums,
	SpotifySeveralArtists,
	SpotifySeveralTracks,
	SpotifyTrack,
	SpotifyTrackAudioAnalysis,
	SpotifyTrackAudioAnalysisBar,
	SpotifyTrackAudioAnalysisMeta,
	SpotifyTrackAudioAnalysisSection,
	SpotifyTrackAudioAnalysisSegment,
	SpotifyTrackAudioAnalysisTrack,
	SpotifyTrackAudioFeatures,
	SpotifyTrackBase,
	SpotifyTracksAudioFeatures,
} from './typings';

const VERSION: string = version;

export {
	// ------------------
	// typings
	// ------------------
	Result,
	SpotifyAlbum,
	SpotifyAlbumArtist,
	SpotifyAlbumBase,
	SpotifyAlbumReleases,
	SpotifyAlbumTracks,
	SpotifyArtist,
	SpotifyArtistAlbums,
	SpotifyArtistTopTracks,
	SpotifyCopyright,
	SpotifyExternalIDs,
	SpotifyExternalURLs,
	SpotifyImage,
	SpotifyResultWithItems,
	SpotifySeveralAlbums,
	SpotifySeveralArtists,
	SpotifySeveralTracks,
	SpotifyTrack,
	SpotifyTrackAudioAnalysis,
	SpotifyTrackAudioAnalysisBar,
	SpotifyTrackAudioAnalysisMeta,
	SpotifyTrackAudioAnalysisSection,
	SpotifyTrackAudioAnalysisSegment,
	SpotifyTrackAudioAnalysisTrack,
	SpotifyTrackAudioFeatures,
	SpotifyTrackBase,
	SpotifyTracksAudioFeatures,
	// ------------------
	// Spotify SDK
	// ------------------
	SpotifySDK,
	// ------------------
	// Package-related
	// ------------------
	VERSION,
};
