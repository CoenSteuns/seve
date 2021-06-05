<script lang="ts">
    import Nav from "./Nav.svelte";
    import Content from "./Content-container.svelte";
    import { Router, Route } from "svelte-navigator";
    import Mandelbrot from "./content/Mandelbrot.svelte";
    import Julia from "./content/Julia.svelte";
    import NavSubject from "../utils/nav-data/Nav-subject";
    import NavLink from "../utils/nav-data/Nav-link";

    const navData: NavSubject[] = []; 
    
    const fractals2D: NavSubject = new NavSubject('2D Fractals');
    fractals2D.addLinks(
        new NavLink("Mandelbrot Set", "Mandelbrot"),
        new NavLink("Julia Set", "Julia")
    );

    navData.push(fractals2D);
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
