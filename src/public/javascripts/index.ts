import { AddCredit } from './controllers/dialog'
import { NavigationBar } from './controllers/navigation'

const addCreditDialog = new AddCredit('add-credit-modal')
const navbar = new NavigationBar('nav-list-cta')
const addCreditOpenBtn = document.getElementById('btn-add-credit-modal-open') as HTMLElement
const addCreditCloseBtn = document.getElementById('btn-add-credit-modal-close') as HTMLElement
const addCreditCancelBtn = document.getElementById('btn-add-credit-modal-cancel') as HTMLElement
const addCreditForm = document.getElementById('add-credit-form') as HTMLElement
const addCreditWindow = document.getElementById('add-credit-modal') as HTMLElement
const navbarBtnOpen = document.getElementById('btn-nav-toggle') as HTMLElement
const navbarBtnClose = document.getElementById('btn-nav-close') as HTMLElement
const overlay = document.getElementById('overlay') as HTMLElement

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

addCreditForm.addEventListener('submit', (e) => {
    e.preventDefault()
    addCreditDialog.action()
})

addCreditWindow.addEventListener('click', (e: MouseEvent) => {
    if ((e.target as HTMLElement).id === 'add-credit-modal') {
        addCreditDialog.close()
    }
})

navbarBtnOpen.addEventListener('click', () => {
    navbar.toggle()
})

navbarBtnClose.addEventListener('click', () => {
    navbar.collapse()
})

overlay.addEventListener('click', () => {
    navbar.collapse()
})

document.addEventListener('DOMContentLoaded', () => {
    console.log('--- page loaded ---')
    if (new URL(document.location.toString()).searchParams.get('show')) {
        addCreditDialog.open()
    }
})
