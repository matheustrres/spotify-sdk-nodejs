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
		available_markets: string;
	};
	available_markets: string[];
	external_ids: SpotifyExternalIDs;
	popularity: number;
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
