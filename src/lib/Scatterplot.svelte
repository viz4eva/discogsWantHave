<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import Details from "./Details.svelte";
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

    const width = 650;
    const height = width;
    const margin = width / 10;
    const textMargin = margin - 20;

    /**
     * @type {SVGSVGElement}
     */
    let scatterplot;

    let releases = data.items.map(
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
    /**
     * @type {any}
     */
    let focus;
    let maxWant = d3.max(
        releases.map(
            (
                /** @type {{ in_wantlist: number, in_collection: number; }} */ elem,
            ) => elem?.in_wantlist,
        ),
    );
    let maxHave = d3.max(
        releases.map(
            (
                /** @type {{ in_wantlist: number, in_collection: number; }} */ elem,
            ) => elem?.in_collection,
        ),
    );
    let xScale = d3.scaleLinear(
        [0, d3.max([maxWant, maxHave])],
        [margin, width - margin],
    );

    let yScale = d3.scaleLinear(
        [0, d3.max([maxWant, maxHave])],
        [height - margin, margin],
    );
    /**
     * @type {() => void}
     */
    let reset;

    function recalcVisUtils() {
        releases = data.items.map(
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
        maxWant = d3.max(
            releases.map(
                (
                    /** @type {{ in_wantlist: number, in_collection: number; }} */ elem,
                ) => elem?.in_wantlist,
            ),
        );
        maxHave = d3.max(
            releases.map(
                (
                    /** @type {{ in_wantlist: number, in_collection: number; }} */ elem,
                ) => elem?.in_collection,
            ),
        );

        xScale = d3.scaleLinear(
            [0, d3.max([maxWant, maxHave])],
            [margin, width - margin],
        );

        yScale = d3.scaleLinear(
            [0, d3.max([maxWant, maxHave])],
            [height - margin, margin],
        );
    }

    onMount(() => {
        buildScatter();
    });

    $: data, buildScatter();

    function buildScatter() {
        d3.select(scatterplot).selectAll("*").remove();
        recalcVisUtils();

        const zoom = d3.zoom().scaleExtent([0, 5]).on("zoom", zoomed);

        // @ts-ignore
        let xAxis = (g, x) =>
            g
                .attr("transform", `translate(0,${height - margin + 5})`)
                .call(d3.axisBottom(x).tickSize(-width).ticks(5))
                .call(
                    (
                        /** @type {{ select: (arg0: string) => { (): any; new (): any; attr: { (arg0: string, arg1: string): any; new (): any; }; }; }} */ g,
                    ) => g.select(".domain").attr("display", "none"),
                );

        // @ts-ignore
        let yAxis = (g, y) =>
            g
                .attr("transform", `translate(${margin - 5},0)`)
                .call(d3.axisLeft(y).tickSize(-height).ticks(5))
                .call(
                    (
                        /** @type {{ select: (arg0: string) => { (): any; new (): any; attr: { (arg0: string, arg1: string): any; new (): any; }; }; }} */ g,
                    ) => g.select(".domain").attr("display", "none"),
                );

        d3.select(scatterplot)
            .selectAll(".tick line")
            .attr("stroke", "#EBEBEB");

        //Axes labels
        d3.select(scatterplot)
            .append("text")
            .attr("text-anchor", "end")
            .attr("y", height - textMargin + 10)
            .attr("x", width - textMargin + 40)
            .attr("font-weight", "bolder")
            .text("Want");

        d3.select(scatterplot)
            .append("text")
            .attr("text-anchor", "end")
            .attr("y", textMargin)
            .attr("x", textMargin)
            .attr("font-weight", "bolder")
            .text("Have");

        const g = d3.select(scatterplot).append("g");
        const gx = d3.select(scatterplot).append("g");
        const gy = d3.select(scatterplot).append("g");

        const circles = g
            .selectAll("circle")
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
            .attr(
                "cx",
                (
                    /** @type {{ in_wantlist: any; in_collection: any; }} */ d,
                ) => {
                    if (d && d.in_wantlist != undefined) {
                        return xScale(d.in_wantlist);
                    }
                    return margin;
                },
            )
            .attr(
                "cy",
                (
                    /** @type {{ in_wantlist: any; in_collection: any; }} */ d,
                ) => {
                    if (d && d.in_collection != undefined) {
                        return yScale(d.in_collection);
                    }
                    return height - margin;
                },
            )
            .on("mouseover", (/** @type {any} */ e, /** @type {any} */ d) => {
                focus = d;
                d3.select(e.currentTarget).attr("r",10)
            })
            .on("mouseout", (/** @type {any} */ e, /** @type {any} */ d) => {
                d3.select(e.currentTarget).attr("r",7)
            })
            .transition()
            .duration(700)
            .attr("r", 6);

        let line = d3
            .select(scatterplot)
            .append("line")
            .attr("x1", margin)
            .attr("y1", height - margin)
            .attr("x2", width)
            .attr("y2", 0)
            .attr("stroke", "#999")
            .attr("stroke-dasharray", "10,10")
            .attr("stroke-width", 3);

        d3.select(scatterplot).call(zoom).call(zoom.transform, d3.zoomIdentity);

        // @ts-ignore
        function zoomed({ transform }) {
            if(sheet == 0) {
                const zx = transform
                .rescaleX(xScale)
                .interpolate(d3.interpolateRound);
            const zy = transform
                .rescaleY(yScale)
                .interpolate(d3.interpolateRound);
            g.attr("transform", transform);
            d3.selectAll("circle")
                .attr("r", 7 / transform.k)
                .attr("stroke-width", 1 / transform.k);
            line.attr("transform", transform).attr(
                "stroke-width",
                3 / transform.k,
            );
            gx.call(xAxis, zx);
            gy.call(yAxis, zy);

            }
            
        }

        reset = function () {
            d3.select(scatterplot)
                .transition()
                .duration(750)
                .call(zoom.transform, d3.zoomIdentity);
        };
    }

    function increaseSheet() {
        if(explorative) {
            d3.selectAll(".overlay").remove();
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

    const overlayData = [
        {
            x: margin,
            y: 0,
            width: width / 2 - margin + 10,
            height: height / 2 - 10,
            fill: "#00509d",
            textX: width * 0.25 - margin,
            textY: height * 0.25,
            text: "saturated",
        },
        {
            x: width / 2 + 10,
            y: 0,
            width: width / 2,
            height: height / 2 - 10,
            fill: "#ffd500",
            textX: width * 0.75 - margin,
            textY: height * 0.25,
            text: "popular",
        },
        {
            x: margin,
            y: height / 2 - 10,
            width: width / 2 - margin + 10,
            height: height / 2 - margin + 10,
            fill: "#ddd",
            textX: width * 0.25 - 20,
            textY: height * 0.75,
            text: "basic",
        },
        {
            x: width / 2 + 10,
            y: height / 2 - 10,
            width: width / 2,
            height: height / 2 - margin + 10,
            fill: "#eb5e28",
            textX: width * 0.75 - margin - 20,
            textY: height * 0.75,
            text: "super rare",
        },
    ];
    function toggleRectOverlay() {
        reset();
        const overlay = d3
            .select(scatterplot)
            .selectAll("rect")
            .data(overlayData)
            .join("rect")
            .classed("overlay", true)
            .attr("x", (/** @type {{ x: any; }} */ d) => d.x)
            .attr("y", (/** @type {{ y: any; }} */ d) => d.y)
            .attr("width", (/** @type {{ width: any; }} */ d) => d.width)
            .attr("height", (/** @type {{ height: any; }} */ d) => d.height)
            .attr("fill", (/** @type {any[]} */ d) => d.fill)
            .attr("opacity", 0.3);

        overlay.each(
            (
                /** @type {{ text: any; textX: any; textY: any; fill: any; }} */ elem,
            ) => {
                d3.select(scatterplot)
                    .append("text")
                    .text(elem.text)
                    .attr("x", elem.textX)
                    .attr("y", elem.textY)
                    .attr("fill", elem.fill)
                    .attr("stroke", "#777")
                    .attr("font-size", 45)
                    .attr("font-family", "monospace")
                    .classed("overlay", true);
            },
        );
    }

    const triangleOverlayData = [
        {
            path: `M ${margin} 0 L ${width} 0 L ${margin} ${height - margin} Z`,
            fill: "orange",
            text: "More people have it",
            textX: margin + 10,
            textY: 30,
        },
        {
            path: `M ${margin} ${height - margin} L ${width} ${height - margin} L${width} 0 Z`,
            fill: "blue",
            text: "More people want it",
            textX: width / 2 + 10,
            textY: height - margin - 10,
        },
    ];

    function toggleTriangleOverlay() {
        const overlay = d3
            .select(scatterplot)
            .selectAll("path")
            .data(triangleOverlayData)
            .join("path")
            .classed("overlay", true)
            .attr("d", (/** @type {{ path: any; }} */ d) => d.path)
            .attr("stroke", "none")
            .attr("fill", (/** @type {any[]} */ d) => d.fill)
            .attr("opacity", 0.2);

        overlay.each(
            (
                /** @type {{ text: any; textX: any; textY: any; fill: any; }} */ elem,
            ) => {
                d3.select(scatterplot)
                    .append("text")
                    .text(elem.text)
                    .attr("x", elem.textX)
                    .attr("y", elem.textY)
                    .attr("fill", elem.fill)
                    .attr("stroke", "#777")
                    .attr("font-size", 30)
                    .attr("font-family", "monospace")
                    .classed("overlay", true);
            },
        );
    }
</script>

<button on:click={reset}>Reset zoom</button>
<div class="vis-wrapper">
    <svg
        bind:this={scatterplot}
        id="scatter-vis"
        {width}
        {height}
        on:click={increaseSheet}
    >
    </svg>

    <div id="detail-section">
        <Details {focus} />
    </div>
</div>

<style>
    .vis-wrapper {
        display: flex;
        gap: 25px;
        padding-bottom: 100px;
    }

    svg {
        margin: 20px;
        cursor: pointer;
    }

    #detail-section {
        width: 15vw;
    }
</style>
