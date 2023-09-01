import { type SpotifyApiResponse } from './typings';

export type RequestOptions = {
	headers: HeadersInit;
	mode?: RequestMode;
};

export type PostRequestOptions = RequestOptions & {
	body?: BodyInit | undefined;
};

export interface IHttpClient {
	GET<T>(url: string, options: RequestOptions): Promise<SpotifyApiResponse<T>>;
	POST<T>(
		url: string,
		options: PostRequestOptions,
	): Promise<SpotifyApiResponse<T>>;
}

export class HttpClient implements IHttpClient {
	public async GET<T>(
		url: string,
		options: RequestOptions,
	): Promise<SpotifyApiResponse<T>> {
		return await fetch(new URL(url), {
			method: 'GET',
			...options,
		}).then((r) => r.json() as Promise<SpotifyApiResponse<T>>);
	}

	public async POST<T>(
		url: string,
		options: PostRequestOptions,
	): Promise<SpotifyApiResponse<T>> {
		return await fetch(new URL(url), {
			method: 'POST',
			...options,
		}).then((r) => r.json() as Promise<SpotifyApiResponse<T>>);
	}
}
