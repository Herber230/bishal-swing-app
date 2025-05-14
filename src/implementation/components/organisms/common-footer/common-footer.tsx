import { Divider } from '@heroui/divider';

export function CommonFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-center py-4">
      <Divider className="my-1" />
      <p>&copy; {year} Bishal Swing</p>
    </footer>
  );
}
