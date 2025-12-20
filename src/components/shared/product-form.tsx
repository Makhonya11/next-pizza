'use client';

import { FunctionComponent } from 'react';
import { ProductWithRelations } from '../../../@types/prisma';
import toast from 'react-hot-toast';
import ChoosePizzaForm from './choose-pizza-form';
import ChooseProductForm from './choose-product-form';
import { useCart } from '../../../hooks/use-cart';

interface ProductFormProps {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ProductForm: FunctionComponent<ProductFormProps> = ({ product, onSubmit: _onSubmit }) => {
  const { addCartItem, loading } = useCart();

  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;
      await addCartItem({
        productItemId: itemId,
        ingredients,
      });
      toast.success(`${product.name} добавлена в корзину`);
      _onSubmit?.();
    } catch (error) {
      toast.error('Не удалось добавить продукт в корзину');
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }
  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      ingredients={[]}
      onSubmit={onSubmit}
      price={firstItem.price}
      loading={loading}
    />
  );
};

export default ProductForm;
