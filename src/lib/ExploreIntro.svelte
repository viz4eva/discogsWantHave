<script>
    import Scatterplot from "./Scatterplot.svelte";
    import { jungle, rare, discoClassics } from "$lib/utils/utils.js";

    let selectedList = rare;
</script>

<div id="explore">
    <img
        src="2d_rare.gif"
        alt="spinning record with rare written on the label"
        width="50%"
        class="lower-record-right"
        style="margin-left:50vw;margin-top:200px;"
    />

    <div>
        <p>
            Now that you know how this visualiuation works, you can explore
            different other user-created lists published on Discgos. This first
            selected example list is called <a href="https://www.discogs.com/lists/439152" target="_blank">rare + played by great djs!</a>. And
            indeed, most releases in there have many more Wants than Haves. We
            can see quite a few super rare outliers.
        </p>
        <p>
            Click anywhere in the chart to display the explaning overlays from
            earlier.
        </p>
    </div>

    <img
        src="2d_hihi.gif"
        alt="spinning record with a smiley face on the label"
        width="30%"
        class="lower-record-left"
        style="margin-left:50vw;"
    />
</div>

<select bind:value={selectedList}>
    <option value={discoClassics}>{discoClassics.name}</option>
    <option value={jungle}>{jungle.name}</option>
    <option value={rare}>{rare.name}</option>
</select>
<Scatterplot data={selectedList} explorative={true} />

<style>
    #explore {
        width: 50vw;
        text-align: justify;
        font-size: large;
        margin: 5vh;
    }

    p {
        line-height: 2rem;
    }

    select {
        border: 1px solid #777;
        border-radius: 10px;
        padding: 10px;
        background: rgb(247, 249, 223);
    }
</style>