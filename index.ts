import { SpotifySDK } from './lib/spotify-sdk';
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
} from './lib/typings';
import { version } from './package.json';

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
