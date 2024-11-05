<script>
    // @ts-nocheck
    import scrollama from "scrollama";
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import Scatterplot from "./Scatterplot.svelte";
    import { jungle, rare, discoClassics } from "$lib/utils/utils.js";

    let main;
    let scrolly;
    let figure;
    let article;
    let step;
    let scroller;
    let sheet = 0;
    let selectedList = discoClassics;

    // kick things off
    onMount(() => {
        // using d3 for convenience
        main = d3.select("main");
        scrolly = main.select("#scrolly");
        figure = scrolly.select("figure");
        article = scrolly.select("article");
        step = article.selectAll(".step");

        // initialize the scrollama
        scroller = scrollama();
        init();
    });

    // generic window resize listener event
    function handleResize() {
        // 1. update height of step elements
        let stepH = Math.floor(window.innerHeight * 0.75);
        step.style("height", stepH + "px");

        let figureHeight = window.innerHeight / 2;
        let figureMarginTop = (window.innerHeight - figureHeight) / 2;

        figure
            .style("height", figureHeight + "px")
            .style("top", figureMarginTop + "px");

        // 3. tell scrollama to update new element dimensions
        scroller.resize();
    }

    // scrollama event handlers
    function handleStepEnter(response) {
        console.log(response);
        // response = { element, direction, index }

        // add color to current step only
        step.classed("is-active", function (d, i) {
            return i === response.index;
        });

        // update graphic based on step
        d3.selectAll(".overlay").remove();
        sheet = response.index;
    }

    function init() {
        // 1. force a resize on load to ensure proper dimensions are sent to scrollama
        handleResize();

        // 2. setup the scroller passing options
        // 		this will also initialize trigger observations
        // 3. bind scrollama event handlers (this can be chained like below)
        scroller
            .setup({
                step: "#scrolly article .step",
                offset: 0.5,
                debug: false,
            })
            .onStepEnter(handleStepEnter);
    }
</script>

<main>
    <section id="scrolly">
        <article>
            <div class="step" data-step="1">
                <p>
                    This scatterplot visualizes the correlation of Wants and
                    Haves for a selected user-created list Classic / 80s / Synth
                    Pop / Italo Disco.
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
                    We can see that this this list includes more releases with
                    Wants exceeding the Haves.
                </p>
            </div>
            <div class="step" data-step="3">
                <p>
                    Additionally, we could divide the space into different zones
                    that further exmplain the demand for the included releases.
                </p>
                <ul>
                    <li>Basic: wanted by few, owned by few</li>
                    <li>
                        Saturated: already in many collections but on few
                        want-lists
                    </li>
                    <li>Popular: Collected by many and still wanted by many</li>
                    <li>Super rare: owned by few, but wanted by many</li>
                </ul>
                <p>
                    In this collection we have an interesting, very saturated
                    outlier: It's Major Tom (Völlig losgelöst) by Peter
                    Schilling.
                </p>
            </div>
        </article>

        <figure>
            <Scatterplot data={selectedList} {sheet} explorative={false} />
        </figure>
    </section>

    <section id="outro"></section>
</main>

<style>
    #scrolly {
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        padding: 0;
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
        width: 100%;
        height: 100vh;
        margin-bottom: 300px;
        -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        z-index: 0;
    }

    .step {
        margin: 0 auto 2rem auto;
    }

    .step:last-child {
        margin-bottom: 0;
    }

    .step p {
        text-align: left;
        padding: 1rem;
        width: 200px;
        font-size: medium;
        padding-top: 50px;
    }
</style>
