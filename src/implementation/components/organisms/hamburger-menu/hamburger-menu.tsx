'use client';

import { Link } from '@heroui/link';
import { FaBars, FaUser, FaUserGear, FaRightToBracket } from 'react-icons/fa6';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@heroui/react';
import { useSession, signOut } from 'next-auth/react';

export function HamburgerMenu(): React.JSX.Element {
  const { data: session } = useSession();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light">
          <FaBars />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        {session ? (
          <>
            <DropdownItem key="user-logged-item" startContent={<FaUserGear />}>
              <Button variant="light">
                Logged In as
                <strong className="text-md">{session.user.name}</strong>
              </Button>
            </DropdownItem>
            <DropdownItem
              key="log-out-item"
              startContent={<FaRightToBracket />}
            >
              <Button variant="light" onPress={() => signOut()}>
                Log Out
              </Button>
            </DropdownItem>
          </>
        ) : (
          <DropdownItem key="log-in-item" startContent={<FaUser />}>
            <Link href="/auth/sign-in">Sign In</Link>
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
