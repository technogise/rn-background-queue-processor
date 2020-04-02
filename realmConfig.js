import Realm from 'realm';
import JobSchema from "./src/local-db/JobSchema";
import FailedJobSchema from "./src/local-db/FailedJobSchema";

export default new Realm({ schema : [
    JobSchema.schema,
    FailedJobSchema.schema
], schemaVersion: 1 });
