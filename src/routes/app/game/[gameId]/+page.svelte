<script lang="ts">
    import type monaco from 'monaco-editor';
    import dvsme from '../../../../assets/duelvsme.svg';
    import { getSession } from '@abdelh2o/lucia-sveltekit/client';
    import Monaco from '$lib/components/monaco.svelte';
    import lang, { editor } from '$lib/stores/lang';
    import game, { diff } from '$lib/stores/game';
    import { Select, Button, Loader, Dialog } from '@abdelh2o/agnostic-svelte';
    import { onMount } from 'svelte';
    import { languageOptions } from '$lib/enums/languages';
    import { page } from '$app/stores';
    import supabase from '$lib/utils/supabase';
    import Draggable from '$lib/components/draggable.svelte';
    import { toast } from '@zerodevx/svelte-toast';
    import CountDown from '$lib/components/Countdown.svelte';
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';
    
    onMount(() => {
        let init = false;
        diff.subscribe((v) => {
            // console.log(v);
            if (v.minutes === 0 && v.seconds === 0 && init) {
                toast.push('Time is up!', {
                    theme: {
                        '--toastBackground': '#B12E2E',
                        '--toastBarBackground': '#7f1d1d',
                    }
                });
                if(browser){
                    goto('/app/dashboard');
                }
            } else {
                init = true;
            }
        });
        let script = document.createElement('script');
        script.src = "https://cdn-mathjax.codeforces.com/MathJax.js?config=TeX-AMS_HTML-full";
        document.head.append(script);   
        script.onload = () => {
            MathJax.Hub.Config({
                tex2jax: {inlineMath: [['$$$','$$$']], displayMath: [['$$$$$$','$$$$$$']]}
            });
        };
        
    });

    const createRow = (id: string, date: string, language: string, memory: string, runtime: string, status: string) => ({
        id,
        date,
        language,
        memory,
        runtime,
        status,
    });

    export let data: {
        game: Game[],
        statements: string[],
    };

    $: game.set(data.game[0]);

    const session = getSession();

    const myIndex = data.game[0].contestant_1 === $session.user.username ? 1 : 2;

    let dialogInstance: InstanceType<typeof Dialog>;
    const assignDialogInstance = (ev: CustomEvent<any>) => {
        dialogInstance = ev.detail.instance;
    };

    const openDialog = () => {
        if (dialogInstance) {
            dialogInstance.show();
        }
    };
    
    
    // let selectedValue: number;
    let selectedLang: string = "54", isOpen = false, message = "";
    const index: { [key: string]: number } = {
        A: 0,
        B: 1,
        C: 2,
        D: 3,
        E: 4,
    };
    const reverse: { [key: number]: string } = {
        0: 'A',
        1: 'B',
        2: 'C',
        3: 'D',
        4: 'E',
    }
    let currentTab: string;
    $: currentTab = reverse[data.game[0].who_solved.indexOf(0)]
    $: lang.set(selectedLang);
    supabase.auth.setAuth($session?.access_token || '');
    const subs = supabase.from('match').on('UPDATE', (newData: {new: Game}) => {
        console.log(newData);
        if (newData.new.scores.some((v) => v >= 800)) {
            toast.push('Game is over!', {
                theme: {
                    '--toastBackground': '#B12E2E',
                    '--toastBarBackground': '#7f1d1d',
                }
            });
            message = "Time is up!";
            subs.unsubscribe();
            setTimeout(() => {
                openDialog();
                setTimeout(() => {
                    goto('/app/dashboard');
                }, 3000);
            }, 1500);
            // goto('/app/dashboard');
        }
        data.game[0] = newData.new;
    }).subscribe();
    const submissionsSubs = supabase.from('submissions').on('*', (dt) => {
        console.log(dt);
        console.log(reverse[data.game[0].problems.indexOf(dt.new.problem)]);
        if (dt.eventType === 'INSERT') {
            toast.push("New attempt by " + dt.new.username + " on " + reverse[data.game[0].problems.indexOf(dt.new.problem)]);
            message = "New attempt by " + dt.new.username + " on " + reverse[data.game[0].problems.indexOf(dt.new.problem)];
        } else {
            if (dt.new.status === 'Accepted') {
                if (dt.new.username === $session.user.username) {
                    toast.push("You solved " + reverse[data.game[0].problems.indexOf(dt.new.problem)] + "!", {
                        theme: {
                            '--toastBackground': '#15803c',
                            '--toastBarBackground': '#0e5227',
                        }
                    });
                } else {
                    toast.push(dt.new.username + " solved " + reverse[data.game[0].problems.indexOf(dt.new.problem)] + "!", {
                        theme: {
                            '--toastBackground': '#B12E2E',
                            '--toastBarBackground': '#7f1d1d',
                        }
                    });
                }
            } else {
                if (dt.new.username === $session.user.username) {
                    toast.push("Submission by " + dt.new.username + " on " + reverse[data.game[0].problems.indexOf(dt.new.problem)] + ": " + dt.new.status, {
                        theme: {
                            '--toastBackground': '#B12E2E',
                            '--toastBarBackground': '#7f1d1d',
                        }
                    });
                } else {
                    toast.push("Submission by " + dt.new.username + " on " + reverse[data.game[0].problems.indexOf(dt.new.problem)] + ": " + dt.new.status);
                }
            }
        }
        isOpen = true;
        setTimeout(() => {
            isOpen = false;
        }, 4000);
    }).subscribe();
    
    // let editor: monaco.editor.IStandaloneCodeEditor;

    let submitting: boolean = false;

    const submit = async () => {
        submitting = true;
        const code = $editor.getValue();
        const response = await fetch('/api/game/submit', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${$session?.access_token}`,
			},
            body: JSON.stringify({
                language: $lang,
                problem: data.game[0].problems[index[currentTab]],
                code,
                match: $page.params.gameId,
            }),
        });
        submitting = false;
    };

    const handleTab = (tab: string) => {
        if(data.game[0].who_solved[index[tab]] === 0 || tab === 'sub') {
            currentTab = tab;
        }
    }
</script>
<svelte:head>
    <title>Lockout vs { ($session.user.username === data.game[0].contestant_1 ? data.game[0].contestant_2 : data.game[0].contestant_1)}</title>
    <style>
        :root {
            --toastBackground: #1f2937;
            --toastBorderRadius: 0.375rem;
            --toastBorder: 2px solid #374151;
            --toastBarBackground: #B12E2E;
            --agnostic-progress-height: 1rem;
            --agnostic-progress-radius: 0.325rem;
            --agnostic-radius: 0.325rem;
            --agnostic-light: #1f2937;
        }
        .dialog-content {
            border: 2px solid #1F2937;
        }
        progress {
            -webkit-appearance: none;
            border: 0;
            border-radius: 0.25rem;
        }
        progress::-webkit-progress-bar {
            border: 0;
            border-radius: 0.25rem;
            background-color: #1F2937;
        }
        progress::-webkit-progress-value {
            border: 0;
            border-radius: 0.25rem;
            background-color: #B12E2E;
        }
        progress::-moz-progress-bar {
            border: 0;
            border-radius: 0.25rem;
        }
    </style>
</svelte:head>
<div class="w-screen h-screen flex bg-gray-900">
    <Draggable>
        <div class="z-50 bottom-10 left-10 rounded-md overflow-hidden">
            <div class="p-3 bg-red-700  border-solid border-2 border-b-0 border-gray-600 rounded-t-md">
                { $session.user.username} vs { ($session.user.username === data.game[0].contestant_1 ? data.game[0].contestant_2 : data.game[0].contestant_1)}
            </div>
            <table class="p-6 bg-gray-800 w-full border-solid border-2 border-t-0 border-gray-600 rounded-b-md">
                <tr class="text-center rounded-md overflow-hidden">
                    <td class="rounded-b-md">
                        { $game.scores[myIndex-1] }
                    </td>
                    <td>
                        { $game.scores[(myIndex) %2] }
                    </td>
                </tr>
            </table>
        </div>
    </Draggable>
    <!-- <Button mode="primary" isBlock isBordered isRounded type="button" on:click={openDialog} >
        Open dialog via dialogRef
    </Button> -->
    <Dialog id="a11y-dialog" dialogRoot="#dialog-root" closeButtonLabel="My close button label" closeButtonPosition="last" title="Lockout Over!" role="dialog" classNames={{ title: "h4 mbe18 flex justify-center font-['Lato']" }} isAnimationSlideUp on:instance={assignDialogInstance} >
        <div class="font-['Lato'] text-center">
            {message}
        </div>
    </Dialog>
    <div class="hidden lg:flex lg:flex-shrink-0">
        <div class="flex flex-col w-20">
            <div class="flex-1 flex flex-col min-h-0 overflow-y-auto bg-red-600">
                <div class="flex-1">
                    <div class="bg-red-900 py-4 flex items-center justify-center">
                        <a href="/app/dashboard">
                            <img class="h-14 w-auto" src={dvsme} alt="Duelvsme">
                        </a>
                    </div>
                    <nav aria-label="Sidebar" class="py-6 flex flex-col items-center space-y-3">
                        <div
                            on:click={() => handleTab('A')}
                            class={
                                `flex items-center p-6 rounded-lg text-indigo-200 
                                ${
                                    currentTab !== "A" ?
                                    (
                                        $game.who_solved[0] === 0 ?
                                        "hover:bg-red-700 select-none cursor-pointer" : 
                                        (
                                            $game.who_solved[0] === myIndex ? 
                                            "bg-green-700 select-none cursor-not-allowed" :
                                            "bg-black select-none cursor-not-allowed" 
                                        ) 
                                    ) :
                                    "bg-red-800 select-none cursor-pointer"
                                } hover:no-underline`
                            }
                        >
                            <span class="text-white font-bold text-xl">A</span>
                        </div>
        
                        <div
                            on:click={() => handleTab('B')}
                            class={
                                `flex items-center p-6 rounded-lg text-indigo-200 
                                ${
                                    currentTab !== "B" ?
                                    (
                                        $game.who_solved[1] === 0 ?
                                        "hover:bg-red-700 select-none cursor-pointer" : 
                                        (
                                            $game.who_solved[1] === myIndex ? 
                                            "bg-green-700 select-none cursor-not-allowed" :
                                            "bg-black select-none cursor-not-allowed" 
                                        ) 
                                    ) :
                                    "bg-red-800 select-none cursor-pointer"
                                } hover:no-underline`
                            }
                        >
                            <span class="text-white font-bold text-xl">B</span>
                        </div>
            
                        <div
                            on:click={() => handleTab('C')}
                            class={
                                `flex items-center p-6 rounded-lg text-indigo-200 
                                ${
                                    currentTab !== "C" ?
                                    (
                                        $game.who_solved[2] === 0 ?
                                        "hover:bg-red-700 select-none cursor-pointer" : 
                                        (
                                            $game.who_solved[2] === myIndex ? 
                                            "bg-green-700 select-none cursor-not-allowed" :
                                            "bg-black select-none cursor-not-allowed" 
                                        ) 
                                    ) :
                                    "bg-red-800 select-none cursor-pointer"
                                } 
                                hover:no-underline`
                            }
                        >
                            <span class="text-white font-bold text-xl">C</span>
                        </div>
            
                        <div
                            on:click={() => handleTab('D')}
                            class={
                                `flex items-center p-6 rounded-lg text-indigo-200 
                                ${
                                    currentTab !== "D" ?
                                    (
                                        $game.who_solved[3] === 0 ?
                                        "hover:bg-red-700 select-none cursor-pointer" : 
                                        (
                                            $game.who_solved[3] === myIndex ? 
                                            "bg-green-700 select-none cursor-not-allowed" :
                                            "bg-black select-none cursor-not-allowed" 
                                        ) 
                                    ) :
                                    "bg-red-800 select-none cursor-pointer"
                                } hover:no-underline`
                            }
                        >
                            <span class="text-white font-bold text-xl">D</span>
                        </div>
            
                        <div
                            on:click={() => handleTab('E')}
                            class={
                                `flex items-center p-6 rounded-lg text-indigo-200 
                                ${
                                    currentTab !== "E" ?
                                    (
                                        $game.who_solved[4] === 0 ?
                                        "hover:bg-red-700 select-none cursor-pointer" : 
                                        (
                                            $game.who_solved[4] === myIndex ? 
                                            "bg-green-700 select-none cursor-not-allowed" :
                                            "bg-black select-none cursor-not-allowed" 
                                        ) 
                                    ) :
                                    "bg-red-800 select-none cursor-pointer"
                                } hover:no-underline`
                            }
                        >
                            <span class="text-white font-bold text-xl">E</span>
                        </div>
                        <div on:click={() => handleTab('sub')} class="flex items-center p-4 rounded-lg bg-white hover:brightness-90 active:bg-red-300 hover:no-underline select-none cursor-pointer">
                            <span class="text-red-700 font-bold text-xl">SUB</span>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </div>
    <div class="w-screen lg:flex lg:flex-col">
        <div class="my-5 px-10 flex flex-col items-center">
            <div class="w-full block relative">
                    <div class="w-full flex flex-row justify-center h-[1px]">
                        <CountDown
                            classes="text-md bg-gray-800 border-2 border-gray-700 border-solid px-1 rounded-md absolute inline-block text-right"
                            start_date={$game.start_time}
                            duration={$game.duration}
                        />
                    </div>
                    <progress class="w-full h-full rounded-md" value={($diff.minutes || 0) * 60 + ($diff.seconds || 0)} max={2700} />
            </div>
        </div>
        <div class="w-full lg:flex lg:flex-shrink-0">
            <div class={`${currentTab === "sub"? "hidden": ""} h-[92vh] w-1/2 p-10 pt-0`}>
                {#each data.statements as statement, ind }
                <!-- {index[currentTab] === ind} -->
                    <div class={`bg-gray-800 h-full rounded-md overflow-scroll ${index[currentTab] !== ind ? "hidden" : ""} border-gray-700 border-solid border-2`}>
                        {@html statement}
                    </div>
                {/each}
            </div>
            <div class={`${currentTab === "sub"? "hidden": ""} h-[92vh] w-1/2 p-10 pl-0 pt-0`}>
                <div class="flex flex-col h-full py-4 bg-gray-800 border-gray-700 border-solid border-2 rounded-md items-center">
                    <div class="mb-4 border-solid border-gray-700 border-2 rounded-md mx-6 w-2/3">
                        <Select
                            bind:singleSelected={selectedLang}
                            on:selected={
                                (e) => {
                                    selectedLang = e.detail;
                                }
                            }
                            uniqueId="sel1"
                            name="select1"
                            labelCopy="Select a language"
                            defaultOptionLabel="Select a language"
                            options={languageOptions}
                        />
                    </div>
                    <div class="mb-4 h-full w-full border-y-2 border-solid border-gray-700 z-40">
                        <Monaco editor={editor} />
                    </div>
                    <div class="px-3 w-3/4 flex flex-col items-stretch">
                        <Button on:click={submit} mode="primary" size="large" isDisabled={submitting} isRounded>
                            {#if submitting}
                            <Loader size="small" />
                            {/if}
                            {#if !submitting}
                                Submit
                            {/if}
                        </Button>
                    </div>
                </div>
            </div>
            <div class={`${currentTab !== "sub"? "hidden": ""} h-full w-full p-10`}> 
                <!-- display -->
            </div>
        </div>
    </div>
</div>