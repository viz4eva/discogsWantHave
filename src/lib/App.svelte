<script>
    import Scatterplot from "./Scatterplot.svelte"; 
    import { jungle, rare, discoClassics } from "$lib/utils/utils.js";

    let selectedList = discoClassics;
</script>

<h3>Discogs Most Wanted</h3>

<select bind:value={selectedList}>
    <option value={jungle}>{jungle.name}</option>
    <option value={rare}>{rare.name}</option>
    <option value={discoClassics}>{discoClassics.name}</option>
</select>

<Scatterplot data={selectedList}/>
