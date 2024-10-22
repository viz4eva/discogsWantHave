<script>
    import Scatterplot from "./Scatterplot.svelte"; 
    import { jungle, rare, discoClassics } from "$lib/utils/utils.js";
</script>

<h3>Discogs Most Wanted</h3>

<Scatterplot data={jungle}/>
<Scatterplot data={rare}/>
<Scatterplot data={discoClassics}/>