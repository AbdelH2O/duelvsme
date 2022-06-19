export type User = {
    id: string;
    name: string;
    email: string;
    avatar: string;
    jwt: string;
    refreshToken: string;
    isAuthenticated: boolean;
}