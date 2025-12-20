'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { FunctionComponent } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '../../../../@types/prisma';
import ProductForm from '../product-form';

interface ChooseProductModalProps {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: FunctionComponent<ChooseProductModalProps> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden', className)}>
        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};

export default ChooseProductModal;
