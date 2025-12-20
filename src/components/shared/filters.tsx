'use client';
import { Title } from './title';
import { Input } from '../ui/input';
import { RangeSlider } from './range-slider';
import CheckboxFiltersGroup from './checkbox-filters-group';
import { useFilters, useIngredients, useQueryFilters } from '../../../hooks/index';

interface FiltersProps {
  className?: string;
}

export const Filters: React.FC<FiltersProps> = ({ className }) => {
  const filters = useFilters();
  const { ingredients, loading } = useIngredients();

  useQueryFilters(filters);

  const items = ingredients.map((el) => ({ text: el.name, value: String(el.id) }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0]);
    filters.setPrices('priceTo', prices[1]);
  };

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      <div className="flex flex-col gap-4">
        <CheckboxFiltersGroup
          className="mt-5"
          title="Тип теста"
          name="pizzaTypes"
          limit={5}
          items={[
            { text: 'Тонкое', value: '1' },
            { text: 'Традиционное', value: '2' },
          ]}
          onClickCheckbox={filters.setPizzaTypes}
          selected={filters.pizzaTypes}
        />
      </div>

      <div className="flex flex-col gap-4">
        <CheckboxFiltersGroup
          className="mt-5"
          title="Размер"
          name="sizes"
          limit={5}
          items={[
            { text: '20 см', value: '20' },
            { text: '30 см', value: '30' },
            { text: '40 см', value: '40' },
          ]}
          onClickCheckbox={filters.setSizes}
          selected={filters.sizes}
        />
      </div>

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            //defaultValue={0}
            value={String(filters.prices.priceFrom) || '0'}
            onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
          />

          <Input
            type="number"
            placeholder="1000"
            min={100}
            max={1000}
            value={String(filters.prices.priceTo) || '1000'}
            onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
          onValueChange={updatePrices}
        />
      </div>

      <CheckboxFiltersGroup
        className="mt-5"
        title="Ингредиенты"
        name="ingredients"
        limit={5}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={(id) => filters.setSelectedIngredients(id)}
        selected={filters.selectedIngredients}
      />
    </div>
  );
};

export default Filters;
