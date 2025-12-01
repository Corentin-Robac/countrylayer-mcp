import axios, { AxiosInstance, AxiosError } from 'axios';

export interface Country {
    name: string;
    topLevelDomain: string[];
    alpha2Code: string;
    alpha3Code: string;
    callingCodes: string[];
    capital: string;
    altSpellings: string[];
    region: string;
    subregion: string;
    population: number;
    latlng: number[];
    demonym: string;
    area: number;
    gini: number;
    timezones: string[];
    borders: string[];
    nativeName: string;
    numericCode: string;
    currencies: string[];
    languages: string[];
    translations: Record<string, string>;
    flag: string;
    regionalBlocs: Array<{ acronym: string; name: string; otherAcronyms: string[]; otherNames: string[] }>;
    cioc: string;
}

export class CountryLayerClient {
    private client: AxiosInstance;
    private accessKey: string;

    constructor(accessKey: string) {
        this.accessKey = accessKey;
        this.client = axios.create({
            baseURL: 'https://api.countrylayer.com/v2',
        });
    }

    private async request<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
        try {
            const response = await this.client.get<T>(endpoint, {
                params: {
                    access_key: this.accessKey,
                    ...params,
                },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response) {
                    // CountryLayer returns 200 even for some errors sometimes, but if it's a real HTTP error:
                    throw new Error(`API Error: ${axiosError.response.status} - ${JSON.stringify(axiosError.response.data)}`);
                }
                throw new Error(`Network Error: ${axiosError.message}`);
            }
            throw error;
        }
    }

    async getAllCountries(): Promise<Country[]> {
        return this.request<Country[]>('/all');
    }

    async getCountryByName(name: string, fullText: boolean = false): Promise<Country[]> {
        return this.request<Country[]>(`/name/${encodeURIComponent(name)}`, { fullText: fullText });
    }

    async getCountryByCapital(capital: string): Promise<Country[]> {
        return this.request<Country[]>(`/capital/${encodeURIComponent(capital)}`);
    }

    async getCountryByCurrency(currency: string): Promise<Country[]> {
        return this.request<Country[]>(`/currency/${encodeURIComponent(currency)}`);
    }

    async getCountryByRegion(region: string): Promise<Country[]> {
        return this.request<Country[]>(`/region/${encodeURIComponent(region)}`);
    }

    async getCountryByBloc(bloc: string): Promise<Country[]> {
        return this.request<Country[]>(`/regionalbloc/${encodeURIComponent(bloc)}`);
    }

    async getCountryByCallingCode(code: string): Promise<Country[]> {
        return this.request<Country[]>(`/callingcode/${encodeURIComponent(code)}`);
    }

    async getCountryByAlpha(code: string): Promise<Country | Country[]> {
        // Alpha endpoint might return a single object or array depending on input, 
        // but usually it searches by code.
        // Documentation says /alpha/{code}. If multiple codes separated by semicolon, returns array.
        // We will assume array for consistency in return type, or handle single object.
        // Let's type it as Country[] and let the caller handle it or normalize it.
        // Actually, let's normalize it here.
        const result = await this.request<Country | Country[]>(`/alpha/${encodeURIComponent(code)}`);
        return Array.isArray(result) ? result : [result];
    }
}
