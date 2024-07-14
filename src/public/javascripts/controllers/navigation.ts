export class NavigationBar {
    public navId: string
    public navEl: HTMLElement
    private overlay = document.getElementById('overlay') as HTMLElement
    private sidebarEl = document.getElementById('nav-list-cta') as HTMLElement
    private navbarBtnEl = document.getElementById('btn-nav-toggle') as HTMLElement;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any

    constructor(navId: string) {
        this.onCickOutside()
        this.navId = navId
        this.navEl = document.getElementById(this.navId) as HTMLElement
        if (this.navEl) {
            this.navEl.onclick = this.toggle.bind(this)
        }
    }

    public collapse() {
        if (this.navbarBtnEl && this.overlay) {
            this.navbarBtnEl.setAttribute('aria-expanded', 'false')
            this.sidebarEl.setAttribute('data-visible', 'false')
            this.sidebarEl.classList.remove('left-0')
            this.sidebarEl.classList.add('left-[-1000px]')
            this.overlay.classList.remove('visible', 'opacity-100')
            this.overlay.classList.add('opacity-0', 'invisible')
        }
    }

    public expand() {
        if (this.navbarBtnEl && this.overlay) {
            this.navbarBtnEl.setAttribute('aria-expanded', 'true')
            this.sidebarEl.setAttribute('data-visible', 'true')
            this.sidebarEl.classList.remove('left-[-1000px]')
            this.sidebarEl.classList.add('left-0')
            this.overlay.classList.remove('invisible', 'opacity-0')
            this.overlay.classList.add('visible', 'opacity-100')
        }
    }

    public toggle(event: Event) {
        const targetEl = event.target as HTMLElement
        const action = targetEl.dataset.toggle

        if (action) {
            this[action]()
        }
    }

    public onCickOutside() {
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.collapse())
        }
    }
}
