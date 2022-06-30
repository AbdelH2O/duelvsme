<script lang="ts">
  import { user } from "../../lib/stores/auth";
  import { onMount } from "svelte/internal";
  import type { User } from '../../lib/utils/User';
  let usr: User;
  onMount(async () => {
    user.subscribe(u => {
      usr = u;
    });
    console.log(usr);
  });
</script>

<div class="h-full max-w-[108rem] pt-12">
    <div>
      <h1 class="text-white text-size-15">
        Welcome, {usr ? usr.nickname : ''}
      </h1>
    </div>
    <div class="h-[15rem] flex justify-between mx-auto">
      <div class="w-20 bg-white">
        
      </div>
      <div class="w-20 bg-white">
        
      </div>
      <div class="w-20 bg-white">
        
      </div>
    </div>
</div>
