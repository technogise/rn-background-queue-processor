import Realm from 'realm';
import JobSchema from "./src/local-db/JobSchema";

export default new Realm({ schema : [JobSchema.schema], schemaVersion: 1 });
