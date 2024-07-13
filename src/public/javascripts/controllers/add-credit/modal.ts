import { z } from 'zod'
import { getInputData } from '../../inputs/add-credit'
import { inputSchema, inputFieldSchema, InputSchema } from '../../../../../lib/schema'
import { Dialog } from '../dialog'
import { Button } from '../button'
import { DialogButton } from './button'

export class CreditModal extends Dialog {
    private dialogEl: HTMLDialogElement
    private button: Button;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any

    constructor(public modalId: string) {
        super()
        this.onPageLoad()
        this.dialogEl = document.getElementById(this.modalId) as HTMLDialogElement
        this.button = new DialogButton('btn-add-credit-modal-open', this)
        this.modalId = modalId
        this.dialogEl.onclick = this.onEvent.bind(this)
    }

    public open() {
        document.addEventListener('keydown', (e) => {
            this.trapFocus(e, this.modalId)
        })

        this.dialogEl?.classList.add('flex', 'items-center', 'justify-center')
        this.dialogEl?.showModal()

        if (new URL(document.location.toString()).searchParams.get('show')) {
            return
        } else {
            history.pushState({}, '', `${window.location.href}/add-credit?show=true`)
        }
    }

    public close() {
        document.removeEventListener('keydown', (e) => {
            this.trapFocus(e, this.modalId)
        })

        this.dialogEl?.classList.remove('flex', 'items-center', 'justify-center')
        this.dialogEl?.close()

        const paths = document.location.pathname.split('/')
        const secondLastRoutes = paths[paths.length - 2]

        const hasMainPath = ['customers', 'transactions'].includes(secondLastRoutes)
            ? `web/dashboard/${secondLastRoutes}`
            : `web/dashboard`

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

    public async add() {
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

    public onEvent(event: Event) {
        const targetEl = event.target as HTMLElement

        const isClickWithInButton = targetEl.closest('#btn-add-credit-modal-close')
        const isClickOutsideTheWindow = targetEl.id === this.modalId
        const action = targetEl.dataset.action as string

        if (action) {
            this[action]()
        } else {
            if (isClickWithInButton || isClickOutsideTheWindow) {
                this.close()
            }
        }
    }

    public onPageLoad() {
        document.addEventListener('DOMContentLoaded', () => {
            document.addEventListener('keydown', (event) => {
                this.closeByKey(event)
                this.openByKey(event)
            })

            if (new URL(document.location.toString()).searchParams.get('show')) {
                this.open()
            }
        })
    }
}
