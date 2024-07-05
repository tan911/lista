const creditorsInput = document.getElementById('creditors') as HTMLInputElement
const emailInput = document.getElementById('email') as HTMLInputElement
const productsInput = document.getElementById('products') as HTMLInputElement
const categoryInput = document.getElementById('category') as HTMLInputElement
const quantityInput = document.getElementById('quantity') as HTMLInputElement
const dateInput = document.getElementById('date') as HTMLInputElement

interface inputData {
    creditors: string
    email: string
    products: string
    category: string
    quantity: number
    date: string
}

export const getInputData = async (): Promise<inputData> => {
    return {
        creditors: creditorsInput.value,
        email: emailInput.value,
        products: productsInput.value,
        category: categoryInput.value,
        quantity: +quantityInput.value,
        date: dateInput.value,
    }
}
