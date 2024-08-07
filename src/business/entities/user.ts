import { EntityId } from './entity-id';
import { UserAccount } from './user-account';

export interface User {
  id: EntityId;
  name: string;
  accounts: Array<UserAccount>;
}
