<script lang="ts">
    import Monaco from "../monaco.svelte";
    import FakeProblem from "./FakeProblem.svelte";
    import dvsme from "../../../assets/duelvsme.svg";
    import { editor } from "$lib/stores/lang";

    export let scroll: number, height: number;
    editor.subscribe((e) => {
        if(e) {
            e.updateOptions({ readOnly: true });
        }
    });
    $: perc = 1 - ((scroll - 4 * height) / (2*height));
    $: prog = Math.round(Math.min(2700, Math.max(perc*2700, 0)));
    // $: coun = (
    //                 scroll > 4*height
    //             ) ?
    //             (scroll - 4*height)/(2*height) :
    //             0;
    // $: if($editor) {
    //     $editor.setValue(
    //         coun * 156 < 38 ?
    //         '#include <bits/stdc++.h>\nint main() {\n\tint a;\n\tcin>>a;\n\tif(a%2 != 0 || a == 2){\n\t\tcout<<"NO\\n";\n\t}\n\telse{\n\t\tcout<<"YES\\n";\n\t}\n}'
    //         .slice(0, Math.floor(coun*156)) :
    //         '#include <bits/stdc++.h>\nint main() {\n\tint a;\n\tcin>>a;\n\tif(a%2 != 0 || a == 2){\n\t\tcout<<"NO\\n";\n\t}\n\telse{\n\t\tcout<<"YES\\n";\n\t}'.slice(0, Math.max(coun*146, 38)) + '\n}'
    //     )
    // }
    // slow down scroll speed
    $: scroll = scroll*0.99;
    // $: console.log({calc: (100 - ((scroll - 4 * height) / height)*100), scroll, height: 3*height});
</script>
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
    .select {
        color-scheme: dark;
        --agnostic-warning-border-accent: var(--agnostic-warning-border-accent-modedark);
        --agnostic-warning-border: var(--agnostic-warning-border-modedark);
        --agnostic-warning-light: var(--agnostic-warning-light-modedark);
        --agnostic-warning-dark: var(--agnostic-warning-dark-modedark);
        --agnostic-secondary-hover: var(--agnostic-secondary-hover-modedark);
        --agnostic-secondary: var(--agnostic-secondary-modedark);
        --agnostic-primary-light: var(--agnostic-primary-light-modedark);
        --agnostic-primary-dark: var(--agnostic-primary-dark-modedark);
        --agnostic-primary-border: var(--agnostic-primary-border-modedark);
        --agnostic-primary-hover: var(--agnostic-primary-hover-modedark);
        --agnostic-primary: var(--agnostic-primary-modedark);
        --agnostic-dark: var(--agnostic-dark-modedark);
        --agnostic-gray-dark: var(--agnostic-gray-dark-modedark);
        --agnostic-gray-mid-dark: var(--agnostic-gray-mid-dark-modedark);
        --agnostic-gray-mid: var(--agnostic-gray-mid-modedark);
        --agnostic-gray-light: var(--agnostic-gray-light-modedark);
        --agnostic-gray-extra-light: var(--agnostic-gray-extra-light-modedark);
        --agnostic-error: var(--agnostic-error-modedark);
        --agnostic-error-light: var(--agnostic-error-light-modedark);
        --agnostic-error-dark: var(--agnostic-error-dark-modedark);
        --agnostic-error-border: var(--agnostic-error-border-modedark);
        --agnostic-disabled-color: var(--agnostic-gray-dark-modedark);
        --agnostic-disabled-bg: var(--agnostic-gray-light-modedark);
        --agnostic-action-border: var(--agnostic-action-border-modedark);
        --agnostic-action-light: var(--agnostic-action-light-modedark);
        --agnostic-action-dark: var(--agnostic-action-dark-modedark);
        --agnostic-action-hover: var(--agnostic-action-hover-modedark);
        --agnostic-action: var(--agnostic-action-modedark);
        --agnostic-radius-capsule: 9999px;
        --agnostic-font-family: font-family: "Lato";
        --agnostic-btn-font-family: font-family: "Lato";
        --agnostic-btn-primary: #B12E2E;
        --agnostic-btn-primary-color: #fafafa;
        --agnostic-progress-background: #fafafa;
        --agnostic-progress-fill-color: #B12E2E;
        --toastBackground: #1f2937;
        --toastBorderRadius: 0.375rem;
        --toastBorder: 2px solid #374151;
        --toastBarBackground: #B12E2E;
        --agnostic-progress-height: 1rem;
        --agnostic-progress-radius: 0.325rem;
        --agnostic-radius: 0.325rem;
        --agnostic-light: #1f2937;
        --sash-size: 4px;
        --agnostic-warning-border-accent-modelight: #ecd386;
        --agnostic-warning-border-modelight: #f0e3b9;
        --agnostic-warning-light-modelight: #fff5d4;
        --agnostic-warning-dark-modelight: #634902;
        --agnostic-secondary-hover-modelight: #bc583d;
        --agnostic-secondary-modelight: #c94d2b;
        --agnostic-primary-extra-light-modelight: #f1faff;
        --agnostic-primary-light-modelight: #dcf1ff;
        --agnostic-primary-dark-modelight: #063f69;
        --agnostic-primary-border-modelight: #c1d9e9;
        --agnostic-primary-hover-modelight: #2087d0;
        --agnostic-primary-modelight: #077acb;
        --agnostic-light-modelight: #fff;
        --agnostic-dark-modelight: #333;
        --agnostic-gray-dark-modelight: #717171;
        --agnostic-gray-mid-dark-modelight: #ccc;
        --agnostic-gray-mid-modelight: #d8d8d8;
        --agnostic-gray-light-modelight: #e9e9e9;
        --agnostic-gray-extra-light-modelight: #f8f8f8;
        --agnostic-error-border-modelight: #eec8c8;
        --agnostic-error-light-modelight: #ffe0e0;
        --agnostic-error-dark-modelight: #771414;
        --agnostic-error-modelight: #e02e2e;
        --agnostic-action-border-modelight: #c7f0d1;
        --agnostic-action-light-modelight: #e2ffe9;
        --agnostic-action-dark-modelight: #0a3414;
        --agnostic-action-hover-modelight: #3dd262;
        --agnostic-action-modelight: #2fb751;
        --agnostic-disabled-color-modelight: var(--agnostic-gray-dark-modelight);
        --agnostic-disabled-bg-modelight: var(--agnostic-gray-light-modelight);
        --agnostic-warning-border-accent-modedark: #433507;
        --agnostic-warning-border-modedark: #fff5d4;
        --agnostic-warning-light-modedark: #faecc0;
        --agnostic-warning-dark-modedark: #221b01;
        --agnostic-secondary-hover-modedark: #000;
        --agnostic-secondary-modedark: #e89982;
        --agnostic-primary-extra-light-modedark: #172c38;
        --agnostic-primary-light-modedark: #90d0fd;
        --agnostic-primary-dark-modedark: #021421;
        --agnostic-primary-border-modedark: #63b9f7;
        --agnostic-primary-hover-modedark: #63b9f7;
        --agnostic-primary-modedark: #91d1ff;
        --agnostic-light-modedark: #1a202c;
        --agnostic-dark-modedark: rgb(255 255 255 / 80%);
        --agnostic-gray-dark-modedark: rgb(255 255 255 / 40%);
        --agnostic-gray-mid-dark-modedark: rgba(255 255 255 / 32%);
        --agnostic-gray-mid-modedark: rgba(255 255 255 / 8%);
        --agnostic-gray-light-modedark: rgba(255 255 255 / 6%);
        --agnostic-gray-extra-light-modedark: rgba(255 255 255 / 4%);
        --agnostic-error-border-modedark: #ffe0e0;
        --agnostic-error-light-modedark: #ffe0e0;
        --agnostic-error-dark-modedark: #260202;
        --agnostic-error-modedark: #fd9e9e;
        --agnostic-action-border-modedark: #e7ffed;
        --agnostic-action-light-modedark: #baf9ca;
        --agnostic-action-dark-modedark: #011e08;
        --agnostic-action-hover-modedark: #9fe0af;
        --agnostic-action-modedark: #baf9ca;
        --agnostic-disabled-color-modedark: var(--agnostic-gray-dark-modedark);
        --agnostic-disabled-bg-modedark: var(--agnostic-gray-light-modedark);
        --agnostic-focus-ring-outline-color: transparent;
        --agnostic-focus-ring-outline-style: solid;
        --agnostic-focus-ring-outline-width: 3px;
        --agnostic-focus-ring-color: rgb(55 149 225 / 50%);
        --fluid-80: 5rem;
        --fluid-72: 4.5rem;
        --fluid-64: 4rem;
        --fluid-56: 3.5rem;
        --fluid-48: 3rem;
        --fluid-40: 2.5rem;
        --fluid-36: 2.25rem;
        --fluid-32: 2rem;
        --fluid-24: 1.5rem;
        --fluid-20: 1.25rem;
        --fluid-18: 1.125rem;
        --fluid-16: 1rem;
        --fluid-14: .875rem;
        --fluid-12: .75rem;
        --fluid-10: .625rem;
        --fluid-8: .5rem;
        --fluid-6: .375rem;
        --fluid-4: .25rem;
        --fluid-2: .125rem;
        --agnostic-vertical-pad: var(--fluid-8);
        --agnostic-line-height: var(--fluid-20);
        --agnostic-side-padding: var(--fluid-12);
        --agnostic-input-side-padding: var(--fluid-12);
        --agnostic-small: .875rem;
        --agnostic-body: 1rem;
        --agnostic-h6: .75rem;
        --agnostic-h5: 1.125rem;
        --agnostic-h4: 1.5rem;
        --agnostic-h3: 2.25rem;
        --agnostic-h2: 3rem;
        --agnostic-h1: 4rem;
        --agnostic-font-color: var(--agnostic-dark);
        --agnostic-font-weight-bold: 600;
        --agnostic-font-weight-light: 300;
        --agnostic-font-family-mono: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
        --agnostic-font-family-serif: Georgia,Cambria,"Times New Roman",Times,serif;
        --agnostic-font-family-body: system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Ubuntu,"Helvetica Neue",sans-serif;
        --agnostic-timing-slow: .45s;
        --agnostic-timing-medium: .3s;
        --agnostic-timing-fast: .2s;
        -webkit-text-size-adjust: 100%;
        tab-size: 4;
        --tw-bg-opacity: 1;
        --tw-border-opacity: 1;
        box-sizing: border-box;
        --tw-border-spacing-x: 0;
        --tw-border-spacing-y: 0;
        --tw-translate-x: 0;
        --tw-translate-y: 0;
        --tw-rotate: 0;
        --tw-skew-x: 0;
        --tw-skew-y: 0;
        --tw-scale-x: 1;
        --tw-scale-y: 1;
        --tw-pan-x: ;
        --tw-pan-y: ;
        --tw-pinch-zoom: ;
        --tw-scroll-snap-strictness: proximity;
        --tw-ordinal: ;
        --tw-slashed-zero: ;
        --tw-numeric-figure: ;
        --tw-numeric-spacing: ;
        --tw-numeric-fraction: ;
        --tw-ring-inset: ;
        --tw-ring-offset-width: 0px;
        --tw-ring-offset-color: #fff;
        --tw-ring-color: rgb(59 130 246 / .5);
        --tw-ring-offset-shadow: 0 0 #0000;
        --tw-ring-shadow: 0 0 #0000;
        --tw-shadow-colored: 0 0 #0000;
        --tw-blur: ;
        --tw-brightness: ;
        --tw-contrast: ;
        --tw-grayscale: ;
        --tw-hue-rotate: ;
        --tw-invert: ;
        --tw-saturate: ;
        --tw-sepia: ;
        --tw-drop-shadow: ;
        --tw-backdrop-blur: ;
        --tw-backdrop-brightness: ;
        --tw-backdrop-contrast: ;
        --tw-backdrop-grayscale: ;
        --tw-backdrop-hue-rotate: ;
        --tw-backdrop-invert: ;
        --tw-backdrop-opacity: ;
        --tw-backdrop-saturate: ;
        --tw-backdrop-sepia: ;
        font-family: inherit;
        margin: 0;
        text-transform: none;
        --tw-shadow: 0 0 #0000;
        -webkit-print-color-adjust: exact;
        display: block;
        width: 100%;
        appearance: none;
        padding: var(--fluid-6) var(--fluid-32) var(--fluid-6) var(--fluid-12);
        font-size: var(--fluid-16);
        font-weight: 400;
        line-height: 1.5;
        color: var(--agnostic-dark);
        border: 1px solid var(--agnostic-select-border-color, var(--agnostic-gray-light));
        border-radius: var(--agnostic-radius);
        transition: border-color var(--agnostic-timing-fast) ease-in-out,box-shadow var(--agnostic-timing-fast) ease-in-out;
        background-color: inherit;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23333330' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right var(--fluid-12) center;
        background-size: var(--fluid-16) var(--fluid-12);
    }
    .button {
        color-scheme: dark;
        --agnostic-warning-border-accent: var(--agnostic-warning-border-accent-modedark);
        --agnostic-warning-border: var(--agnostic-warning-border-modedark);
        --agnostic-warning-light: var(--agnostic-warning-light-modedark);
        --agnostic-warning-dark: var(--agnostic-warning-dark-modedark);
        --agnostic-secondary-hover: var(--agnostic-secondary-hover-modedark);
        --agnostic-secondary: var(--agnostic-secondary-modedark);
        --agnostic-primary-light: var(--agnostic-primary-light-modedark);
        --agnostic-primary-dark: var(--agnostic-primary-dark-modedark);
        --agnostic-primary-border: var(--agnostic-primary-border-modedark);
        --agnostic-primary-hover: var(--agnostic-primary-hover-modedark);
        --agnostic-primary: var(--agnostic-primary-modedark);
        --agnostic-dark: var(--agnostic-dark-modedark);
        --agnostic-gray-dark: var(--agnostic-gray-dark-modedark);
        --agnostic-gray-mid-dark: var(--agnostic-gray-mid-dark-modedark);
        --agnostic-gray-mid: var(--agnostic-gray-mid-modedark);
        --agnostic-gray-light: var(--agnostic-gray-light-modedark);
        --agnostic-gray-extra-light: var(--agnostic-gray-extra-light-modedark);
        --agnostic-error: var(--agnostic-error-modedark);
        --agnostic-error-light: var(--agnostic-error-light-modedark);
        --agnostic-error-dark: var(--agnostic-error-dark-modedark);
        --agnostic-error-border: var(--agnostic-error-border-modedark);
        --agnostic-disabled-color: var(--agnostic-gray-dark-modedark);
        --agnostic-disabled-bg: var(--agnostic-gray-light-modedark);
        --agnostic-action-border: var(--agnostic-action-border-modedark);
        --agnostic-action-light: var(--agnostic-action-light-modedark);
        --agnostic-action-dark: var(--agnostic-action-dark-modedark);
        --agnostic-action-hover: var(--agnostic-action-hover-modedark);
        --agnostic-action: var(--agnostic-action-modedark);
        --agnostic-radius-capsule: 9999px;
        --agnostic-font-family: font-family: "Lato";
        --agnostic-btn-font-family: font-family: "Lato";
        --agnostic-btn-primary: #B12E2E;
        --agnostic-btn-primary-color: #fafafa;
        --agnostic-progress-background: #fafafa;
        --agnostic-progress-fill-color: #B12E2E;
        --toastBackground: #1f2937;
        --toastBorderRadius: 0.375rem;
        --toastBorder: 2px solid #374151;
        --toastBarBackground: #B12E2E;
        --agnostic-progress-height: 1rem;
        --agnostic-progress-radius: 0.325rem;
        --agnostic-radius: 0.325rem;
        --agnostic-light: #1f2937;
        --sash-size: 4px;
        --agnostic-warning-border-accent-modelight: #ecd386;
        --agnostic-warning-border-modelight: #f0e3b9;
        --agnostic-warning-light-modelight: #fff5d4;
        --agnostic-warning-dark-modelight: #634902;
        --agnostic-secondary-hover-modelight: #bc583d;
        --agnostic-secondary-modelight: #c94d2b;
        --agnostic-primary-extra-light-modelight: #f1faff;
        --agnostic-primary-light-modelight: #dcf1ff;
        --agnostic-primary-dark-modelight: #063f69;
        --agnostic-primary-border-modelight: #c1d9e9;
        --agnostic-primary-hover-modelight: #2087d0;
        --agnostic-primary-modelight: #077acb;
        --agnostic-light-modelight: #fff;
        --agnostic-dark-modelight: #333;
        --agnostic-gray-dark-modelight: #717171;
        --agnostic-gray-mid-dark-modelight: #ccc;
        --agnostic-gray-mid-modelight: #d8d8d8;
        --agnostic-gray-light-modelight: #e9e9e9;
        --agnostic-gray-extra-light-modelight: #f8f8f8;
        --agnostic-error-border-modelight: #eec8c8;
        --agnostic-error-light-modelight: #ffe0e0;
        --agnostic-error-dark-modelight: #771414;
        --agnostic-error-modelight: #e02e2e;
        --agnostic-action-border-modelight: #c7f0d1;
        --agnostic-action-light-modelight: #e2ffe9;
        --agnostic-action-dark-modelight: #0a3414;
        --agnostic-action-hover-modelight: #3dd262;
        --agnostic-action-modelight: #2fb751;
        --agnostic-disabled-color-modelight: var(--agnostic-gray-dark-modelight);
        --agnostic-disabled-bg-modelight: var(--agnostic-gray-light-modelight);
        --agnostic-warning-border-accent-modedark: #433507;
        --agnostic-warning-border-modedark: #fff5d4;
        --agnostic-warning-light-modedark: #faecc0;
        --agnostic-warning-dark-modedark: #221b01;
        --agnostic-secondary-hover-modedark: #000;
        --agnostic-secondary-modedark: #e89982;
        --agnostic-primary-extra-light-modedark: #172c38;
        --agnostic-primary-light-modedark: #90d0fd;
        --agnostic-primary-dark-modedark: #021421;
        --agnostic-primary-border-modedark: #63b9f7;
        --agnostic-primary-hover-modedark: #63b9f7;
        --agnostic-primary-modedark: #91d1ff;
        --agnostic-light-modedark: #1a202c;
        --agnostic-dark-modedark: rgb(255 255 255 / 80%);
        --agnostic-gray-dark-modedark: rgb(255 255 255 / 40%);
        --agnostic-gray-mid-dark-modedark: rgba(255 255 255 / 32%);
        --agnostic-gray-mid-modedark: rgba(255 255 255 / 8%);
        --agnostic-gray-light-modedark: rgba(255 255 255 / 6%);
        --agnostic-gray-extra-light-modedark: rgba(255 255 255 / 4%);
        --agnostic-error-border-modedark: #ffe0e0;
        --agnostic-error-light-modedark: #ffe0e0;
        --agnostic-error-dark-modedark: #260202;
        --agnostic-error-modedark: #fd9e9e;
        --agnostic-action-border-modedark: #e7ffed;
        --agnostic-action-light-modedark: #baf9ca;
        --agnostic-action-dark-modedark: #011e08;
        --agnostic-action-hover-modedark: #9fe0af;
        --agnostic-action-modedark: #baf9ca;
        --agnostic-disabled-color-modedark: var(--agnostic-gray-dark-modedark);
        --agnostic-disabled-bg-modedark: var(--agnostic-gray-light-modedark);
        --agnostic-focus-ring-outline-color: transparent;
        --agnostic-focus-ring-outline-style: solid;
        --agnostic-focus-ring-outline-width: 3px;
        --agnostic-focus-ring-color: rgb(55 149 225 / 50%);
        --fluid-80: 5rem;
        --fluid-72: 4.5rem;
        --fluid-64: 4rem;
        --fluid-56: 3.5rem;
        --fluid-48: 3rem;
        --fluid-40: 2.5rem;
        --fluid-36: 2.25rem;
        --fluid-32: 2rem;
        --fluid-24: 1.5rem;
        --fluid-20: 1.25rem;
        --fluid-18: 1.125rem;
        --fluid-16: 1rem;
        --fluid-14: .875rem;
        --fluid-12: .75rem;
        --fluid-10: .625rem;
        --fluid-8: .5rem;
        --fluid-6: .375rem;
        --fluid-4: .25rem;
        --fluid-2: .125rem;
        --agnostic-vertical-pad: var(--fluid-8);
        --agnostic-line-height: var(--fluid-20);
        --agnostic-side-padding: var(--fluid-12);
        --agnostic-input-side-padding: var(--fluid-12);
        --agnostic-small: .875rem;
        --agnostic-body: 1rem;
        --agnostic-h6: .75rem;
        --agnostic-h5: 1.125rem;
        --agnostic-h4: 1.5rem;
        --agnostic-h3: 2.25rem;
        --agnostic-h2: 3rem;
        --agnostic-h1: 4rem;
        --agnostic-font-color: var(--agnostic-dark);
        --agnostic-font-weight-bold: 600;
        --agnostic-font-weight-light: 300;
        --agnostic-font-family-mono: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
        --agnostic-font-family-serif: Georgia,Cambria,"Times New Roman",Times,serif;
        --agnostic-font-family-body: system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Ubuntu,"Helvetica Neue",sans-serif;
        --agnostic-timing-slow: .45s;
        --agnostic-timing-medium: .3s;
        --agnostic-timing-fast: .2s;
        -webkit-text-size-adjust: 100%;
        tab-size: 4;
        --tw-border-opacity: 1;
        --tw-bg-opacity: 1;
        --tw-border-spacing-x: 0;
        --tw-border-spacing-y: 0;
        --tw-translate-x: 0;
        --tw-translate-y: 0;
        --tw-rotate: 0;
        --tw-skew-x: 0;
        --tw-skew-y: 0;
        --tw-scale-x: 1;
        --tw-scale-y: 1;
        --tw-pan-x: ;
        --tw-pan-y: ;
        --tw-pinch-zoom: ;
        --tw-scroll-snap-strictness: proximity;
        --tw-ordinal: ;
        --tw-slashed-zero: ;
        --tw-numeric-figure: ;
        --tw-numeric-spacing: ;
        --tw-numeric-fraction: ;
        --tw-ring-inset: ;
        --tw-ring-offset-width: 0px;
        --tw-ring-offset-color: #fff;
        --tw-ring-color: rgb(59 130 246 / .5);
        --tw-ring-offset-shadow: 0 0 #0000;
        --tw-ring-shadow: 0 0 #0000;
        --tw-shadow: 0 0 #0000;
        --tw-shadow-colored: 0 0 #0000;
        --tw-blur: ;
        --tw-brightness: ;
        --tw-contrast: ;
        --tw-grayscale: ;
        --tw-hue-rotate: ;
        --tw-invert: ;
        --tw-saturate: ;
        --tw-sepia: ;
        --tw-drop-shadow: ;
        --tw-backdrop-blur: ;
        --tw-backdrop-brightness: ;
        --tw-backdrop-contrast: ;
        --tw-backdrop-grayscale: ;
        --tw-backdrop-hue-rotate: ;
        --tw-backdrop-invert: ;
        --tw-backdrop-opacity: ;
        --tw-backdrop-saturate: ;
        --tw-backdrop-sepia: ;
        margin: 0;
        text-transform: none;
        background-image: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        user-select: none;
        appearance: none;
        cursor: pointer;
        box-sizing: border-box;
        transition-property: all;
        transition-duration: var(--agnostic-timing-medium);
        border-style: solid;
        border-width: var(--agnostic-btn-border-size, 1px);
        font-family: var(--agnostic-btn-font-family, var(--agnostic-font-family-body));
        font-weight: var(--agnostic-btn-font-weight, 400);
        padding-block-start: var(--agnostic-vertical-pad, .5rem);
        padding-block-end: var(--agnostic-vertical-pad, .5rem);
        padding-inline-start: var(--agnostic-side-padding, .75rem);
        padding-inline-end: var(--agnostic-side-padding, .75rem);
        text-decoration: none;
        text-align: center;
        outline: none;
        background-color: var(--agnostic-btn-primary, var(--agnostic-primary));
        border-color: var(--agnostic-btn-primary, var(--agnostic-primary));
        color: var(--agnostic-btn-primary-color, var(--agnostic-light));
        font-size: calc(var(--agnostic-btn-font-size, 1rem) + .25rem);
        height: 3rem;
        line-height: 3rem;
        padding: 0 3rem;
        border-radius: var(--agnostic-btn-radius, var(--agnostic-radius, .25rem));
    }
</style>
<div class="w-full h-full flex bg-gray-900 rounded-b-md overflow-hidden">
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
                            class={
                                `flex items-center p-6 rounded-lg text-indigo-200 bg-red-800 select-none cursor-pointerhover:no-underline`
                            }
                        >
                            <span class="text-white font-bold text-xl">A</span>
                        </div>
        
                        <div
                            class={
                                `flex items-center p-6 rounded-lg text-indigo-200 hover:bg-red-700 select-none hover:no-underline`
                            }
                        >
                            <span class="text-white font-bold text-xl">B</span>
                        </div>
            
                        <div
                            class={
                                `flex items-center p-6 rounded-lg text-indigo-200 hover:bg-red-700 select-none hover:no-underline`

                            }
                        >
                            <span class="text-white font-bold text-xl">C</span>
                        </div>
            
                        <div
                            class={
                                `flex items-center p-6 rounded-lg text-indigo-200 hover:bg-red-700 select-none hover:no-underline`
                            }
                        >
                            <span class="text-white font-bold text-xl">D</span>
                        </div>
            
                        <div
                            class={
                                `flex items-center p-6 rounded-lg text-indigo-200 hover:bg-red-700 select-none hover:no-underline`
                            }
                        >
                            <span class="text-white font-bold text-xl">E</span>
                        </div>
                        <div class="flex items-center p-4 rounded-lg bg-white hover:brightness-90 hover:no-underline select-none">
                            <span class="text-red-700 font-bold text-xl">SUB</span>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </div>
    <div class="w-full lg:flex lg:flex-col">
        <div class="my-5 px-10 flex flex-col items-center">
            <div class="w-full block relative">
                    <div class="w-full flex flex-row justify-center h-[1px]">
                        <span class="text-md bg-gray-800 border-2 border-gray-700 border-solid px-1 rounded-md absolute inline-block text-right">
                            {
                                Math.max(
                                    Math.min(
                                        Math.round((perc*2700)/60), 45
                                    ),
                                    0
                                )
                            }min 
                            {
                                ((perc*2700)%60) < 10 || ((perc*2700)/60) >= 45  ? "0" : ""
                            }{
                                ((perc*2700)/60) >= 45 ?
                                0 :
                                Math.max(Math.round((perc*2700)%60), 0)
                            }s
                        </span>
                    </div>
                    <progress class="w-full h-full rounded-md" value={prog | 0} max={2700} />
            </div>
        </div>
        <div class="w-full lg:flex lg:flex-shrink-0">
            <div class="h-[73.508vh] w-1/2 p-10 pt-0">
                <FakeProblem />
            </div>
            <div class={`h-[73.508vh] w-1/2 p-10 pl-0 pt-0`}>
                <div class="flex flex-col h-full py-4 bg-gray-800 border-gray-700 border-solid border-2 rounded-md items-center">
                    <div class="mb-4 border-solid border-gray-700 border-2 rounded-md mx-6 w-2/3">
                        <select
                            disabled
                            class="select"
                        >
                            <option>
                                GNU G++17 7.3.0
                            </option>
                        </select>
                    </div>
                    <div class="mb-4 h-full w-full border-y-2 border-solid border-gray-700 z-40 relative">
                        <Monaco editor={editor} />
                        <div class="h-full w-full z-20 bg-transparent inline-block absolute top-0">

                        </div>
                    </div>
                    <div class="px-3 w-3/4 flex flex-col items-stretch">
                        <button type="button" class="button pointer-events-none"> Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>