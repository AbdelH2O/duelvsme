import { auth } from "$lib/lucia";
import type { RequestHandler } from "@sveltejs/kit";
import type { Error } from "lucia-sveltekit";

export const POST: RequestHandler = async ({ request }) => {
    const body = await request.json();
    const { username, password } = body;
    try {
        const authenticateUser = await auth.authenticateUser(
            "username",
            username,
            password
        );
        return {
            headers: {
                "set-cookie": authenticateUser.cookies, // set cookeis
            },
        };
    } catch (e) {
        const error = e as Error;
        if (error.message === "AUTH_INVALID_IDENTIFIER_TOKEN" || error.message === "AUTH_INVALID_PASSWORD") {
            return {
                status: 400,
                body: JSON.stringify({
                    error: "Invalid username or password.",
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