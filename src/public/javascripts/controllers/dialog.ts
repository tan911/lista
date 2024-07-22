export abstract class Dialog {
    public abstract open(): void
    public abstract close(): void
    public abstract closeByKey(event: KeyboardEvent): void
    public abstract openByKey(event: KeyboardEvent): void

    // https://zachpatrick.com/blog/how-to-trap-focus-inside-modal-to-make-it-ada-compliant
    public trapFocus(e: KeyboardEvent, modalId: string) {
        const isTabPressed = e.key === 'Tab'

        if (!isTabPressed) {
            return
        }

        const focusableElements =
            'button, [href], input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])'
        const modal = document.getElementById(modalId) as HTMLElement

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
