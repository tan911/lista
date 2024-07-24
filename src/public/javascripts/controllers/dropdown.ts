export class Dropdown {
    public button: HTMLElement
    private menu: HTMLElement
    private outside: (e: Event) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
    constructor(id: string) {
        this.button = document.getElementById(id) as HTMLElement
        this.menu = document.getElementById(`${id}-dropdown-menu`) as HTMLElement
        if (this.button) {
            this.button.onclick = this.toggle.bind(this)
        }
        this.outside = (e: Event) => {
            const target = e.target as HTMLElement

            if (
                target !== this.menu &&
                target !== this.button &&
                !this.menu.contains(target) &&
                !this.button.contains(target)
            ) {
                this.hide()
            }
        }
    }

    public hide() {
        this.button.setAttribute('data-visible', 'show')
        this.button.setAttribute('aria-expanded', 'false')
        this.menu.classList.remove('translate-y-0', 'opacity-100')
        this.menu.classList.add('invisible', 'opacity-0', 'translate-y-[-20px]')

        document.removeEventListener('click', this.outside)
    }

    public show() {
        this.button.setAttribute('data-visible', 'hide')
        this.button.setAttribute('aria-expanded', 'true')
        this.menu.classList.remove('invisible', 'opacity-0', 'translate-y-[-20px]')
        this.menu.classList.add('translate-y-0', 'opacity-100')

        document.addEventListener('click', this.outside)
    }

    private toggle(event: Event) {
        const targetEl = event.target as HTMLElement
        const action = targetEl.dataset.visible

        if (action) {
            this[action]()
        }
    }
}
