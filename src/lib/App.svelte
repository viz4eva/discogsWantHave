<script>
    import Scatterplot from "./Scatterplot.svelte";
    import { jungle, rare, discoClassics } from "$lib/utils/utils.js";
    import Scrolltest from "./Scrolltest.svelte";

    let selectedList = discoClassics;
</script>

<h3>Discogs Most Wanted</h3>

<div id="intro">
    <p>
        <a href="https://www.discogs.com/" target="_blank">Discogs</a> is a free,
        community-based data base for discographies and trading platform for records.
        It gives members the opportunity to mark the records they own and those they
        would like to own. This data gives insights on which are releases are rare
        within the Discogs community: those who many collectors want, but few already
        own. And which are owned by many but on few people's wantlist.
    </p>

    <p>
        This scatter plot visualization shows the correlations of want and have
        for the records from a selection of three user-generated release lists.
        Hover over a circle to see which release is represented by it.
    </p>
</div>

<select bind:value={selectedList}>
    <option value={discoClassics}>{discoClassics.name}</option>
    <option value={jungle}>{jungle.name}</option>
    <option value={rare}>{rare.name}</option>
</select>

<Scatterplot data={selectedList} />

<p>
    Data Source: <a href="https://www.discogs.com/developers/#" target="_blank"
        >Discogs API</a
    >
</p>

<Scrolltest/>

<style>
    #intro {
        width: 50vw;
        text-align: justify;
    }

    select {
        border: none;
        border-radius: 10px;
        padding: 10px;
        background-color: rgb(232, 241, 241);
    }
</style>
