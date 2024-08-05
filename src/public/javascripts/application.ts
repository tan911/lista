import { Application } from '@hotwired/stimulus'
import { definitionsFromContext } from '@hotwired/stimulus-webpack-helpers'

window.Stimulus = Application.start()
const context = require.context('./controllers', true, /\.ts$/)
window.Stimulus.load(definitionsFromContext(context))

declare global {
    interface Window {
        Stimulus: Application
    }
}
