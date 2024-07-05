import { AddCredit } from './dialog'

const addCreditDialog = new AddCredit('add-credit-modal')
const addCreditOpenBtn = document.getElementById('btn-add-credit-modal-open') as HTMLElement
const addCreditCloseBtn = document.getElementById('btn-add-credit-modal-close') as HTMLElement
const addCreditCancelBtn = document.getElementById('btn-add-credit-modal-cancel') as HTMLElement
const addCreditForm = document.getElementById('add-credit-form')

addCreditOpenBtn.addEventListener('click', () => {
    addCreditDialog.open()
})

addCreditCloseBtn.addEventListener('click', () => {
    addCreditDialog.close()
})

addCreditCancelBtn.addEventListener('click', () => {
    addCreditDialog.cancel()
})

document.addEventListener('keydown', (e) => {
    addCreditDialog.closeByKey(e)
    addCreditDialog.openByKey(e)
})

addCreditForm?.addEventListener('submit', (e) => {
    e.preventDefault()
    addCreditDialog.action()
})

document.addEventListener('DOMContentLoaded', () => {
    console.log('page loaded')
    if (new URL(document.location.toString()).searchParams.get('show')) {
        addCreditDialog.open()
    }
})
