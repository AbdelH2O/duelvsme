import lucia from "@abdelh2o/lucia-sveltekit";
import supabase from "@abdelh2o/adapter-supabase";
import { dev } from "$app/env";

const url: string = import.meta.env.VITE_SUPABASE_URL || "http://localhost:3000";
const secret: string = import.meta.env.VITE_SUPABASE_SECRET || "";

export const auth = lucia({
    adapter: supabase(url, secret),
    secret: import.meta.env.VITE_LUCIA_SECRET || "aWmJoT0gOdjh2-Zc2Zv3BTErb29qQNWEunlj",
    env: dev ? "DEV" : "PROD",
});
