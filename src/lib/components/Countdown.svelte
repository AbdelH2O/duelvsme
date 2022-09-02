<script lang="ts">
    export let start_date: string;
    export let duration: number;

    // make a countdown timer that counts down from the start date for the duration

    let timer: ReturnType<typeof setInterval>;
    let time_left: number;

    function update_timer() {
        const now = new Date();
        const start = new Date(start_date);
        const end = new Date(start_date);
        end.setSeconds(end.getSeconds() + duration);

        if (now < start) {
            time_left = start.getTime() - now.getTime();
        } else if (now < end) {
            time_left = end.getTime() - now.getTime();
        } else {
            time_left = 0;
        }
    }

    $: update_timer();
    $: timer = setInterval(update_timer, 1000);

</script>

<div class="countdown">
    {Math.floor(time_left / 1000 / 60) % 60}:{Math.floor(time_left / 1000) % 60 < 10 ? "0" : ""}{Math.floor(time_left / 1000) % 60}
</div>