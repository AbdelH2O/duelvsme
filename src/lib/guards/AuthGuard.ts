import type { RequestHandler, RequestEvent, RequestHandlerOutput } from "@sveltejs/kit";

const withHandlers = (...handlers: RequestHandler[]) => {
    return async (request: RequestEvent): Promise<RequestHandlerOutput> => {
        for (const handle of handlers) {
            // console.log(request.locals);
            const result = await handle(request);
            console.log(result);
            if (result.status !== 600) {
                return result;
            }
        }
        return {
            status: 500,
            body: "Server error"
        }
    }
}

const authHook = async ({ request, locals }: RequestEvent): Promise<RequestHandlerOutput> => { 
    // const body = await request.json();
    // console.log(body);
    if (!locals.lucia || !locals.lucia.user) {
        return {
            status: 401,
            body: {
                message: 'unauthorized'
            }
        };
    }
    return {
        status: 600,
    }
};

export const withAuth = (endpoint: RequestHandler): RequestHandler  => {
    return withHandlers(authHook, endpoint);
};