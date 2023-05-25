/* eslint-disable react/jsx-no-useless-fragment */
import dynamic from 'next/dynamic';
import React from 'react';
import { NoSSRProps } from './NoSSR.interface';

const NoSsr = ({ children }: NoSSRProps) => <>{children}</>;

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
});
