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


interface ChooseProductModalProps {
    product: ProductWithRelations
    className: string
}
 
const ChooseProductModal: FunctionComponent<ChooseProductModalProps> = ({product, className}) => {

    const router = useRouter()

    const isPizzaForm = Boolean(product.items[0].pizzaType)
    const addCartItem = useCartStore((state) => state.addCartItem)

    const onAddProduct = () => {
        addCartItem({
            productItemId: ,
            ingredients: 
        })
    }
    return ( 
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent 
            className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className,
        )}>
            {isPizzaForm ? (
                <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients} items={product.items}/>
            ) : (
                <ChooseProductForm imageUrl={product.imageUrl} name={product.name} ingredients={[]}/>
            )}
            </DialogContent>
        </Dialog>
     );
}
 
export default ChooseProductModal;