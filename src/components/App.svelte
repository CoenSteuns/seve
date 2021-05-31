<script>
    import Nav from './Nav.svelte';

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

<main />
    <Nav title="Seve" data={navData}></Nav>
<style>
</style>
