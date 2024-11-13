<script>
    // @ts-nocheck
    import Scroll from "./Scroll.svelte";
    import { onMount } from "svelte";
    import { setupRecords } from "$lib/utils/spinning_records";
    import Intro from "./Intro.svelte";
    import ExploreIntro from "./ExploreIntro.svelte";
    import Credits from "./Credits.svelte";

    onMount(() => {
        setupRecords();
    });
</script>

<Intro />

<Scroll />

<ExploreIntro />

<Credits/>
