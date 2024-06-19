import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.upsert({
        where: { email: faker.internet.email() },
        update: {},
        create: {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            emailVerified: new Date(),
            image: faker.image.avatar(),
            accounts: {
                create: {
                    type: 'oauth',
                    provider: 'google',
                    providerAccountId: faker.string.uuid(),
                    access_token: faker.internet.password(),
                },
            },
            sessions: {
                create: {
                    sessionToken: faker.string.uuid(),
                    expires: faker.date.future(),
                },
            },
        },
        include: {
            accounts: true,
            sessions: true,
        },
    })

    // Create Customers for the User
    const customers = await Promise.all(
        Array.from({ length: 5 }).map(() =>
            prisma.customer.create({
                data: {
                    name: faker.name.fullName(),
                    contactInfo: faker.phone.number(),
                    userId: user.id,
                },
            })
        )
    )

    // Create Products for the User
    const products = await Promise.all(
        Array.from({ length: 5 }).map(() =>
            prisma.product.create({
                data: {
                    name: faker.commerce.productName(),
                    description: faker.commerce.productDescription(),
                    price: parseFloat(faker.commerce.price()),
                    stockQuantity: faker.number.int({ min: 1, max: 100 }),
                    userId: user.id,
                },
            })
        )
    )

    // Create Transactions for the User
    const transactions = await Promise.all(
        Array.from({ length: 10 }).map(async () => {
            const customer = faker.helpers.arrayElement(customers)
            const transactionType = faker.helpers.arrayElement(['cash', 'credit']) as
                | 'cash'
                | 'credit'
            const totalAmount = faker.number.int({ min: 100, max: 1000 })

            const transaction = await prisma.transaction.create({
                data: {
                    transactionType: transactionType,
                    totalAmount: totalAmount,
                    userId: user.id,
                    customerId: customer.id,
                },
            })

            // Create Transaction Items for each Transaction
            await Promise.all(
                Array.from({ length: 3 }).map(async () => {
                    const product = faker.helpers.arrayElement(products)
                    return prisma.transactionItem.create({
                        data: {
                            quantity: faker.number.int({ min: 1, max: 10 }),
                            price: product.price,
                            transactionId: transaction.id,
                            productId: product.id,
                        },
                    })
                })
            )

            return transaction
        })
    )
}

if (process.env.NODE_ENV !== 'production') {
    main()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
}
