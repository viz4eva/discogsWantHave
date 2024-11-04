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
                <p>Generelle Erklärung Achsen und so weiter</p>
            </div>
            <div class="step" data-step="2">
                <p>Über und unter der Achse</p>
            </div>
            <div class="step" data-step="3">
                <p>Vier Zonen</p>
            </div>
        </article>

        <figure>
            <Scatterplot data={selectedList} {sheet} explorative={false}/>
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
        text-align: center;
        padding: 1rem;
        font-size: 1.25rem;
    }
</style>
