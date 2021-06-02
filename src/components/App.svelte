<script>
    import Nav from "./Nav.svelte";
    import Content from "./Content-container.svelte";
    import { Router, Route } from "svelte-navigator";
    import Mandelbrot from "./content/Mandelbrot.svelte";
    import Julia from "./content/Julia.svelte";

    const navData = [
        {
            title: "2D Fractals",
            links: [
                { title: "Mandlebrot set", url: "Mandelbrot" },
                { title: "Julia set", url: "Julia" },
                // { title: "Tree", url: "Tree" },
            ],
        },
        // {
        //     title: "Path Finding Algorithms",
        //     links: [{ title: "A Star", url: "Astar" }],
        // },
    ];
</script>

<Router>
    <Nav title="Seve" data={navData} />
    <Content>
        <Route primary={false} path="Mandelbrot"><Mandelbrot /></Route>
        <Route primary={false} path="Julia"><Julia /></Route>
    </Content>
</Router>

<style>
</style>
