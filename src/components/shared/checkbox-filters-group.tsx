'use client';

import { FunctionComponent, useState } from 'react';
import { Input } from '../ui/input';
import FilterCheckbox, { FilterChecboxProps } from './FilterCheckbox';
import { Skeleton } from '../ui/skeleton';

type Item = FilterChecboxProps;

interface CheckboxFiltersGroupProps {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  className?: string;
  onClickCheckbox?: (id: string) => void;
  selected: Set<string>;
  defaultValue?: string[];
  loading?: boolean;
  name: string;
}

const CheckboxFiltersGroup: FunctionComponent<CheckboxFiltersGroupProps> = ({
  title,
  items,
  defaultItems,
  limit = 3,
  searchInputPlaceholder = 'Поиск...',
  className,
  onClickCheckbox,
  selected,
  loading,
  name,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  const list = showAll
    ? items.filter((el) => el.text.toLowerCase().includes(searchValue.toLowerCase()))
    : (defaultItems || items).slice(0, limit);

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>
        {...Array(limit)
          .fill(0)
          .map((_, index) => <Skeleton key={index} className="mb-4 h-6 rounded-[8px]" />)}
        <Skeleton className="mb-4 h-6 w-28 rounded-[8px]" />
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>
      {showAll && (
        <div className="mb-5">
          <Input
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
            onChange={onChangeSearchInput}
          />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list?.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            name={name}
            endAdornment={item.endAdornment}
            checked={selected?.has(item.value)}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
          />
        ))}
      </div>
      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
            {showAll ? 'Скрыть' : 'Показать все'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckboxFiltersGroup;
