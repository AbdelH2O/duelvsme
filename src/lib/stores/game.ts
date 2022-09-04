import { writable, type Writable } from "svelte/store";

export const diff: Writable<Duration> = writable({
    minutes: 0,
    seconds: 0,
});

const game: Writable<Game> = writable();

export default game;
