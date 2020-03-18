import Queue from '../../src/Queue';
import InMemoryAdapter from "../../src/DbAdapter/InMemoryAdapter";

describe('Test temp file', () => {
    test('should test enqueue', () => {
        const dbAdapter = new InMemoryAdapter();
        const queue = new Queue(dbAdapter);
        const actual = queue.getSize();
        console.log('items', actual);
        expect(actual.toEqual(0));
    });
});
