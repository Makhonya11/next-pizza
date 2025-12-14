'use client'
import { FunctionComponent, useEffect, useRef } from "react";
import { Title } from "./title";
import ProductCard from "./product-card";
import { cn } from "@/lib/utils";
import {useIntersection} from 'react-use'
import { useCategoryStore } from "../../../store/category";
import { Product } from "@prisma/client";
import { ProductWithRelations } from "../../../@types/prisma";


interface ProductGroupListProps {
  title: string;
  items: ProductWithRelations[];
  className?: string;
  listClassName?: string;
  categoryId: number;

}
 
export const ProductGroupList: FunctionComponent<ProductGroupListProps> = ({title, items, categoryId, className, listClassName}) => {
    const intersectionref = useRef(null)
    const intersection = useIntersection(intersectionref, {
        threshold: 0.4,
    })
    const setCategoryActiveid = useCategoryStore((state) => state.setActiveid)

    useEffect(() => {
        if (intersection?.isIntersecting) {
            setCategoryActiveid(categoryId)
        }
        return () => {
            
        };
    }, [intersection?.isIntersecting]);
    
    return (  
        <div className={className} id={title} ref={intersectionref} >
            <Title text={title} size="lg" className="font-extrabold mb-5"/>
            <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
                {
                    items.map(product => (
                      <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      imageUrl={product.imageUrl}
                      price={product.items[0].price}
                      ingredients={product.ingredients}/>
                    ))
                }
            </div>
        </div>
    );
}
 
export default ProductGroupList;