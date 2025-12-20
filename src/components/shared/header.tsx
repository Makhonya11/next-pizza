'use client';
import { cn } from '@/lib/utils';
import { Container } from './container';
import Image from 'next/image';
import Link from 'next/link';
import SearchInput from './search-input';
import CartButton from './cart-button';
import { ProfileButton } from './profile-button';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { AuthModal } from './modals/auth-modal/auth-modal';

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props>  = ({ hasSearch = true, className }) => {
  const router = useRouter();
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    let toastMessage = '';

    if (searchParams.has('paid')) {
      toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.';
    }
    if (searchParams.has('verified')) {
      toastMessage = 'Почта успешно подтверждена';
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace('/');
        toast.success(toastMessage, { duration: 3000 });
      }, 1000);
    }
  }, []);

  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        <Link href={'/'}>
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Next pizza</h1>
              <p className="text-sm text-gray-400 leading-3"> вкуснее уже некуда</p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="flex rounded-2xl flex-1 justify-between relative h-11">
            <SearchInput />
          </div>
        )}

        <div className="flex items-center gap-3">
          <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
          <CartButton />
        </div>
      </Container>
    </header>
  );
};
