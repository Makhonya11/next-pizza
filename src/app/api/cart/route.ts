import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma-client';
import { findOrCreateCart } from '@/lib/find-or-create-cart';
import { updateCartTotalAmount } from '@/lib/update-cart-total-amount';

export const GET = async (req: NextRequest) => {
  try {
    const token = req.cookies.get('cartToken')?.value;
    if (!token) return NextResponse.json({ totalAmount: 0, items: [] });

    const usercart = await prisma.cart.findFirst({
      where: { token },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(usercart);
  } catch (error) {
    console.log('[CART_GET] Server error', error);
    return NextResponse.json({ message: 'Не удалось получить корзину' }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);
    const data = await req.json();

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: {
          every: {
            id: { in: data.ingredients },
          },
        },
      },
    });

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: {
            connect: data.ingredients?.map((id) => ({ id })),
          },
        },
      });
    }

    const updateUserCart = await updateCartTotalAmount(token);

    const resp = NextResponse.json(updateUserCart);
    resp.cookies.set('cartToken', token);
    return resp;
  } catch (e) {
    console.log('[CART_POST]', e);
    return NextResponse.json({ message: 'Не удалось создать корзину' }, { status: 500 });
  }
};
