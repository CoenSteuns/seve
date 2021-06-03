import type NavLink from "./Nav-link";

export default class NavSubject{
    private title: string;
    private links: NavLink[];

    constructor(title: string){
        this.title = title;
        this.links = [];
    }

    public addLinks(... links: NavLink[]): void{
        this.links.push(...links);
    }

}