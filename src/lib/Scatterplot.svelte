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
    const textMargin = margin - 20;
    let areas = false;

    /**
     * @type {SVGSVGElement}
     */
    let scatterplot;
    let focus = releases[0];

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

    onMount(() => {
        buildScatter();
    });

    function buildScatter() {
        d3.select(scatterplot)
            .append("g")
            .attr("transform", `translate(0,${height - margin + 20})`)
            .call(d3.axisBottom(xScale).tickSize(-width).ticks(5))
            .select(".domain")
            .remove();

        d3.select(scatterplot)
            .append("g")
            .attr("transform", `translate(${margin - 20},0)`)
            .call(d3.axisLeft(yScale).tickSize(-height).ticks(5))
            .select(".domain")
            .remove();

        d3.select(scatterplot)
            .selectAll(".tick line")
            .attr("stroke", "#EBEBEB");

        //Axes labels
        d3.select(scatterplot)
            .append("text")
            .attr("text-anchor", "end")
            .attr("y", height - textMargin)
            .attr("x", width - textMargin)
            .text("Want");

        d3.select(scatterplot)
            .append("text")
            .attr("text-anchor", "end")
            .attr("y", textMargin)
            .attr("x", textMargin)
            .text("Have");

        const g = d3.select(scatterplot).append("g");

        g.selectAll("circle")
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
            .attr("r", 6)
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

    const overlayData = [
        {
            x: margin,
            y: 0,
            width: width / 2 - margin + 10,
            height: height / 2 - 10,
            fill: "#ddd",
            textX: width * 0.25,
            textY: height * 0.25,
            text: "saturated",
        },
        {
            x: width / 2 + 10,
            y: 0,
            width: width / 2,
            height: height / 2 -10,
            fill: "green",
            textX: width * 0.75,
            textY: height * 0.25,
            text: "popular",
        },
        {
            x: margin,
            y: height / 2 - 10,
            width: width / 2 - margin + 10,
            height: height / 2 - margin + 10,
            fill: "red",
            textX: width * 0.25,
            textY: height * 0.75,
            text: "basic",
        },
        {
            x: width / 2 + 10,
            y: height / 2 - 10,
            width: width / 2,
            height: height / 2 - margin + 10,
            fill: "yellow",
            textX: width * 0.75,
            textY: height * 0.75,
            text: "super rare",
        },
    ];
    function toggleOverlay() {
        if (areas) {
            const ff = d3.selectAll(".overlay").remove();
            areas = false;
        } else {
            const overlay = d3
                .select(scatterplot)
                .selectAll("rect")
                .data(overlayData)
                .join("rect")
                .classed("overlay", true)
                .attr("x", (d) => d.x)
                .attr("y", (d) => d.y)
                .attr("width", (d) => d.width)
                .attr("height", (d) => d.height)
                .attr("fill", (d) => d.fill)
                .attr("opacity", 0.3);

            d3.select(scatterplot)
                .selectAll("text")
                .data(overlayData)
                .append("text")
                .attr("x", (d) => d.textX)
                .attr("y", (d) => d.textY)
                .attr("fill", "#ddd")
                .text((d) => d.text);

                areas = true;
        }
    }
</script>

<div class="vis-wrapper">
    <svg bind:this={scatterplot} id="scatter-vis" {width} {height}>
        <line
            x1={margin}
            y1={height - margin}
            x2={width}
            y2={0}
            stroke="#999"
            stroke-dasharray="10,10"
            stroke-width="3"
        />
    </svg>
    <Details {focus} />
    <button on:click={toggleOverlay}>yeah</button>
</div>

<style>
    .vis-wrapper {
        display: flex;
        gap: 25px;
    }

    svg {
        margin: 20px;
    }
</style>
