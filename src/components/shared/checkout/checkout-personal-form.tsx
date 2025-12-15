import React from 'react';
import { WhiteBlock } from '../whiteblock';
import { FormInput } from '../form/form-input';
import { useMask } from '@react-input/mask';
import { Controller } from 'react-hook-form';
import { Input } from '@/components/ui';

interface Props {
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {

  const phoneInputRef = useMask({
    mask: '+7 (___) ___-__-__',
    replacement: { _: /\d/ },
  })
  return (
    <WhiteBlock title="2. Персональные данные" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" className="text-base" placeholder="Имя" />
        <FormInput name="lastName" className="text-base" placeholder="Фамилия" />
        <FormInput name="email" className="text-base" placeholder="E-Mail" />
        <Controller
        name='phone'
        render={({field}) => {
          return (
            <Input {...field} ref={phoneInputRef}  placeholder='+7 (___) ___-__-__' />

          )
        }}
        />
      </div>
    </WhiteBlock>
  );
};