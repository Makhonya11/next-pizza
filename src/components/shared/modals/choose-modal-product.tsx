'use client'

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Product } from "@prisma/client";
import { FunctionComponent } from "react";
import { Title } from "../title";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";


interface ChooseProductModalProps {
    product: Product
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
                <Title>
                    {product.name}
                </Title>
            </DialogContent>
        </Dialog>
     );
}
 
export default ChooseProductModal;