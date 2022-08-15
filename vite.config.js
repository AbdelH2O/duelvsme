import { sveltekit } from '@sveltejs/kit/vite';
import { Server } from "socket.io";

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [
        sveltekit(),
        {
            name: "multiplayer",
            configureServer(server) {
                const io = new Server(server.httpServer);
                console.log(io);
                // do websocket stuff
            }
        },
    ],
};

export default config;