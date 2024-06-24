export function closeModalOverlay() {
    document.querySelector('.ac-modal-overlay')?.addEventListener('click', () => {
        window.history.back()
    })
}
