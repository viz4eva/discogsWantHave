<script>
    // @ts-nocheck
    import Scatterplot from "./Scatterplot.svelte";
    import { jungle, rare, discoClassics } from "$lib/utils/utils.js";
    import Scrolltest from "./Scrolltest.svelte";
    import { gsap } from "gsap";
    import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
    import { onMount } from "svelte";

    let selectedList = rare;

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(".record-left", {
            rotation: -720, // Rotate to 360 degrees
            ease: "none", // No easing for a smooth continuous rotation
            scrollTrigger: {
                trigger: ".record-left",
                scrub: 2
            },
        });
        gsap.to(".record-right", {
            rotation: 360, // Rotate to 360 degrees
            ease: "none", // No easing for a smooth continuous rotation
            scrollTrigger: {
                trigger: ".record-right",
                scrub: 2
            },
        });
    });
</script>

<h3>Discogs Most Wanted</h3>

<div id="intro">
    <p>
        <a href="https://www.discogs.com/" target="_blank">Discogs</a> is a free,
        community-based data base for discographies and trading platform for records.
        It gives members the opportunity to mark the records they own on a Have-List
        and those they would like to own on a Want-List.
    </p>
    <p>
        This data gives insights on how much sought-after releases are within
        the Discogs community: Those which many collectors want but few already
        own can definitely be described as rare. But there might be also those,
        which many collectors already have and few still want and other flavours
        of demand.
    </p>
    <p>Scroll to have a look!</p>
    <img
        src="2d comic.gif"
        alt="spinning record with disco written on the label"
        width="70%"
        class="spinning-image record-left"
    />
    <img
        src="2d_hihi.gif"
        alt="spinning record with a smiley face on the label"
        width="50%"
        class="spinning-image record-right"
    />
</div>

<Scrolltest {discoClassics} />

<div id="explore">
    <p>
        Now that you know how this visualiuation works, you can explore
        different other user-created lists published on Discgos. This first
        selected example list is called "rare + played by great djs!". And
        indeed, most releases in there have many more Wants than Haves. We can
        see quite a few super rare outliers.
    </p>
    <p>
        Click anywhere in the chart to display the explaning overlays from
        earlier.
    </p>
</div>

<select bind:value={selectedList}>
    <option value={discoClassics}>{discoClassics.name}</option>
    <option value={jungle}>{jungle.name}</option>
    <option value={rare}>{rare.name}</option>
</select>
<Scatterplot data={selectedList} sheet={0} explorative={true} />

<p>
    Data Source: <a href="https://www.discogs.com/developers/#" target="_blank"
        >Discogs API</a
    >
</p>

<style>
    #intro {
        width: 50vw;
        text-align: justify;
        font-size: large;
        margin: 20vh;
        margin-bottom: 50vh;
    }

    select {
        border: none;
        border-radius: 10px;
        padding: 10px;
        background-color: rgb(232, 241, 241);
    }
</style>
