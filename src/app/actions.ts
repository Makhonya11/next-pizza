'use server'

import { cookies } from "next/headers";
import { CheckoutFormValues } from "../../constants/checkout-form-schema";
import { prisma } from "../../prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { sendEmail } from "@/lib/send-email";
import { PayOrderTemplate } from "@/components/shared/email-templates/pay-order";
import { createPayment } from "@/lib/create-payment";


export const createOrder = async(data:CheckoutFormValues) => {
    try {
        const cookiesStore = cookies()
        const cartToken = cookiesStore.get('cartToken')?.value

        if(!cartToken) {
            throw new Error ('Cart token not found')
        }

        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                    include: {
                        ingredients:true,
                        productItem: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            },
            where: {
                token: cartToken
            }
        })

         if(!userCart) {
            throw new Error ('Cart not found')
        }


         if(userCart?.totalAmount === 0) {
            throw new Error ('Cart is empty')
        }

        const order = await prisma.order.create({
            data: {
                token: cartToken,
                fullName: `${data.firstName} ${data.lastName}`,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items)
            }
        })

        await prisma.cart.update({
            where: {
                id: userCart.id
            },
            data: {
                totalAmount: 0
            }
        })

        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id
            }
        })

        const paymentData = await createPayment ({
            description:  'Оплата заказа #' + order.id,
            orderId: order.id,
            amount: order.totalAmount
        })

        if (!paymentData) {
            throw new Error('Payment data not found')
        }

        const paymentUrl = paymentData.confirmation.confirmation_url

        await sendEmail(
            data.email,
            'Next Pizza / Оплатите заказ #' + order.id,
            PayOrderTemplate({
                orderId: order.id,
                totalAmount: order.totalAmount,
                paymentUrl,
            }),
        )

        return paymentUrl

    } catch (error) {
        console.log('[CreateOrder] Server error', error)
    }
}