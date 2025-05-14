import { PropsWithChildren } from 'react';
import { SimplePageTemplate } from '@/components/templates/simple-page';
import { CommonHeader } from '@/components/organisms/common-header';
import { CommonFooter } from '@/components/organisms/common-footer';
import { HamburgerMenu } from '@/components/organisms/hamburger-menu';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <SimplePageTemplate
      header={
        <CommonHeader>
          <HamburgerMenu />
        </CommonHeader>
      }
      footer={<CommonFooter />}
    >
      {children}
    </SimplePageTemplate>
  );
}
