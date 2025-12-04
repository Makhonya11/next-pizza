import { Ingredient, ProductItem } from "@prisma/client";
import { FunctionComponent } from "react";
import ProductImage from "./pizza-image";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Title } from "./title";
import PizzaImage from "./pizza-image";


interface ChoosePizzaFormProps {
  imageUrl: string;
  name: string;
  ingredients: any[];
  items?: any[];
  loading?: boolean;
  onClickAdd?: VoidFunction;
  className?: string;
}
 
const ChoosePizzaForm: FunctionComponent<ChoosePizzaFormProps> = ({
    name,
    items,
    imageUrl,
    ingredients,
    onClickAdd,
    className
}) => {

    const textDetails = '30 см, трад тесто 30'
    const totalPrice = 350
    const size = 30
    return ( 
        <div className={cn(className, 'flex flex-1')}>
             <PizzaImage className={""} imageUrl={imageUrl} size={size}/>

            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size='md' className='font-extrabold mb-1' />
                <p className="text-gray-400">{textDetails}</p>
                <Button className="h-[55px] px-10 text-base rounded-[18px] w-full">
                    Добавить в корзину за {totalPrice}
                </Button>
            </div>

        </div>
     );
}
 
export default ChoosePizzaForm;