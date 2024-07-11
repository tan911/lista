import { prisma } from '../../db'
import { Request, Response, NextFunction } from 'express'
import { TransactionController } from './transaction_controller'

/**
 * API CONTROLLER
 *
 */
const transaction = new TransactionController()

type Ouput<TInput, TOuput, TContext> = {
    (args: { ctx: TContext; req: Request; input: TInput }): Promise<TOuput>
}

class EndpointFactory<TContext> {
    constructor(private context: (res: Response) => TContext | Promise<TContext>) {}
    public create<TInput, TOuput>(args: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        input: any | undefined
        output: Ouput<TInput, TOuput, TContext>
    }) {
        let validatedInput: TInput | undefined

        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                //validation for input
                validatedInput = args.input?.parse({
                    ...req.params,
                    ...req.query,
                    ...req.body,
                })
            } catch (error) {
                if (error) return res.status(400).json(error)
                next(error)
            }

            const ctx = (await this.context(res)) as TContext

            if (!ctx) return res.status(401).json({ message: 'unauthorize' })

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            args.output({ ctx, req, input: validatedInput as any })
                .then((opt) => res.status(200).json(opt))
                .catch((error) => new Error(error))
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function context(_res: Response) {
    const user = await prisma.user.findUnique({
        where: {
            email: 'Gideon.Kemmer@yahoo.com',
        },
    })
    return { user, transaction }
}

export const endpoint = new EndpointFactory(context)

/**
 * VIEW CONTROLLER
 *
 */

export {
    getOverview,
    getOverviewModal,
    getCustomerModal,
    getCustomerView,
    getTransactionModal,
    getTransactionView,
    getCustomerById,
    getLoginView,
    getSignUpView,
} from './web_controller'
