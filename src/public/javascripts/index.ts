import * as index from './dialog'
const addCreditDialog = new index.Dialog('add-credit-modal')
const addCreditOpenBtn = document.getElementById('btn-add-credit-modal-open') as HTMLElement
const addCreditCloseBtn = document.getElementById('btn-add-credit-modal-close') as HTMLElement

addCreditOpenBtn.addEventListener('click', () => {
    document.addEventListener('keydown', (e) => {
        addCreditDialog.trapFocus(e)
    })
    addCreditDialog.open()
})
addCreditCloseBtn.addEventListener('click', () => {
    addCreditDialog.close()
    document.removeEventListener('keydown', (e) => {
        addCreditDialog.trapFocus(e)
    })
})

document.addEventListener('keydown', (e) => {
    addCreditDialog.closeWithKeyboard(e)
    addCreditDialog.openWithKeyboard(e)
})
