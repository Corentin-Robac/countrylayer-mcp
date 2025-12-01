# CountryLayer MCP Server

A Model Context Protocol (MCP) server for the [CountryLayer API](https://countrylayer.com/).

## Features

- **Get All Countries**: Retrieve a list of all countries.
- **Search by Name**: Find countries by full or partial name.
- **Search by Capital**: Find countries by capital city.
- **Search by Currency**: Find countries by currency code.
- **Search by Region**: Find countries by region (e.g., Europe, Asia).
- **Search by Regional Bloc**: Find countries by bloc (e.g., EU, ASEAN).
- **Search by Calling Code**: Find countries by calling code.
- **Search by Alpha Code**: Find countries by ISO 3166-1 alpha-2 or alpha-3 code.

## Setup

### Prerequisites

- Node.js (v16 or higher)
- A CountryLayer API Key (Get one at [countrylayer.com](https://countrylayer.com/))

### Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root directory and add your API key:
    ```env
    COUNTRYLAYER_API_KEY=your_api_key_here
    ```

### Local Usage

To run the server locally with the MCP Inspector or an MCP client:

```bash
npm run dev
```

Or build and run:

```bash
npm run build
npm start
```

### Vercel Deployment

1.  Install Vercel CLI: `npm i -g vercel`
2.  Login: `vercel login`
3.  Deploy: `vercel`
4.  Set the environment variable in Vercel:
    - `COUNTRYLAYER_API_KEY`

**Note on Vercel & SSE**: This server uses Server-Sent Events (SSE) for MCP communication. Vercel Serverless Functions have execution timeouts (default 10s, up to 60s on Pro). Long-lived connections may be interrupted. For production use with persistent connections, consider a platform that supports long-running processes (e.g., Render, Fly.io, or a VPS).

## MCP Tools

- `get_all_countries`
- `get_country_by_name` (args: `name`, `fullText`)
- `get_country_by_capital` (args: `capital`)
- `get_country_by_currency` (args: `currency`)
- `get_country_by_region` (args: `region`)
- `get_country_by_bloc` (args: `bloc`)
- `get_country_by_calling_code` (args: `code`)
- `get_country_by_alpha` (args: `code`)
