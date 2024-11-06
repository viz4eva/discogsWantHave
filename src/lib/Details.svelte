<script>
    export let focus;
</script>

<div class="detail-section">
    {#if focus}
        <h3>{focus.title}</h3>
        <span class="bold">Want:</span>
        {focus.in_wantlist} <br />
        <span class="bold">Have:</span>
        {focus.in_collection} <br /><br />
        <a href={focus.uri} target="_blank" class="bold"
            >Check it out on Discogs</a
        >
    {:else}
        <p>Hover over a dot to see the respective release</p>
    {/if}
</div>

<style>
    .detail-section {
        padding: 20px;
        border-radius: 10px;
        border: 1px solid #777;
        background: rgb(248,254,197);
        background: radial-gradient(circle, rgba(248,254,197,1) 0%, rgb(252, 245, 245) 100%); 
        font-size: medium;
    }

    .bold {
        font-weight: 700;
    }

    a {
        text-decoration: none;
        cursor: pointer;
    }
</style>
