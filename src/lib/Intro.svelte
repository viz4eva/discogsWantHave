<img src="schrift.gif" alt="Heading" width="50%" id="heading" />
<div id="intro">
    <div class="two-col">
        <img
            src="2d comic.gif"
            alt="spinning record with disco written on the label"
            width="100%"
            class="record-right"
            style="margin-top:10vh"
        />
        <div>
            <p>
                <a href="https://www.discogs.com/" target="_blank">Discogs</a> is
                a free, community-based data base for discographies and trading platform
                for records. It gives members the opportunity to mark the records
                they own on a Have-List and those they would like to own on a Want-List.
            </p>
            <p>
                This data gives insights on how much sought-after releases are
                within the Discogs community: Those which many collectors want
                but few already own can definitely be described as rare. But
                there might be also those, which many collectors already have
                and few still want and other flavours of demand.
            </p>
            <p id="scrollmessage">Scroll down to have a look!</p>
        </div>
    </div>

    <img
        src="2d_hihi.gif"
        alt="spinning record with a smiley face on the label"
        width="20%"
        class="record-left"
        style="margin-left:20%"
    />
</div>

<style>
     #intro {
        width: 80vw;
        text-align: justify;
        font-size: large;
        margin-bottom: 30vh;
    }

    .two-col {
        display: grid;
        grid-template-columns: 40% 60%;
    }

    #scrollmessage {
        text-align: center;
        padding-top: 1rem;
        font-size: medium;
        animation: hoverUpDown 3s ease-in-out infinite;
    }

    @keyframes hoverUpDown {
        0%,
        100% {
            transform: translateY(-10px);
            color: rgb(255, 214, 214);
        }
        50% {
            transform: translateY(0);
            color: rgb(241, 115, 115);
        }
    }

    #heading {
        margin-left: 10vw;
    }

    p {
        line-height: 2rem;
    }
</style>