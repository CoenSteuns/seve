import type NavLink from "./Nav-link";

export default class NavSubject{
    private _title: string;
    private _links: NavLink[];

    public get title() {
        return this._title;
    }

    public get links() {
        return this._links;
    }

    constructor(title: string){
        this._title = title;
        this._links = [];
    }

    public addLinks(... links: NavLink[]){
        this._links.push(...links);
    }

}