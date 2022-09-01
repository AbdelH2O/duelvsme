import { auth } from "$lib/lucia";
import { error, json, type RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = async ({ request }) => {
    try {
        const user = await auth.validateRequestByCookie(request);
        // choose a random number between 1 and 2
        const num = Math.floor(Math.random() * 2);
        const categories = ['trivia', 'math', 'date', 'year'];
        const fact = num === 0 ?
        await (await fetch(`https://uselessfacts.jsph.pl/random.json?language=en`)).json() :
        {
            text: await (await fetch(`http://numbersapi.com/random/${categories[Math.floor(Math.random() * categories.length)]}`)).text()
        };
        return json({
            text: fact.text,
        });
    } catch(e) {
        console.log(e);
        throw error(500, "Internal server error.");
    }
}