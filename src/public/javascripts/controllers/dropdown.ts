export class Dropdown {
    public element: HTMLElement
    constructor(id: string) {
        this.element = document.getElementById(id) as HTMLElement
    }

    private open() {}
}
