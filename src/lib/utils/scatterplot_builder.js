// @ts-nocheck
import { width, height, margin, textMargin, triangleOverlayData, rectOverlayData } from './vis_utils';
import * as d3 from "d3";
import { focus } from "../store";

let maxWant;
let maxHave;
let xScale;
let yScale;
let releases;

function recalcVisUtils(data) {
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

export const buildScatter = (scatterplot, data, buttonSection) => {
    d3.select(scatterplot).selectAll("*").remove();
    recalcVisUtils(data);

    const triangleOverlay = d3
        .select(scatterplot)
        .selectAll("polygon")
        .data(triangleOverlayData)
        .join("polygon")
        .classed("triangle", true)
        .attr("points", (/** @type {{ path: any; }} */ d) => d.path)
        .attr("stroke", "none")
        .attr("fill", (/** @type {any[]} */ d) => d.fill)
        .attr("opacity", 0);

    triangleOverlay.each(
        (
            /** @type {{ text: any; textX: any; textY: any; fill: any; }} */ elem,
        ) => {
            d3.select(scatterplot)
                .append("text")
                .text(elem.text)
                .classed("triangleText", true)
                .attr("x", elem.textX)
                .attr("y", elem.textY)
                .attr("fill", elem.fill)
                .attr("stroke", "black")
                .attr("font-size", 20)
                .attr("font-family", "monospace")
                .attr("opacity", 0);
        },
    );

    const rectOverlay = d3
        .select(scatterplot)
        .selectAll("rect")
        .data(rectOverlayData)
        .join("rect")
        .classed("rectangle", true)
        .attr("x", (/** @type {{ x: any; }} */ d) => d.x)
        .attr("y", (/** @type {{ y: any; }} */ d) => d.y)
        .attr("width", (/** @type {{ width: any; }} */ d) => d.width)
        .attr("height", (/** @type {{ height: any; }} */ d) => d.height)
        .attr("fill", (/** @type {any[]} */ d) => d.fill)
        .attr("opacity", 0);

    rectOverlay.each(
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
                .classed("rectangleText", true)
                .attr("opacity", 0);
        },
    );

    const zoom = d3.zoom().scaleExtent([0, 50]).on("zoom", zoomed);

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
        .attr("x", width - textMargin + 20)
        .attr("font-weight", "bolder")
        .text("Want");

    d3.select(scatterplot)
        .append("text")
        .attr("text-anchor", "end")
        .attr("y", textMargin)
        .attr("x", textMargin + 19)
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
                        return "#FFAE85";
                    }
                    return "#1C29E1";
                }
            },
        )
        .attr("opacity", 0.7)
        .attr("stroke", "black")
        .attr("stroke-width", 2)
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
            focus.set(d);
            d3.select(e.currentTarget).attr("fill", "grey");
        })
        .on("mouseout", (/** @type {any} */ e, /** @type {any} */ d) => {
            d3.select(e.currentTarget).attr("fill", (
                /** @type {{ in_wantlist: any; in_collection: any; }} */ d,
            ) => {
                if (d) {
                    if (d.in_wantlist <= d.in_collection) {
                        return "#FFAE85";
                    }
                    return "#1C29E1";
                }
            });
        })
        .transition()
        .duration(900)
        .attr("r", 7);

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

    d3.select(scatterplot)
        .call(zoom)
        .call(zoom.transform, d3.zoomIdentity)
        .on("wheel.zoom", null)
        .on("dblclick.zoom", null)
        .on("touchmove.zoom", null);

    // @ts-ignore
    function zoomed({ transform }) {

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

    let reset = function () {
        d3.select(scatterplot)
            .transition()
            .duration(300)
            .call(zoom.transform, d3.zoomIdentity);
    };

    let zoomIn = function () {
        zoom.scaleBy(d3.select(scatterplot), 2, [margin, height - margin]);
    };

    let zoomOut = function () {
        zoom.scaleBy(d3.select(scatterplot), 0.5, [
            margin,
            height - margin,
        ]);
    };

    const buttonStyle = "border: 1px solid #777;border-radius: 10px;padding: 10px;background: rgb(247, 250, 214);margin-right:5px;margin-bottom:10px;";

    d3.select(buttonSection).selectAll("button").remove();
    d3.select(buttonSection).append("button").text("+").attr("style", buttonStyle).on("click", zoomIn);
    d3.select(buttonSection).append("button").text("-").attr("style", buttonStyle).on("click", zoomOut);
    d3.select(buttonSection).append("button").text("Reset zoom").attr("style", buttonStyle).on("click", reset);
};