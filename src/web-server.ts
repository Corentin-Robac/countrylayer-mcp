import express from "express";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { server } from "./server.js";

const app = express();

// Global transport variable for single-client scenario
// Note: For multi-client support, use a Map<sessionId, SSEServerTransport>
let transport: SSEServerTransport | null = null;

app.get("/sse", async (req, res) => {
    console.log("New SSE connection");
    transport = new SSEServerTransport("/messages", res);
    // Note: server.connect() calls transport.start() automatically
    // Do NOT call transport.start() manually or it will throw an error
    await server.connect(transport);
});

app.post("/messages", async (req, res) => {
    console.log("Received message");
    if (transport) {
        await transport.handlePostMessage(req, res);
    } else {
        res.status(404).send("Session not found");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
