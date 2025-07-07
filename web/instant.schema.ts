import { i } from '@instantdb/react';

const _schema = i.schema({
  entities: {
    communities: i.entity({
      name: i.string().indexed(),
    }),
    members: i.entity({}),
    profiles: i.entity({
      name: i.string(),
      displayName: i.string(),
    }),
  },
  links: {
    memberUser: {
      forward: { on: 'members', has: 'one', label: '$user' },
      reverse: { on: '$users' as any, has: 'one', label: 'member' },
    },
    communityMembers: {
      forward: { on: 'communities', has: 'many', label: 'members' },
      reverse: { on: 'members', has: 'many', label: 'communities' },
    },
    profileUser: {
      forward: { on: 'profiles', has: 'one', label: '$user' },
      reverse: { on: '$users' as any, has: 'one', label: 'profile' },
    },
    profileAvatar: {
      forward: { on: 'profiles', has: 'one', label: 'avatar' },
      reverse: { on: '$files' as any, has: 'one', label: 'profile' },
    },
  },
});

type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
