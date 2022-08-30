import { writable } from "svelte/store";
import { browser } from "$app/env";

const key: string = browser ? localStorage.getItem('supabase_key') || "" : "";
export const supabase_key = writable<string>(key);
supabase_key.subscribe(key => {
    if (browser) {
        localStorage.setItem('supabase_key', key);
    }
});