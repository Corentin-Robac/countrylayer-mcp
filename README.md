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

### Deployment (Docker/Render/Railway)

This server is designed to be deployed as a Docker container.

#### Deploy on Render

1.  Create a new **Web Service** on Render.
2.  Connect your GitHub repository.
3.  Render will automatically detect the `Dockerfile`.
4.  Add the Environment Variable: `COUNTRYLAYER_API_KEY`.
5.  Deploy.

#### Deploy on Railway

1.  New Project -> Deploy from GitHub.
2.  Select the repository.
3.  Add the Variable `COUNTRYLAYER_API_KEY`.
4.  Railway will build using the Dockerfile.

**Note**: Vercel Serverless Functions are **not recommended** for this MCP server because they do not support the long-lived concurrent connections required for the SSE transport.

## MCP Tools

- `get_all_countries`
- `get_country_by_name` (args: `name`, `fullText`)
- `get_country_by_capital` (args: `capital`)
- `get_country_by_currency` (args: `currency`)
- `get_country_by_region` (args: `region`)
- `get_country_by_bloc` (args: `bloc`)
- `get_country_by_calling_code` (args: `code`)
- `get_country_by_alpha` (args: `code`)
