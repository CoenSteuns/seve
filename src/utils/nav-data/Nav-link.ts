export default class NavLink{
    private _title: string;
    private _url: string;

    public get title() {
        return this._title;
    }

    public get url() {
        return this._url;
    }

    constructor(title: string, url: string) {
        this._title = title;
        this._url = url;
    }
}