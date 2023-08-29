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
