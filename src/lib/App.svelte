<script>
    import Scatterplot from "./Scatterplot.svelte"; 
    import { jungle, rare, discoClassics } from "$lib/utils/utils.js";
</script>

<p>Hello</p>

<Scatterplot data={jungle}/>
<Scatterplot data={rare}/>
<Scatterplot data={discoClassics}/>