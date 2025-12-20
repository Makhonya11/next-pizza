import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';
import { FunctionComponent } from 'react';

interface IngredientItemProps {
  className: string;
  active: boolean;
  price: number;
  name: string;
  imageUrl: string;
  onClick: () => void;
}

export const IngredientItem: FunctionComponent<IngredientItemProps> = ({
  className,
  active,
  price,
  name,
  imageUrl,
  onClick,
}) => {
  return (
    <div
      className={cn(
        'flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white',
        { 'border border-primary': active },
        className,
      )}
      onClick={onClick}
    >
      {active && <CircleCheck className="absolute top-2 right-2 text-primary" />}
      <img src={imageUrl} alt={name} width={110} height={110} />
      <span className="text-xs mb-1">{name}</span>
      <span className="font-bold">{price} $</span>
    </div>
  );
};

export default IngredientItem;
