import { Divider } from '@heroui/divider';
import { LanguageSelector } from '@/components/molecules/language-selector';

export function CommonFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-center py-4">
      <LanguageSelector />
      <Divider className="my-1" />
      <p>&copy; {year} Bishal Swing</p>
    </footer>
  );
}
