<script>
    // @ts-nocheck
    import scrollama from "scrollama";
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import Scatterplot from "./Scatterplot.svelte";
    import { jungle, rare, discoClassics } from "$lib/utils/utils.js";
    import { focus, sheet } from "./store";

    let main;
    let scrolly;
    let figure;
    let article;
    let step;
    let scroller;
    let selectedList = discoClassics;

    onMount(() => {
        //setup scrollytelling
        main = d3.select("main");
        scrolly = main.select("#scrolly");
        figure = scrolly.select("figure");
        article = scrolly.select("article");
        step = article.selectAll(".step");
        scroller = scrollama();
        init();
    });

    function handleResize() {
        let stepH = Math.floor(window.innerHeight * 0.75);
        step.style("height", stepH + "px");
        let figureHeight = window.innerHeight / 2;
        let figureMarginTop = window.innerHeight / 8;
        figure
            .style("height", figureHeight + "px")
            .style("top", figureMarginTop + "px");
        scroller.resize();
    }

    function handleStepEnter(response) {
        if (response.index != 2) {
            d3.selectAll(".triangle").attr("opacity", 0);
            d3.selectAll(".triangleText").attr("opacity", 0);
            d3.selectAll(".rectangle").attr("opacity", 0);
            d3.selectAll(".rectangleText").attr("opacity", 0);
        } else if (response.direction == "up") {
            focus.set({
                title: "init",
                in_wantlist: "init",
                in_collection: "init",
                uri: "init",
            });
        }
        sheet.set(response.index);
    }

    function handleStepExit(response) {
        if (response.index == 2 && response.direction === "down") {
            setTimeout(() => {
                sheet.set(0);
                d3.selectAll(".triangle").attr("opacity", 0);
                d3.selectAll(".triangleText").attr("opacity", 0);
                d3.selectAll(".rectangle").attr("opacity", 0);
                d3.selectAll(".rectangleText").attr("opacity", 0);
                focus.set({
                    title: "init",
                    in_wantlist: "init",
                    in_collection: "init",
                    uri: "init",
                });
            }, 300);
        }
    }

    function init() {
        handleResize();
        scroller
            .setup({
                step: "#scrolly article .step",
                offset: 0.7,
                debug: false,
            })
            .onStepEnter(handleStepEnter)
            .onStepExit(handleStepExit);
    }
</script>

<main>
    <section id="scrolly">
        <article>
            <div class="step" data-step="1">
                <p>
                    This scatterplot visualizes the correlation of Wants and
                    Haves for a selected user-created list <a
                        href="https://www.discogs.com/lists/Classics-80s-Synth-Pop-Italo-Disco/327384"
                        target="_blank"
                        >Classic / 80s / Synth Pop / Italo Disco</a
                    >.
                </p>
                <p>
                    Each dot represents a release. Those with many Wants are
                    drawn more towards the right, whereas those with many Haves
                    are drawn more towards the upper part of the plot.
                </p>
            </div>
            <div class="step" data-step="2">
                <p>
                    Consequently, the releases mapped above the line are more
                    owned than wanted. Those drawn below could collect more
                    Wants than Haves.
                </p>
                <p>
                    We can see that this list includes more releases with Wants
                    exceeding the Haves.
                </p>
            </div>
            <div class="step" data-step="3">
                <p>
                    Additionally, we could divide the space into different zones
                    that further exmplain the demand for the included releases.
                </p>
                <ul>
                    <li><span class="keyword">Basic:</span> wanted by few, owned by few</li>
                    <li>
                        <span class="keyword">Saturated:</span> already in many collections but on few
                        want-lists
                    </li>
                    <li><span class="keyword">Popular:</span> Collected by many and still wanted by many</li>
                    <li><span class="keyword">Super rare:</span> owned by few, but wanted by many</li>
                </ul>
                <p>
                    In this collection we have an interesting, very saturated
                    outlier: It's Major Tom (Völlig losgelöst) by Peter
                    Schilling.
                </p>
            </div>
        </article>

        <figure>
            <Scatterplot data={selectedList} explorative={false} />
        </figure>
    </section>
</main>

<style>
    #scrolly {
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        padding-left: 3rem;
    }

    #scrolly > * {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }

    article {
        position: relative;
        padding: 0 1rem;
        max-width: 20rem;
    }

    figure {
        position: -webkit-sticky;
        position: sticky;
        bottom: 0;
        width: 100%;
        margin-bottom: 300px;
        -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        z-index: 0;
        margin: 0;
    }

    .step {
        margin: 0 auto 2rem auto;
    }

    .step p {
        text-align: left;
        padding: 1rem;
        width: 200px;
        font-size: large;
        padding-top: 50px;
    }

    .keyword {
        font-weight: bolder;
        font-size: large;
    }
</style>
