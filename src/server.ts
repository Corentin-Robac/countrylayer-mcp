import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { CountryLayerClient } from "./api-client.js";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.COUNTRYLAYER_API_KEY;

if (!API_KEY) {
    console.warn("WARNING: COUNTRYLAYER_API_KEY is not set in environment variables.");
}

const client = new CountryLayerClient(API_KEY || "");
const server = new McpServer({
    name: "countrylayer-mcp",
    version: "1.0.0",
});

// Helper to format country output (optional, but raw JSON is usually fine for LLMs)
// We will return the raw data.

server.tool(
    "get_all_countries",
    "Get a list of all countries",
    {},
    async () => {
        const countries = await client.getAllCountries();
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(countries, null, 2),
                },
            ],
        };
    }
);

server.tool(
    "get_country_by_name",
    "Search for a country by name",
    {
        name: z.string().describe("The name of the country"),
        fullText: z.boolean().optional().describe("Set to true for exact match"),
    },
    async ({ name, fullText }) => {
        const countries = await client.getCountryByName(name, fullText);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(countries, null, 2),
                },
            ],
        };
    }
);

server.tool(
    "get_country_by_capital",
    "Search for a country by capital city",
    {
        capital: z.string().describe("The capital city"),
    },
    async ({ capital }) => {
        const countries = await client.getCountryByCapital(capital);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(countries, null, 2),
                },
            ],
        };
    }
);

server.tool(
    "get_country_by_currency",
    "Search for a country by currency code",
    {
        currency: z.string().describe("The currency code (e.g., USD, EUR)"),
    },
    async ({ currency }) => {
        const countries = await client.getCountryByCurrency(currency);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(countries, null, 2),
                },
            ],
        };
    }
);

server.tool(
    "get_country_by_region",
    "Search for countries by region",
    {
        region: z.string().describe("The region (e.g., Europe, Asia)"),
    },
    async ({ region }) => {
        const countries = await client.getCountryByRegion(region);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(countries, null, 2),
                },
            ],
        };
    }
);

server.tool(
    "get_country_by_bloc",
    "Search for countries by regional bloc",
    {
        bloc: z.string().describe("The regional bloc acronym (e.g., EU, ASEAN)"),
    },
    async ({ bloc }) => {
        const countries = await client.getCountryByBloc(bloc);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(countries, null, 2),
                },
            ],
        };
    }
);

server.tool(
    "get_country_by_calling_code",
    "Search for a country by calling code",
    {
        code: z.string().describe("The calling code (e.g., 1, 33)"),
    },
    async ({ code }) => {
        const countries = await client.getCountryByCallingCode(code);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(countries, null, 2),
                },
            ],
        };
    }
);

server.tool(
    "get_country_by_alpha",
    "Search for a country by Alpha-2 or Alpha-3 code",
    {
        code: z.string().describe("The 2 or 3 letter country code (e.g., US, USA, FR)"),
    },
    async ({ code }) => {
        const countries = await client.getCountryByAlpha(code);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(countries, null, 2),
                },
            ],
        };
    }
);

export { server };
