import { error, type LoadEvent } from "@sveltejs/kit";
import supabase from "$lib/utils/supabase";
import client from "$lib/utils/redisClient";

export const load = async ({ params, parent }: LoadEvent) =>  {
    const { lucia } = await parent(); 
    if (!params.gameId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(params.gameId)) {
        throw error(400, "Invalid gameId");
    }
    supabase.auth.setAuth(lucia.access_token);
    const game = (await supabase.from("match").select("*").filter('id', 'eq', params.gameId)) as {
        data: Game[],
    };
    if (game.data?.length === 0) {
        throw error(404, "Game not found");
    }
    const statements: string[] = [
        await client.hGet('problems', game.data[0].problems[0]) || "",
        await client.hGet('problems', game.data[0].problems[1]) || "",
        await client.hGet('problems', game.data[0].problems[2]) || "",
        await client.hGet('problems', game.data[0].problems[3]) || "",
        await client.hGet('problems', game.data[0].problems[4]) || "",
    ]
    return {
        game: game.data,
        statements: statements,
    };
}