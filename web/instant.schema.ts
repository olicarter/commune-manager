import { i } from '@instantdb/react';

const _schema = i.schema({
  entities: {
    communities: i.entity({
      name: i.string().indexed(),
    }),
  },
});

type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
