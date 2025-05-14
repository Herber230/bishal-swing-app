import { LanguageSelector } from '@/components/molecules/language-selector';
import Image from 'next/image';

export function CommonHeader({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return (
    <header className="flex p-3xs shadow-main">
      <LanguageSelector />
      <div className="flex-1">
        <div className="relative w-[35px] h-[35px] mx-auto">
          <Image src="/images/bishal-logo-small.png" alt="Bishal Logo" fill />
        </div>
      </div>
      {children && <div>{children}</div>}
    </header>
  );
}
