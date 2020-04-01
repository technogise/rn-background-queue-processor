import Realm from 'realm';
import schema from './schema';

export default new Realm({ schema, schemaVersion: 1 });
