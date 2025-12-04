'use client'

import { Ingredient, ProductItem } from "@prisma/client";
import { FunctionComponent, useEffect, useState } from "react";
import ProductImage from "./pizza-image";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Title } from "./title";
import PizzaImage from "./pizza-image";
import GroupVariants from "./group-variants";
import { mapPizzaType, pizzaSizes, pizzaTypes } from "../../../constants/pizza";
import IngredientItem from "./ingredient-item";
import { useSet } from "react-use";


interface ChoosePizzaFormProps {
  imageUrl: string;
  name: string;
  ingredients: any[];
  items: ProductItem[];
  loading?: boolean;
  onClickAddCart?: VoidFunction;
  className?: string;
}
 
const ChoosePizzaForm: FunctionComponent<ChoosePizzaFormProps> = ({
    name,
    items,
    imageUrl,
    ingredients,
    onClickAddCart,
    className
}) => {

    const [size, setSize] = useState(20);
    const [type, setType] = useState(1);   
    const textDetails =  `${size} см, ${mapPizzaType[type]} пицца`
    
    const pizzaPrice = items.find(item => item.size === size && item.pizzaType === type)?.price
    
    const [selectedIngredients, {toggle: addIngredient}] = useSet(new Set([]))
    
    const totalIngredientsPrice = ingredients.filter(ing => selectedIngredients.has(ing.id)).reduce((acc, ing) => acc +ing.price, 0)
    const totalPrice = pizzaPrice + totalIngredientsPrice

    const handleClickAdd = () => {
        onClickAddCart?.()
        console.log({size, type, ingredients: selectedIngredients})
    }

    const availablePizzas = items.filter(item => item.pizzaType === type)
    const availablePizzaSizes = pizzaSizes.map(item => ({
        name: item.name,
        value: item.value,
        disabled: !availablePizzas.some(pizza => pizza!.size === Number(item.value))
    }))

    useEffect(() => {
        const availableSize = availablePizzaSizes?.find(item => !item.disabled)
        const isAvailableSize = availablePizzas.some(pizza => pizza!.size === size)
        if (availableSize && !isAvailableSize) {
            setSize(+availableSize.value)

        }
    }, [type]);
    

    
    return ( 
        <div className={cn(className, 'flex flex-1')}>
             <PizzaImage className={""} imageUrl={imageUrl} size={size}/>

            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size='md' className='font-extrabold mb-1' />
                <p className="text-gray-400">{textDetails}</p>
                
                <div className="flex flex-col gap-4 mt-5">
                <GroupVariants 
                items={availablePizzaSizes} 
                selectedValue={String(size)}
                onClick={(value) => setSize(Number(value))}
                />
                <GroupVariants 
                items={pizzaTypes} 
                selectedValue={String(type)}
                onClick={(value) => setType(Number(value))}
                />

               <div className="bg-gray-50 p-5 rounded-md h-[400px] overflow-auto scrollbar mt-5">
                 <div className="grid grid-cols-3 gap-3">
                    {ingredients.map(ingredient => (
                        <IngredientItem
                        key={ingredient.id}
                        name={ingredient.name}
                        price={ingredient.price}
                        imageUrl={ingredient.imageUrl}
                        onClick={() => addIngredient(ingredient.id)}
                        active={selectedIngredients.has(ingredient.id)}
                        />
                    ))}

                </div>
               </div>
                </div>
                <Button 
                onClick={handleClickAdd}
                className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Добавить в корзину за {totalPrice} $
                </Button>
            </div>

        </div>
     );
}
 
export default ChoosePizzaForm;