import { writable, derived, type Writable } from "svelte/store";
import type { User } from "../utils/User";

export const isAuthenticated: Writable<boolean> = writable(false);
export const user: Writable<User> = writable({
  id: "",
  name: "",
  nickname: "",
  email: "",
  email_verified: false,
  sub: "",
  picture: "",
  updated_at: "",
});
export const popupOpen: Writable<boolean> = writable(false);
export const error: Writable<object> = writable();
