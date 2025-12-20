import { useEffect, useState } from 'react';
import { Ingredient } from '@prisma/client';
import { Api } from '../services/api-client';
import { useSet } from 'react-use';

interface ReturnProps {
  ingredients: Ingredient[];
  loading: boolean;
  selectedIngredients: Set<string>;
  onAddId: (id: string) => void;
}

export const useIngredients = (ids: string[] = []): ReturnProps => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setloading] = useState(true);

  const [selectedIds, { toggle }] = useSet(new Set<string>(ids));

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setloading(true);
        const ingredients = await Api.ingredients.getAll();
        setIngredients(ingredients);
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };
    fetchIngredients();
  }, []);

  return {
    ingredients,
    loading,
    selectedIngredients: selectedIds,
    onAddId: toggle,
  };
};
