import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";
import { OrderStatus } from '@prisma/client';
import { sendEmail } from '@/lib/send-email';
import { OrderSuccessTemplate } from '@/components/shared/email-templates/order-success-template';


export const POST = async(req: NextRequest) => {
    try {
        const body = await req.json()
        const order = await prisma.order.findFirst({
            where: {
                id: Number(body.object.metadata.order_id)
            }
        })

        if(!order) {
            return NextResponse.json({error: 'Order not found'})
        }

        const isSucceeded = body.object.status === 'succeeded';

        await prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                status: isSucceeded? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
            }
        })

        const items = JSON.parse(order.items as string)

        if(isSucceeded) {
            await sendEmail(
                order.email,
                 'Next Pizza / Ваш заказ успешно оформлен 🎉',
                 OrderSuccessTemplate({ orderId: order.id, items }),
            )
        } 

    } catch (error) {
        console.log('[checkout callback] error', error)
        return NextResponse.json({error: 'server error'})
    }
}