import { auth } from "$lib/lucia";
import type { RequestHandler } from "@sveltejs/kit";
import type { Error } from "lucia-sveltekit";

export const POST: RequestHandler = async ({ request }) => {
    const body = await request.json();
    const { email, username, password } = body;
    if (!email || !password || !username) {
        return {
            status: 400,
            body: {
                error: "Email, username and password are required.",
            },
        };
    }
    try {
        const createUser = await auth.createUser("username", username, {
            password,
            user_data: {
                email,
                username,
                rating: 1500,
            },
        });
        return {
            headers: {
                "set-cookie": createUser.cookies, // set cookeis
            },
        };
    } catch (e) {
        const error = e as Error;
        if (error.message === "AUTH_DUPLICATE_IDENTIFIER_TOKEN" || error.message === "AUTH_DUPLICATE_USER_DATA") {
            return {
                status: 400,
                body: JSON.stringify({
                    error: "Email or username already used.",
                }),
            };
        }
        return {
            status: 500,
            body: JSON.stringify({
                error: "An server error occured. Please try again later.",
            }),
        };
    }
};