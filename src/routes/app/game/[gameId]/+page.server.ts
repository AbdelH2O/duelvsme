import { error, redirect, type LoadEvent } from "@sveltejs/kit";
import supabase from "$lib/utils/supabase";
import client from "$lib/utils/redisClient";
import { addSeconds, parseISO, subMinutes, addMinutes, formatISO } from 'date-fns';

export const load = async ({ params, parent }: LoadEvent) =>  {
    const { lucia } = await parent(); 
    if (!params.gameId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(params.gameId)) {
        throw error(400, "Invalid gameId");
    }
    try {
        await client.connect();
    } catch(err) {
        const h = 1;
    }
    supabase.auth.setAuth(lucia.access_token);
    const game = (await supabase.from("match").select("*").filter('id', 'eq', params.gameId)) as {
        data: Game[],
    };
    if (game.data?.length === 0) {
        throw error(404, "Game not found");
    }
    const dif = new Date().getTimezoneOffset();
    // console.log(new Date().getTime());
    
    const now = dif > 0 ? subMinutes(new Date(), dif) : addMinutes(new Date(), dif);
    // console.log(formatISO(new Date().getTime()), formatISO(now.getTime()));
    // console.log(now.getTime()/1000 >= addSeconds(parseISO(game.data[0].start_time), 2700).getTime()/1000);
    
    if (addSeconds(parseISO(game.data[0].start_time), game.data[0].duration).getTime() <= now.getTime() || game.data[0].scores.some((score) => score >= 800)) {
        await client.hDel('match', lucia.user.username);
        throw redirect(302, "/app/dashboard");
    }
    const statements = await supabase
        .from('problems')
        .select('*')
        .filter('id', 'in', `(${game.data[0].problems})`);
        
    // const statements: string[] = [
    //     await client.hGet('problems', game.data[0].problems[0]) || "",
    //     await client.hGet('problems', game.data[0].problems[1]) || "",
    //     await client.hGet('problems', game.data[0].problems[2]) || "",
    //     await client.hGet('problems', game.data[0].problems[3]) || "",
    //     await client.hGet('problems', game.data[0].problems[4]) || "",
    // ];
    return {
        game: game.data,
        statements: statements.data?.map((s) => s.statement) || [],
    };
}