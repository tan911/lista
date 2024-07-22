export interface IToast {
    show: (message: string) => void
    hide: () => void
}

export class Toast {
    private toastEl: HTMLElement
    private timeoutId: number | null
    constructor(id: string) {
        this.timeoutId = null
        this.toastEl = document.getElementById(id) as HTMLElement
    }

    public show(message: string) {
        const spanEl = this.toastEl.querySelector('span')
        if (spanEl) {
            spanEl.textContent = message
        }
        this.toastEl.dataset.visible = 'visible'
        this.toastEl.classList.remove('invisible')
        this.toastEl.classList.add('visible')

        if (this.timeoutId !== null) {
            clearTimeout(this.timeoutId)
        }

        this.timeoutId = window.setTimeout(() => {
            this.hide()
            this.timeoutId = null
        }, 5000)
    }

    public hide() {
        this.toastEl.dataset.visible = 'hidden'
        this.toastEl.classList.remove('visible')
        this.toastEl.classList.add('invisible')
    }
}
