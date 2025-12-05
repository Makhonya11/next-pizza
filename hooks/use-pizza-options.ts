import { Variant } from "@/components/shared/group-variants";
import { useEffect, useState } from "react";
import { useSet } from "react-use";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { ProductItem } from "@prisma/client";
import { getAvailablePizzaSizes } from "@/lib/get-available-pizza-sizes";


interface usePizzaOptionsProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredients: Set<number>;
  availableSizes: Variant[];
  currentItemId?: number;
  setSize: (size: PizzaSize) => void;
  setType: (size: PizzaType) => void;
  addIngredient: (id: number) => void;
}
 
const usePizzaOptions = (items: ProductItem[]):usePizzaOptionsProps => {
   

    const [size, setSize] = useState<PizzaSize>(20);
    const [type, setType] = useState<PizzaType>(1);   

    const [selectedIngredients, {toggle: addIngredient}] = useSet(new Set<number>([]))

    const availableSizes = getAvailablePizzaSizes(type, items)

    const currentItemId = items.find((item) => item.pizzaType === type && item.size === size)?.id;


    useEffect(() => {
        const availableSize = availableSizes?.find(item => !item.disabled)
        const isAvailableSize = availableSizes?.find(
      (item) => Number(item.value) === size && !item.disabled,
    );
        if (availableSize && !isAvailableSize) {
            setSize(+availableSize.value  as PizzaSize)

        }
    }, [type]);
    
   
    return {
    size,
    type,
    selectedIngredients,
    availableSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
     }
}
 
export default usePizzaOptions;