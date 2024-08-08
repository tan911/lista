import { Controller } from '@hotwired/stimulus'
import { IAddProduct } from './add_product_controller'

export default class ProductBtn extends Controller<HTMLButtonElement> {
    static outlets = ['add-product']
    open() {
        this.addProductOutlet.show()
    }

    declare readonly addProductOutlet: IAddProduct
}
