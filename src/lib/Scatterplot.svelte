<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import Details from "./Details.svelte";
    export let data;

    console.log(data);
    const releases = data.items.map(
        (
            /** @type {{ stats: { community: { in_wantlist: any; in_collection: any; }; }; display_title: any; resource_url: any; uri: any; }} */ elem,
        ) => {
            return {
                in_wantlist: elem.stats?.community.in_wantlist,
                in_collection: elem.stats?.community.in_collection,
                title: elem.display_title,
                resource: elem.resource_url,
                uri: elem.uri,
            };
        },
    );
    const width = 700;
    const height = width;
    const margin = width / 10;
    const textMargin = width / 20;

    /**
     * @type {SVGSVGElement}
     */
    let scatterplot;
    let focus = releases[0];

    onMount(() => {
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

        d3.select(scatterplot)
            .append("g")
            .attr("transform", `translate(0,${height - margin + 10})`)
            .call(
                d3
                    .axisBottom(xScale)
                    .tickSize(-width * 1.3)
                    .ticks(5),
            )
            .select(".domain")
            .remove();

        
        const yScale = d3.scaleLinear(
            [0, d3.max([maxWant, maxHave])],
            [height - margin, margin],
        );

        d3.select(scatterplot)
            .append("g")
            .attr("transform", `translate(${margin-10},0)`)
            .call(
                d3
                    .axisLeft(yScale)
                    .tickSize(-height * 1.3)
                    .ticks(5),
            )
            .select(".domain")
            .remove();

        const g = d3
            .select(scatterplot)
            .append("g")
            .attr("fill", "none")
            .attr("stroke-linecap", "round");

        g.selectAll("path")
            .data(releases)
            .join("circle")
            .attr(
                "fill",
                (
                    /** @type {{ in_wantlist: any; in_collection: any; }} */ d,
                ) => {
                    if (d) {
                        if (d.in_wantlist <= d.in_collection) {
                            return "orange";
                        }
                        return "blue";
                    }
                },
            )
            .attr("opacity", 0.6)
            .attr("stroke", "#555")
            .attr("stroke-width", 1)
            .attr("r", 7)
            .attr(
                "cx",
                (
                    /** @type {{ in_wantlist: any; in_collection: any; }} */ d,
                ) => {
                    if (d) {
                        return xScale(d.in_wantlist);
                    }
                },
            )
            .attr(
                "cy",
                (
                    /** @type {{ in_wantlist: any; in_collection: any; }} */ d,
                ) => {
                    if (d) {
                        return yScale(d.in_collection);
                    }
                },
            )
            .on("mouseover", (/** @type {any} */ e, /** @type {any} */ d) => {
                console.log(e, d);
                focus = d;
            });

        //const handleZoom = (e) => g.attr("transform", e.transform);
        //const zoom = d3.zoom().on("zoom", handleZoom);
        //d3.select(scatterplot).call(zoom);
    }
</script>

<div class="vis-wrapper">
    <svg bind:this={scatterplot} id="scatter-vis" {width} {height}>
        <line
            x1={margin}
            y1={height - margin}
            x2={width - margin}
            y2={margin}
            stroke="#999"
            stroke-dasharray="10,10"
            stroke-width="3"
        />
        <text x={textMargin} y={textMargin} fill="black">saturated</text>
        <text x={width - textMargin - 20} y={textMargin} fill="black"
            >popular</text
        >
        <text x={textMargin} y={height - textMargin} fill="black"
            >irrelevant</text
        >
        <text x={width - textMargin - 30} y={height - textMargin} fill="black"
            >super rare</text
        >
    </svg>
    <Details {focus} />
</div>

<style>
    .vis-wrapper {
        display: flex;
        gap: 25px;
    }
</style>
