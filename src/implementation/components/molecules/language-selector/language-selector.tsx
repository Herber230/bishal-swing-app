'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@heroui/react';
import Image from 'next/image';

const languages = [
  {
    label: 'EN',
    value: 'en',
    flagSource: '/icons/usa-flag.svg',
    flagAlt: 'English Flag',
  },
  {
    label: 'ES',
    value: 'es',
    flagSource: '/icons/spain-flag.svg',
    flagAlt: 'Spanish Flag',
  },
] as const;

type LangValue = (typeof languages)[number]['value'];

function LanguageItem({ lang }: { lang: (typeof languages)[number] }) {
  return (
    <div className="flex">
      <Image
        src={lang.flagSource}
        alt={lang.flagAlt}
        width={20}
        height={20}
        className="mr-2"
      />
      {lang.label}
    </div>
  );
}

const sanitizeLang = (currentPath: string) => {
  const langRegex = new RegExp(`^/(${languages.map(l => l.value).join('|')})`);
  const match = currentPath.match(langRegex);

  if (!match) {
    throw new Error('Invalid language in the path');
  }
  return match[1] as (typeof languages)[number]['value'];
};

export function LanguageSelector(): React.JSX.Element {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState(sanitizeLang(pathname));

  const handleClick = (lang: LangValue) => {
    const updatedPath = pathname.replace(`/${selectedLang}`, `/${lang}`);
    setSelectedLang(lang);
    router.push(updatedPath);
  };

  return (
    <Dropdown className="data-[slot=content]:min-w-0 [&_li]:p-0">
      <DropdownTrigger>
        <Button variant="light">
          <LanguageItem lang={languages.find(l => l.value === selectedLang)!} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu items={languages}>
        {lang => (
          <DropdownItem key={`lang-key-${lang.value}`}>
            <Button
              variant="light"
              onPress={() => handleClick(lang.value)}
              className="flex w-full justify-start"
            >
              <LanguageItem lang={lang} />
            </Button>
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
