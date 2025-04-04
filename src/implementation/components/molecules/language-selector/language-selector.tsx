'use client';

import type { JSX } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button, ButtonGroup } from '@heroui/button';

export function LanguageSelector(): JSX.Element {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (lang: string) => {
    const updatedPath = pathname.replace(/\/(en|es)/, `/${lang}`);
    router.push(updatedPath);
  };

  return (
    <div>
      <ButtonGroup>
        <Button variant="light" onPress={() => handleClick('en')}>
          English
        </Button>
        <Button variant="light" onPress={() => handleClick('es')}>
          Español
        </Button>
      </ButtonGroup>
    </div>
  );
}
