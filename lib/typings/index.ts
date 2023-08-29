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
	url: string;
	height: number;
	width: number;
};

export type SpotifyAlbum = {
	id: string;
	album_type: string;
	name: string;
	popularity: number;
	label: string;
	release_date: string;
	release_date_precision: string;
	total_tracks: number;
	type: string;
	uri: string;
	href: string;
	artists: Array<SpotifyAlbumArtist>;
	available_markets: Array<string>;
	copyrights: Array<SpotifyCopyright>;
	images: Array<SpotifyImage>;
	genres: Array<string>;
	external_ids: SpotifyExternalIDs;
	external_urls: SpotifyExternalURLs;
	tracks: SpotifyTrack;
};

export type SpotifyTrack = {
	href: string;
	items: Array<SpotifyTrackItem>;
	limit: number;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
};

export type SpotifyTrackItem = {
	id: string;
	name: string;
	href: string;
	type: string;
	uri: string;
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_urls: SpotifyExternalURLs;
	artists: Array<SpotifyAlbumArtist>;
	available_markets?: Array<string>;
	is_playable?: boolean;
	is_local: boolean;
	preview_url: string;
	track_number: number;
};

export type SpotifyAlbumArtist = {
	id: string;
	name: string;
	href: string;
	external_urls: SpotifyExternalURLs;
	type: string;
	uri: string;
};

export type SpotifySeveralAlbums = {
	albums: Array<
		Omit<SpotifyAlbum, 'available_markets'> & {
			external_ids: SpotifyExternalIDs;
			is_playable: boolean;
		}
	>;
};

// --------------------- API ---------------------

export type SpotifyApiPaginationOptions = {
	limit?: number;
	offset?: number;
};

export type SpotifyApiClientCredentials = {
	token_type: string;
	access_token: string;
	expires_in: number;
};

export type Response<T = any> =
	| {
			error: {
				status: number;
				message: string;
			};
	  }
	| ({
			error?: never;
	  } & T);
