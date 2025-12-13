import { FunctionComponent } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Title } from "./title";


interface ChooseProductFormProps {
  imageUrl: string;
  name: string;
  ingredients: any[];
  items?: any[];
  loading?: boolean;
  onSubmit?: VoidFunction;
  price: number
  className?: string;
}
 
const ChooseProductForm: FunctionComponent<ChooseProductFormProps> = ({
    name,
    imageUrl,
    onSubmit,
    price,
    loading,
    className
}) => {

    return ( 
        <div className={cn(className, 'flex flex-1')}>
             <div className={cn('flex items-center justify-center flex-1 relative w-full', className)}>
      <img
        src={imageUrl}
        alt={name}
        className={cn('relative left-2 top-2 transition-all z-10 duration-300 w-[300px] h-[300px]')}
      />

    </div>

            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size='md' className='font-extrabold mb-1' />
                <Button 
                loading={loading} 
                onClick={() => onSubmit?.()} 
                className="h-[55px] px-10 text-base rounded-[18px] w-full">
                    Добавить в корзину за {price}
                </Button>
            </div>

        </div>
     );
}
 
export default ChooseProductForm;