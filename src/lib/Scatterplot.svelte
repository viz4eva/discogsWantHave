<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import Details from "./Details.svelte";
    import {
        width,
        height,
        margin,
        textMargin,
        rectOverlayData,
        triangleOverlayData,
    } from "$lib/utils/vis_utils";
    import { buildScatter } from "$lib/utils/scatterplot_builder";
    import { focus } from "./store";
    /**
     * @type {{ items: any[]; }}
     */
    export let data;
    /**
     * @type {number}
     */
    export let sheet;
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
        buildScatter(scatterplot, sheet, data, buttonSection);
    });

    $: data, buildScatter(scatterplot, sheet, data, buttonSection);

    function increaseSheet() {
        d3.selectAll(".triangle").attr("opacity", 0);
        d3.selectAll(".triangleText").attr("opacity", 0);
        d3.selectAll(".rectangle").attr("opacity", 0);
        d3.selectAll(".rectangleText").attr("opacity", 0);
        if (explorative) {
            if (sheet < 2) {
                sheet++;
            } else {
                sheet = 0;
            }
        }
    }
    $: if (sheet === 1) {
        toggleTriangleOverlay();
    }
    $: if (sheet === 2) {
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
    </div>
</div>

<style>
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
