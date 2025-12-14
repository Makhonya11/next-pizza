import Link from "next/link";
import { FunctionComponent } from "react";
import { Title } from "./title";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Ingredient } from "@prisma/client";

interface ProductCardProps {
     id: number;
  name: string;
  price: number;
  imageUrl?: string;
  className?: string;
  ingredients: Ingredient[]
}
 

export const ProductCard: FunctionComponent<ProductCardProps> = ({id, name, price, imageUrl, className, ingredients}) => {
    return ( 
        <div >
            <Link href={`/product/${id}`}>
                <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]"> 
                    <img className="w-[215px] h-[215px]" src={imageUrl} alt="Logo"  />
                </div>
                 <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

        <p className="text-sm text-gray-400">
          {
            ingredients.map(ingredient => ingredient.name).join(', ')
          }
        </p>
        <div className="flex justify-between items-center mt-4">
                <span>
                  от  <b> {price} $</b>
                </span>
                <Button variant='secondary' className="text-base font-bold">
                    <Plus size={20} className="mr-1"/>
                    Добавить
                </Button>
        </div>
            </Link>
        </div>
     );
}
 
export default ProductCard;