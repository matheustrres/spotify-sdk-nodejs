export type SpotifyResultWithItems<Item> = {
	href: string;
	items: Item[];
	limit: number;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
};

export type SpotifyExternalURLs = {
	spotify: string;
};

export type SpotifyExternalIDs = {
	upc: string;
};

export type SpotifyCopyright = {
	text: string;
	type: string;
};

export type SpotifyImage = {
	height: number;
	url: string;
	width: number;
};

// --------------------- ALBUMS ---------------------

export type SpotifyAlbumBase = {
	album_type: string;
	artists: Array<SpotifyAlbumArtist>;
	external_urls: SpotifyExternalURLs;
	href: string;
	id: string;
	images: Array<SpotifyImage>;
	name: string;
	release_date: string;
	release_date_precision: string;
	total_tracks: number;
	type: string;
	uri: string;
};

export type SpotifyAlbumReleases = {
	albums: SpotifyResultWithItems<
		SpotifyAlbumBase & {
			available_markets: Array<string>;
		}
	>;
};

export type SpotifyAlbum = SpotifyAlbumBase & {
	available_markets: Array<string>;
	copyrights: Array<SpotifyCopyright>;
	external_ids: SpotifyExternalIDs;
	genres: Array<string>;
	label: string;
	popularity: number;
	tracks: SpotifyAlbumTracks;
};

export type SpotifyArtistAlbums = SpotifyResultWithItems<
	SpotifyAlbumBase & {
		album_group: string;
		is_playable: boolean;
	}
>;

export type SpotifyAlbumTracks = SpotifyResultWithItems<SpotifyTrackBase>;

export type SpotifyAlbumArtist = Omit<
	SpotifyArtist,
	'followers' | 'genres' | 'images' | 'popularity'
>; // = external_urls,href,id,name,type,uri

// --------------------- ARTISTS ---------------------

export type SpotifyArtist = {
	external_urls: SpotifyExternalURLs;
	followers: {
		href: string;
		total: number;
	};
	genres: Array<string>;
	href: string;
	id: string;
	images: Array<SpotifyImage>;
	name: string;
	popularity: number;
	type: string;
	uri: string;
};

export type SpotifySeveralAlbums = {
	albums: Array<
		SpotifyAlbum & {
			external_ids: SpotifyExternalIDs;
			is_playable: boolean;
		}
	>;
};

export type SpotifySeveralArtists = {
	artists: Array<SpotifyArtist>;
};

export type SpotifyArtistTopTracks = {
	tracks: Array<
		Omit<SpotifyTrack, 'available_markets'> & {
			is_playable: boolean;
		}
	>;
};

// --------------------- TRACKS ---------------------

export type SpotifyTrackBase = {
	artists: Array<SpotifyAlbumArtist>;
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_urls: SpotifyExternalURLs;
	href: string;
	id: string;
	is_local: boolean;
	name: string;
	preview_url: string | null;
	track_number: number;
	type: string;
	uri: string;
};

export type SpotifyTrack = SpotifyTrackBase & {
	album: SpotifyAlbumBase & {
		is_playable: boolean;
	};
	available_markets: string[];
	external_ids: SpotifyExternalIDs;
	is_playable: boolean;
	linked_from: {
		external_urls: SpotifyExternalURLs;
		href: string;
		id: string;
		type: string;
		uri: string;
	};
	popularity: number;
};

export type SpotifySeveralTracks = {
	tracks: Array<Omit<SpotifyTrack, 'available_markets'>>;
};

export type SpotifyTrackAudioFeatures = {
	acousticness: number;
	analysis_url: string;
	danceability: number;
	duration_ms: number;
	energy: number;
	id: string;
	instrumentalness: number;
	key: number;
	liveness: number;
	loudness: number;
	mode: number;
	speechiness: number;
	tempo: number;
	time_signature: number;
	track_href: string;
	type: string;
	uri: string;
	valence: number;
};

export type SpotifyTracksAudioFeatures = {
	audio_features: Array<SpotifyTrackAudioFeatures>;
};

export type SpotifyTrackAudioAnalysis = {
	meta: SpotifyTrackAudioAnalysisMeta;
	track: SpotifyTrackAudioAnalysisTrack;
	bars: SpotifyTrackAudioAnalysisBar[];
	beats: SpotifyTrackAudioAnalysisBar[];
	sections: SpotifyTrackAudioAnalysisSection[];
	segments: SpotifyTrackAudioAnalysisSegment[];
	tatums: SpotifyTrackAudioAnalysisBar[];
};

export type SpotifyTrackAudioAnalysisMeta = {
	analyzer_version: string;
	platform: string;
	detailed_status: string;
	status_code: number;
	timestamp: number;
	analysis_time: number;
	input_process: string;
};

export type SpotifyTrackAudioAnalysisTrack = {
	num_samples: number;
	duration: number;
	sample_md5: string;
	offset_seconds: number;
	window_seconds: number;
	analysis_sample_rate: number;
	analysis_channels: number;
	end_of_fade_in: number;
	start_of_fade_out: number;
	loudness: number;
	tempo: number;
	tempo_confidence: number;
	time_signature: number;
	time_signature_confidence: number;
	key: number;
	key_confidence: number;
	mode: number;
	mode_confidence: number;
	codestring: string;
	code_version: number;
	echoprintstring: string;
	echoprint_version: number;
	synchstring: string;
	synch_version: number;
	rhythmstring: string;
	rhythm_version: number;
};

export type SpotifyTrackAudioAnalysisBar = {
	start: number;
	duration: number;
	confidence: number;
};

export type SpotifyTrackAudioAnalysisSection = {
	start: number;
	duration: number;
	confidence: number;
	loudness: number;
	tempo: number;
	tempo_confidence: number;
	key: number;
	key_confidence: number;
	mode: number;
	mode_confidence: number;
	time_signature: number;
	time_signature_confidence: number;
};

export type SpotifyTrackAudioAnalysisSegment = {
	start: number;
	duration: number;
	confidence: number;
	loudness_start: number;
	loudness_max_time: number;
	loudness_max: number;
	loudness_end: number;
	pitches: null[];
	timbre: null[];
};

// --------------------- API ---------------------

export type SpotifyApiPaginationOptions = {
	limit?: number;
	offset?: number;
};

export type SpotifyApiClientCredentials = {
	access_token: string;
	expires_in: number;
	token_type: string;
};

export type CommonError = {
	status: number;
	message: string;
};

export type Result<T> =
	| {
			timestamp: string;
			error: CommonError;
			data?: never;
	  }
	| {
			timestamp: string;
			error?: never;
			data: T;
	  };
