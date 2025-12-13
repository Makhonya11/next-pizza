'use client'

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Product } from "@prisma/client";
import { FunctionComponent } from "react";
import { Title } from "../title";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ProductWithRelations } from "../../../../@types/prisma";
import ChoosePizzaForm from "../choose-pizza-form";
import ChooseProductForm from "../choose-product-form";
import { useCartStore } from "../../../../store/cart";
import toast from "react-hot-toast";
import { useCart } from "../../../../hooks/use-cart";
import ProductForm from "../product-form";


interface ChooseProductModalProps {
    product: ProductWithRelations
    className: string
}
 
const ChooseProductModal: FunctionComponent<ChooseProductModalProps> = ({product, className}) => {

    const router = useRouter()

    return ( 
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent 
            className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className,
        )}>
            <ProductForm
            product={product}
            onSubmit={() => router.back()}
            />
            </DialogContent>
        </Dialog>
     );
}
 
export default ChooseProductModal;