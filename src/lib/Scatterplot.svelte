<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
    export let data;

    const releases = data.items.map(
        (/** @type {{ stats: { community: any; }; }} */ elem) =>
            elem.stats?.community,
    );
    const width = 500;
    const height = width;
    const margin = width / 20;

    /**
     * @type {SVGSVGElement}
     */
    let scatterplot;

    onMount(() => {
        console.log(releases);
        buildScatter();
    });

    function buildScatter() {
        const xScale = d3.scaleLinear([0, 1000], [margin, width - margin]);
        const yScale = d3.scaleLinear([0, 1000], [height - margin, margin]);

        const g = d3
            .select(scatterplot)
            .append("g")
            .attr("fill", "none")
            .attr("stroke-linecap", "round");

        g.selectAll("path")
            .data(releases)
            .join("path")
            .attr("stroke", "black")
            .attr("stroke-width", 4)
            .attr(
                "d",
                (
                    /** @type {{ in_wantlist: any; in_collection: any; }} */ d,
                ) => {
                    if (d) {
                        return `M${xScale(d.in_wantlist)},${yScale(d.in_collection)}h0`;
                    }
                },
            )
            .append("text")
            .text(
                (
                    /** @type {{ in_wantlist: any; in_collection: any; }} */ d,
                    /** @type {number} */ i,
                ) => {
                    if (d) {
                        return `want: ${d.in_wantlist}, have: ${d.in_collection}, ${i}`;
                    }
                    console.log(i);
                },
            );
    }
</script>

<svg bind:this={scatterplot} id="scatter-vis" {width} {height} />

<style>
    svg {
        border: solid black 1px;
    }
</style>
