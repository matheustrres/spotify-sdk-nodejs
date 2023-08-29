import { type Response } from '../typings';

export type RequestOptions = {
	headers: HeadersInit;
	mode?: RequestMode;
	body?: BodyInit | undefined;
};

export type GETRequestOptions = Omit<RequestOptions, 'body'>;

/**
 * @func makeGET
 * @desc Make a X GET request to the specified URL
 * @param {String} url - The desired URL
 * @param {GETRequestOptions} options - The request options to use
 * @param {HeadersInit} options.headers - The headers to use for the request
 * @param {RequestMode} [options.mode] - The request mode of the request
 * @returns {Promise<Response<T>>}
 */
export const makeGET = async <T>(
	url: string,
	options: GETRequestOptions,
): Promise<Response<T>> => {
	return await fetch(new URL(url), {
		method: 'GET',
		...options,
	}).then((r) => r.json() as Promise<Response<T>>);
};

/**
 * @func makePOST
 * @desc Make a X POST request to the specified URL
 * @param {String} url - The desired URL
 * @param {RequestOptions} options - The request options to use
 * @param {HeadersInit} options.headers - The headers to use for the request
 * @param {RequestMode} [options.mode] - The request mode of the request
 * @param {BodyInit} [options.body] - The body of the request
 * @returns {Promise<Response<T>>}
 */
export const makePOST = async <T>(
	url: string,
	options: RequestOptions,
): Promise<Response<T>> => {
	return await fetch(new URL(url), {
		method: 'POST',
		...options,
	}).then((r) => r.json() as Promise<Response<T>>);
};
