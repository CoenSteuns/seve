<script>
import { each } from "svelte/internal";


    export let title;
    export let data;
</script>
<nav class="nav-sidebar">
    <h1 class="nav-title">{title}</h1>
    {#each data as head}
    <div class="nav-division">
        <h2 class="nav-division-title">{head.title}</h2>
        <li class="nav-division-link-list">
            {#each head.links as link}
            <a
            href={link.url}
            class="nav-linker">
            <ul class={`nav-division-link`}>
                {link.title}
            </ul>
        </a>
            {/each}
        </li>
    </div>
    {/each}
</nav>
<style>
    .nav-sidebar{
    position: fixed;
    width: 250px;
    height: 100vh;

    background-color: rgb(21, 22, 92);
    color: white;

    -webkit-box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.37); 
    box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.37);

    display: flex;
    flex-direction: column;
}

.nav-title{
    width: 100%;
    text-align: center;
}

.nav-division{
    margin: 0 auto;
    margin-bottom: 20px;
    width: 80%;
}

.nav-division-title{
    

    font-weight: bold;
    font-size: 1rem;

    margin: 0;
}

.nav-division-link-list{
    list-style: none;
    width: 100%;
    
}

.nav-division-link{
    padding-left: 15px;
    margin: 0;

    color: white;
    text-decoration: none;

    
}

.nav-division-link:hover{
    cursor: pointer;
    text-decoration: underline;
}

.nav-linker{
    text-decoration: none;
}

.nav-current-route{
    text-decoration: underline;
}


</style>