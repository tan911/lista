export class Dialog {
    private url: URL = new URL(window.location.toString())
    private dialogList: string[] = ['add-credit']

    constructor(public modalId: string) {}

    public open() {
        const dialog = document.getElementById(this.modalId) as HTMLDialogElement
        dialog.classList.add('flex', 'items-center', 'justify-center')
        dialog.showModal()
        history.pushState({}, 'modal-open', `${window.location.href}/add-credit?show=true`)
    }

    public close() {
        const dialog = document.getElementById(this.modalId) as HTMLDialogElement
        dialog.classList.remove('flex', 'items-center', 'justify-center')
        dialog.close('close modal')
        window.history.go(-1)
    }

    public openWithKeyboard(event: KeyboardEvent) {
        const path = this.url.pathname.substring(this.url.pathname.lastIndexOf('/') + 1)
        const name = path.split('?').join(' ')

        if (event.ctrlKey && event.key === 'm') {
            if (this.dialogList.includes(name) && this.url.searchParams.get('show')) {
                return
            }
            this.open()
        }
    }

    public closeWithKeyboard(event: KeyboardEvent) {
        console.log(this.url)
        console.log(window.location)
        if (event.key === 'Escape' && this.url.searchParams.get('show')) {
            this.close()
        }
    }

    // https://zachpatrick.com/blog/how-to-trap-focus-inside-modal-to-make-it-ada-compliant
    public trapFocus(e: KeyboardEvent) {
        const isTabPressed = e.key === 'Tab'

        if (!isTabPressed) {
            return
        }
        const focusableElements =
            'button, [href], input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])'
        const modal = document.getElementById(this.modalId) as HTMLElement

        // get focusable elements in modal
        const firstFocusableElement = modal.querySelectorAll(focusableElements)[0] as HTMLElement
        const focusableContent = modal.querySelectorAll(focusableElements)
        const lastFocusableElement = focusableContent[focusableContent.length - 1] as HTMLElement

        if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus()
                e.preventDefault()
            }
        } else if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus()
            e.preventDefault()
        }
    }
}
