import {writable} from 'svelte/store';
import type {User} from '../utils/User';

export const user = writable({
    id: '',
    name: '',
    email: '',
    avatar: '',
    jwt: '',
    refreshToken: '',
    isAuthenticated: false,
} as User);