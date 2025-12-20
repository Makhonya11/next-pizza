'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions token="b17498b75b43fee72ce8a4d4e21133615b58a3ab" onChange={(data) => onChange?.(data?.value)} />
  );
};
