<script lang="ts">
    import supabase from '$lib/utils/supabase'
    import { getSession } from '@abdelh2o/lucia-sveltekit/client';
    import { browser } from '$app/environment';

    const session = getSession();

    session.subscribe((val) => {
        supabase.auth.setAuth(val?.access_token);
    });
</script>
<slot></slot>