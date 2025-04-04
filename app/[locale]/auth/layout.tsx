import Image from 'next/image';
import { PropsWithChildren } from 'react';
import { SimplePageTemplate } from '@/components/templates/simple-page';
import { CommonFooter } from '@/components/organisms/common-footer';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <SimplePageTemplate footer={<CommonFooter />}>
      <div className={`border border-gray-300 rounded-md p-4 w-[400px]`}>
        <div className="flex flex-col items-center mb-5">
          <Image
            alt="Bishal Logo"
            src="/images/bishal-logo.png"
            width={100}
            height={100}
          />
          <Image
            alt="Bishal Name"
            src="/images/text-3.png"
            width={200}
            height={200}
          />
        </div>
        {children}
      </div>
    </SimplePageTemplate>
  );
}
