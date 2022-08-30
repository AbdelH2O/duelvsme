import { writable, type Writable } from "svelte/store";
import type monaco from "monaco-editor";

const lang: Writable<string> = writable('54');
export const editor: Writable<monaco.editor.IStandaloneCodeEditor> = writable();

export default lang;