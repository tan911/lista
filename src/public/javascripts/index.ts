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

function dialogEvents(event: Event) {
    const eventTarget = event.target as HTMLElement
    const isClickWithIn = eventTarget.closest('#btn-add-credit-modal-close')
    if (eventTarget.id === 'btn-add-credit-modal-open') {
        addCreditDialog.open()
    } else if (['btn-add-credit-modal-close'].includes(eventTarget.id) || isClickWithIn) {
        addCreditDialog.close()
        event.stopPropagation()
    } else if (eventTarget.id === 'btn-add-credit-modal-cancel') {
        addCreditDialog.cancel()
        event.stopPropagation()
    } else if (eventTarget.id === 'add-credit-modal') {
        addCreditDialog.close()
        event.stopPropagation()
    }
}

function dialogKeyEvents(e: KeyboardEvent) {
    addCreditDialog.closeByKey(e)
    addCreditDialog.openByKey(e)
}

function handleFormSubmit(e: Event) {
    e.preventDefault()
    addCreditDialog.action()
}

function navbarEvents(event: Event) {
    const eventTarget = event.target as HTMLElement
    if (['btn-nav-toggle', 'btn-nav-toggle-name', 'btn-nav-toggle-img'].includes(eventTarget.id)) {
        navbar.toggle()
    } else if (['btn-nav-close', 'overlay', 'btn-nav-close-name'].includes(eventTarget.id)) {
        navbar.collapse()
    }
}

addCreditOpenBtn.addEventListener('click', dialogEvents)
addCreditCloseBtn.addEventListener('click', dialogEvents)
addCreditCancelBtn.addEventListener('click', dialogEvents)
addCreditWindow.addEventListener('click', dialogEvents)
document.addEventListener('keydown', dialogKeyEvents)
addCreditForm.addEventListener('submit', handleFormSubmit)

navbarBtnOpen.addEventListener('click', navbarEvents)
navbarBtnClose.addEventListener('click', navbarEvents)
overlay.addEventListener('click', navbarEvents)

document.addEventListener('DOMContentLoaded', () => {
    console.log('--- page loaded ---')
    if (new URL(document.location.toString()).searchParams.get('show')) {
        addCreditDialog.open()
    }
})
