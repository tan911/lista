import { z } from 'zod'
import { getInputData } from '../inputs/add-credit'
import { inputSchema, inputFieldSchema, InputSchema } from '../../../../lib/schema'

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

export class AddCredit extends Dialog {
    public modalId: string
    private dialogEl: HTMLDialogElement

    constructor(modalId: string) {
        super()
        this.modalId = modalId
        this.dialogEl = document.getElementById(this.modalId) as HTMLDialogElement
    }

    public open() {
        document.addEventListener('keydown', (e) => {
            this.trapFocus(e, this.modalId)
        })

        this.dialogEl.classList.add('flex', 'items-center', 'justify-center')
        this.dialogEl.showModal()

        if (new URL(document.location.toString()).searchParams.get('show')) {
            return
        } else {
            history.pushState({}, 'modal-open', `${window.location.href}/add-credit?show=true`)
        }
    }

    public close() {
        document.removeEventListener('keydown', (e) => {
            this.trapFocus(e, this.modalId)
        })

        this.dialogEl.classList.remove('flex', 'items-center', 'justify-center')
        this.dialogEl.close()

        const paths = document.location.pathname.split('/')
        const hasMainPath =
            paths[paths.length - 2] === 'dashboard'
                ? 'dashboard'
                : `dashboard/${paths[paths.length - 2]}`

        window.history.replaceState({}, '', `${document.location.origin}/${hasMainPath}`)
    }

    public closeByKey(event: KeyboardEvent) {
        const params = new URL(document.location.toString()).searchParams
        if (event.key === 'Escape' && params.get('show')) {
            this.close()
        }
    }

    public openByKey(event: KeyboardEvent) {
        const params = new URL(document.location.toString()).searchParams
        if (event.ctrlKey && event.key === 'm') {
            if (params.get('show')) {
                return
            }
            this.open()
        }
    }

    public cancel() {
        document.body.querySelectorAll('div[data-container]').forEach((element) => {
            const inputEl = element.querySelector('input')
            const spanEl = element.querySelector('span')

            if (inputEl && spanEl) {
                inputEl.classList.remove('ac-input-error')
                spanEl.classList.add('hidden')
                inputEl.value = ''
            }
        })

        this.close()
    }

    public async action() {
        const inputData = await getInputData()
        const validateInputs = await inputSchema.safeParseAsync(inputData)

        try {
            let issues: z.ZodIssue[]

            if (!validateInputs.success) {
                issues = validateInputs.error.issues

                issues.map((issue) => {
                    const inputEl = document.getElementById(
                        issue.path[0] as string
                    ) as HTMLInputElement
                    const spanEl = document.getElementById(`${issue.path[0]}-error-message`)

                    if (inputEl && spanEl) {
                        inputEl.addEventListener('input', () => {
                            const fieldName = issue.path[0] as keyof InputSchema
                            const inputField = inputFieldSchema(fieldName, inputEl.value)

                            if (inputField.success) {
                                inputEl.classList.remove('ac-input-error')
                                spanEl.classList.add('hidden')
                                spanEl.textContent = ''
                            } else {
                                inputEl.classList.add('ac-input-error')
                                spanEl.classList.remove('hidden')
                                spanEl.textContent = inputField.error.issues[0].message
                            }
                        })

                        inputEl.classList.add('ac-input-error')
                        spanEl.classList.remove('hidden')
                        spanEl.textContent = issue.message
                    }
                })

                throw validateInputs
            } else {
                // TODOS:
                // ACTION THAT SEND DATA TO SERVER
                console.log(validateInputs)
            }
        } catch (error) {
            console.log('err')
        }
    }
}
