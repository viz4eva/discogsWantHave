<script>
    export let focus;
</script>

<div class="detail-section">
    {#if focus}
    <h3>{focus.title}</h3>
    <span class="bold">Want:</span> {focus.in_wantlist} <br>
    <span class="bold">Have:</span> {focus.in_collection} <br><br>
   <a href={focus.uri} target="_blank" class="bold">Check it out on Discogs</a>
   {:else}
   <p>Hover over a dot to see the respective release</p>
   {/if}
</div>

<style>
    .detail-section {
        background-color: aliceblue;
        padding: 30px;
        border-radius: 10px;
    }

    .bold {
        font-weight: 700;
    }

    a {
        text-decoration: none;
        cursor: pointer;
    }
</style>