<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
    export let data;

    const releases = data.items.map(
        (/** @type {{ stats: { community: any; }; }} */ elem) =>
            elem.stats?.community,
    );
    const width = 700;
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
        const maxWant = d3.max(
            releases.map(
                (
                    /** @type {{ in_wantlist: number, in_collection: number; }} */ elem,
                ) => elem?.in_wantlist,
            ),
        );
        const maxHave = d3.max(
            releases.map(
                (
                    /** @type {{ in_wantlist: number, in_collection: number; }} */ elem,
                ) => elem?.in_collection,
            ),
        );
        const xScale = d3.scaleLinear(
            [0, d3.max([maxWant, maxHave])],
            [margin, width - margin],
        );
        const yScale = d3.scaleLinear(
            [0, d3.max([maxWant, maxHave])],
            [height - margin, margin],
        );

        const g = d3
            .select(scatterplot)
            .append("g")
            .attr("fill", "none")
            .attr("stroke-linecap", "round");

        g.selectAll("path")
            .data(releases)
            .join("path")
            .attr("stroke", (/** @type {{ in_wantlist: any; in_collection: any; }} */ d) => {
                if (d) {
                    if (d.in_wantlist <= d.in_collection) {
                        return "orange";
                    }
                    return "blue";
                }
            })
            .attr("opacity", 0.7)
            .attr("border","solid 1px black")
            .attr("stroke-width", 7)
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

<svg bind:this={scatterplot} id="scatter-vis" {width} {height}>
    <line x1={margin} y1={height-margin} x2={width-margin} y2={margin} stroke="#999" stroke-dasharray="10,10" stroke-width=3/>
    </svg>

<style>
    
</style>
