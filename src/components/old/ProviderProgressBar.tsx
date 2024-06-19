'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProviderProgressBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height='4px'
        color='#D2BF9D'
        options={{ showSpinner: false }}
        shallowRouting={true}
      />
    </>
  );
};
export default ProviderProgressBar;
