<script>
    import Nav from "./Nav.svelte";
    import Content from './Content-container.svelte'
    import { Router, Route } from "svelte-navigator";

    const navData = [
        {
            title: "2D Fractals",
            links: [
                { title: "Mandlebrot set", url: "Mandelbrot" },
                { title: "Julia set", url: "Julia" },
                { title: "Tree", url: "Tree" },
            ],
        },
        {
            title: "Path Finding Algorithms",
            links: [{ title: "A Star", url: "Astar" }],
        },
    ];
</script>

<Router>
    <Nav title="Seve" data={navData} />
    <Content>
        <Route path="Mandelbrot"><h1>mandelbrot</h1></Route>
    </Content>
    
</Router>
<style>
</style>
