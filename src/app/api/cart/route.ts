import { Product } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../prisma/prisma-client"

export const GET = async(req:NextRequest) => {
    try {
        const token = req.cookies.get('cartToken')?.value
        if(!token) return NextResponse.json({totalAmount:0, items: []})

        const usercart = await prisma.cart.findFirst({
        where: {token},
        include: {
            items: {
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    productItem: {
                        include: {
                            product:true
                        }
                    },
                    ingredients:true
                }
            }
            
        }
    })

    return NextResponse.json(usercart)
    } catch (e) {
        console.log(e)
    }
}