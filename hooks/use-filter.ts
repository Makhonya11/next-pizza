import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useSet } from 'react-use';

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryProps extends PriceProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

export interface Filters {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setPizzaTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const seacrhParams = useSearchParams() as unknown as Map<keyof QueryProps, string>;

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(seacrhParams.get('ingredients')?.split(',')),
  );

  const [prices, setPrice] = useState<PriceProps>({
    priceFrom: Number(seacrhParams.get('priceFrom')) || undefined,
    priceTo: Number(seacrhParams.get('priceTo')) || undefined,
  });

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(seacrhParams.has('sizes') ? seacrhParams.get('sizes')?.split(',') : []),
  );
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(seacrhParams.has('pizzaTypes') ? seacrhParams.get('pizzaTypes')?.split(',') : []),
  );

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return useMemo(
    () => ({
      sizes,
      prices,
      pizzaTypes,
      selectedIngredients,
      setSelectedIngredients: toggleIngredients,
      setPrices: updatePrice,
      setPizzaTypes: togglePizzaTypes,
      setSizes: toggleSizes,
    }),
    [sizes, prices, pizzaTypes, selectedIngredients],
  );
};
