<script lang="ts">
    import { intervalToDuration, parseISO, addSeconds, subMinutes, addMinutes } from 'date-fns';
    import { diff as diffStore } from '$lib/stores/game';
    
    export let start_date: string;
    export let duration: number;
    export const ssr = false;

    // make a countdown timer that counts down from the start date for the duration

    let timer: ReturnType<typeof setInterval>;
    let diff: Duration = {
        minutes: 0,
        seconds: 0,
    };

    function update_timer() {
        const dif = new Date().getTimezoneOffset();
        const now = dif > 0 ? subMinutes(new Date(), dif) : addMinutes(new Date(), dif);
        const end = addSeconds(parseISO(start_date), duration);
        diff = intervalToDuration({ start: now, end });
        diffStore.set(diff);
    }

    $: update_timer();
    $: timer = setInterval(update_timer, 1000);

</script>

<div class="countdown">
    {diff.minutes}:{diff.seconds < 10 ? "0" : ""}{diff.seconds}
</div>