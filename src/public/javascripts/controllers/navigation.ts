export class NavigationBar {
    public navId: string
    public navEl: HTMLElement
    constructor(navId: string) {
        this.navId = navId
        this.navEl = document.getElementById(navId) as HTMLElement
    }

    public collapse() {
        const btn = document.getElementById('btn-nav-toggle')
        const overlay = document.getElementById('overlay')

        if (btn && overlay) {
            btn.setAttribute('aria-expanded', 'false')
            this.navEl.setAttribute('data-visible', 'false')
            this.navEl.classList.remove('left-0')
            this.navEl.classList.add('left-[-1000px]')
            overlay.classList.remove('visible', 'opacity-100')
            overlay.classList.add('opacity-0', 'invisible')
        }
    }

    public expand() {
        const btn = document.getElementById('btn-nav-toggle')
        const overlay = document.getElementById('overlay')

        if (btn && overlay) {
            btn.setAttribute('aria-expanded', 'true')
            this.navEl.setAttribute('data-visible', 'true')
            this.navEl.classList.remove('left-[-1000px]')
            this.navEl.classList.add('left-0')
            overlay.classList.remove('invisible', 'opacity-0')
            overlay.classList.add('visible', 'opacity-100')
        }
    }

    public toggle() {
        const isShow = this.navEl.getAttribute('data-visible') as string

        if (String(isShow) === 'false') {
            this.expand()
        } else {
            this.collapse()
        }
    }
}
