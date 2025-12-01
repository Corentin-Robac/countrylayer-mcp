import express from "express";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { server } from "./server.js";

const app = express();

app.get("/sse", async (req, res) => {
    const transport = new SSEServerTransport("/messages", res);
    await server.connect(transport);
    await transport.start();
});

app.post("/messages", async (req, res) => {
    // Note: This still has the issue of routing the message to the correct transport!
    // In a single-process Express server (like in Docker), we can manage this?
    // NO. The `SSEServerTransport` creates a NEW transport for each /sse connection.
    // The POST request needs to know WHICH transport to send the message to.
    // The SDK's `SSEServerTransport` handles this via `sessionId`?
    // Let's check the SDK source or docs (mental check).
    // The `SSEServerTransport` does NOT automatically register itself in a global registry.
    // WE need to manage the mapping of SessionID -> Transport.

    // Actually, the `SSEServerTransport` constructor takes a `path` argument ("/messages").
    // It expects the client to post to that path.
    // But how do we route it?

    // The standard way to use `SSEServerTransport` with Express is:
    // 1. Create a global map of transports.
    // 2. On /sse, create transport, add to map (keyed by generated sessionId?).
    //    Wait, the client needs to know the sessionId.
    //    The `SSEServerTransport` sends the `endpoint` in the initial SSE message?
    //    Yes, it sends `endpoint: ...?sessionId=...` usually.

    // Let's look at a reference implementation or the SDK logic.
    // The `SSEServerTransport` in the SDK is basic.

    // Let's implement a simple mechanism:
    // We will assume ONE client for now, OR we use the `sessionId` query param if the SDK supports it.
    //
    // Actually, the SDK's `SSEServerTransport` has a `handlePostMessage` method.
    // But we need the *instance*.

    // Correct implementation:
    // We need to store transports.

    // Let's try to handle it.

    // However, for a simple "one client" test, a global variable works in Docker (single process).
    // But for multiple clients, we need a map.

    // Let's implement a Map<string, SSEServerTransport>.
    // But how does the client know the ID?
    // The `SSEServerTransport` doesn't expose the ID easily in the constructor.

    // Let's look at how `SSEServerTransport` works.
    // It writes: `event: endpoint\ndata: /messages?sessionId=XYZ`
    // So the client will POST to `/messages?sessionId=XYZ`.

    // So in our POST handler, we read `req.query.sessionId`.

    // We need to subclass or inspect `SSEServerTransport` to get the ID, OR we generate the ID ourselves and pass it?
    // The SDK doesn't seem to allow passing the ID in the constructor easily (it generates it).
    //
    // WAIT. `SSEServerTransport` might not handle the session management for us.
    //
    // Let's check the `node_modules` if I could... but I can't.
    //
    // Let's assume the standard pattern:
    // We create a new transport. We need to capture the session ID.
    //
    // If I can't do that easily, I will stick to the "Single Client Global Variable" for the MVP.
    // It's a Docker container, likely one user.

    // I will implement the Global Variable approach for now, but with a comment.
    // Actually, if I use `express`, I can handle the request.

    // Let's write the code.

    // Also, I need to update `package.json` to include `express` and `@types/express`.
});

let transport: SSEServerTransport | null = null;

app.get("/sse", async (req, res) => {
    console.log("New SSE connection");
    transport = new SSEServerTransport("/messages", res);
    await server.connect(transport);
    await transport.start();
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
