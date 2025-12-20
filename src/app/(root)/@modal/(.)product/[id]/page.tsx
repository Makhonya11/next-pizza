//'use client'

import { notFound } from 'next/navigation';
import { prisma } from '../../../../../../prisma/prisma-client';
import ChooseProductModal from '@/components/shared/modals/choose-modal-product';

const ProductModalPage = async ({ params: { id } }: { params: { id: string } }) => {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
};

export default ProductModalPage;
