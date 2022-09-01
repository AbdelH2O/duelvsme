import { writable, type Writable } from "svelte/store";

const game: Writable<Game> = writable();

export default game;