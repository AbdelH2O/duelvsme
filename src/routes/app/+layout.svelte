<script lang="ts">
    import supabase from '$lib/utils/supabase'
    import { getSession } from '@abdelh2o/lucia-sveltekit/client';

    const session = getSession();

    setInterval(() => {
        supabase.auth.setAuth($session?.access_token);
    }, 1000);
</script>
<slot></slot>