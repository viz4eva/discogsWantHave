<script>
    export let focus;
</script>

<div class="detail-section">
    <h3>{focus.title}</h3>
    <span class="bold">Want:</span> {focus.in_wantlist} <br>
    <span class="bold">Have:</span> {focus.in_collection} <br><br>
   <a href={focus.uri} target="_blank" class="bold">Check it out on Discogs</a>
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