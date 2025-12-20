import { cn } from '@/lib/utils';
import Categories from './categories';
import { Container } from './container';
import SortPopup from './sort-popup';
import { FunctionComponent } from 'react';
import { Category } from '@prisma/client';

interface TopBarProps {
  categories: Category[];
  className?: string;
}

export const TopBar: FunctionComponent<TopBarProps> = ({ className, categories }) => {
  return (
    <div className={cn('sticky top-0 db-white py-5 shadow-lg shadow-black/5 z-10', className)}>
      <Container className="flex items-center justify-between">
        <Categories className={''} items={categories} />
        <SortPopup />
      </Container>
    </div>
  );
};

export default TopBar;
