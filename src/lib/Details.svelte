<script>
    export let focus;
</script>

<div class="detail-section">
    <h3>{focus.title}</h3>
    Want: {focus.in_wantlist} <br>
    Have: {focus.in_collection} <br><br>
   <a href={focus.uri} target="_blank">Check it out on Discogs</a>
</div>