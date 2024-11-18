<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import Details from "./Details.svelte";
    import { width, height } from "$lib/utils/vis_utils";
    import { buildScatter } from "$lib/utils/scatterplot_builder";
    import { sheet, focus } from "./store";
    /**
     * @type {{ items: any[]; }}
     */
    export let data;
    /**
     * @type {boolean}
     */
    export let explorative;

    /**
     * @type {SVGSVGElement}
     */
    let scatterplot;
    /**
     * @type {HTMLDivElement}
     */
    let buttonSection;

    onMount(() => {
        buildScatter(scatterplot, data, buttonSection);
    });

    $: data, buildScatter(scatterplot, data, buttonSection);

    function increaseSheet() {
        d3.selectAll(".triangle").attr("opacity", 0);
        d3.selectAll(".triangleText").attr("opacity", 0);
        d3.selectAll(".rectangle").attr("opacity", 0);
        d3.selectAll(".rectangleText").attr("opacity", 0);
        if (explorative) {
            if ($sheet < 2) {
                sheet.update((n) => n + 1);
            } else {
                sheet.set(0);
            }
        }
    }
    $: if ($sheet === 1) {
        toggleTriangleOverlay();
    }
    $: if ($sheet === 2) {
        toggleRectOverlay();
    }

    function toggleRectOverlay() {
        d3.selectAll(".triangle").transition().duration(500).attr("opacity", 0);
        d3.selectAll(".triangleText")
            .transition()
            .duration(500)
            .attr("opacity", 0);
        d3.selectAll(".rectangle")
            .transition()
            .duration(500)
            .attr("opacity", 0.3);
        d3.selectAll(".rectangleText")
            .transition()
            .duration(500)
            .attr("opacity", 1);
    }

    function toggleTriangleOverlay() {
        d3.selectAll(".rectangle")
            .transition()
            .duration(500)
            .attr("opacity", 0);
        d3.selectAll(".rectangleText")
            .transition()
            .duration(500)
            .attr("opacity", 0);
        d3.selectAll(".triangle")
            .transition()
            .duration(500)
            .attr("opacity", 0.3);
        d3.selectAll(".triangleText")
            .transition()
            .duration(500)
            .attr("opacity", 1);
    }

    /**
    function setNext() {
        const currentIndex = data.items.map((d) => d.id).indexOf($focus.id);
        const elem =
            currentIndex <= data.items.length
                ? data.items[currentIndex + 1]
                : data.items[0];

        setNewFocus(elem);
    }

    function setPrev() {
        const currentIndex = data.items.map((d) => d.id).indexOf($focus.id);
        const elem =
            currentIndex >= 0
                ? data.items[currentIndex - 1]
                : data.items[data.items.length - 1];

        setNewFocus(elem);
    }

    function setNewFocus(elem) {
        const newFocus = {
            in_wantlist: elem.stats?.community.in_wantlist,
            in_collection: elem.stats?.community.in_collection,
            title: elem.display_title,
            resource: elem.resource_url,
            uri: elem.uri,
            id: elem.id,
            video: "none",
        };
        fetch(`https://api.discogs.com/releases/${newFocus.id}`)
            .then((res) => res.json())
            .then((json) => {
                if (json.videos[0]) {
                    const uri = json.videos[0].uri;
                    const embed = `https://www.youtube.com/embed/${uri.split("v=")[1]}`;
                    newFocus.video = embed;
                }
                focus.set(newFocus);
            });
        d3.selectAll("circle").attr(
            "fill",
            ( d) => {
                if (d) {
                    if (d.in_wantlist <= d.in_collection) {
                        return "#FFAE85";
                    }
                    return "#1C29E1";
                }
            },
        );
        d3.selectAll("circle")
            .filter((d) => d.id == newFocus.id)
            .attr("fill", "grey");
    }
    **/
</script>

<div class="vis-wrapper">
    <svg
        bind:this={scatterplot}
        id="scatter-vis"
        {width}
        {height}
        on:click={() => {
            if (explorative) {
                setTimeout(increaseSheet, 350);
            }
        }}
    >
    </svg>

    <div id="detail-section">
        {#if explorative}
            <div class="button-section" bind:this={buttonSection}></div>
        {/if}
        <Details />
        <!--- {#if explorative}
            <button on:click={setPrev}>prev</button>
            <button on:click={setNext}>next</button>
        {/if}-->
    </div>
</div>

<style>
    button {
        border: 1px solid #777;
        border-radius: 10px;
        padding: 10px;
        background: rgb(247, 249, 223);
        margin-top: 10px;
    }

    .vis-wrapper {
        display: flex;
        gap: 0.5rem;
    }

    svg {
        margin: 20px;
    }

    #detail-section {
        width: 15vw;
    }
</style>
