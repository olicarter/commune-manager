import { i } from '@instantdb/react';

const _schema = i.schema({
  entities: {
    communities: i.entity({
      name: i.string().indexed(),
    }),
    members: i.entity({}),
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
  },
});

type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
