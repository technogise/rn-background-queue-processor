import InMemoryAdapter from "../../../src/DbAdapter/InMemoryAdapter";

describe('Test InMemoryAdapter', () => {
    test('should test getAllItems', () => {
        const adapter = new InMemoryAdapter();
        const actual = adapter.getAllItems();
        expect(actual).toEqual([]);
    });

    test('should test slice', () => {
        const adapter = new InMemoryAdapter();
        adapter.addItem(11);
        adapter.addItem(22);
        adapter.addItem(33);
        const actual = adapter.slice();
        expect(actual).toContain(22);
        expect(actual).toContain(33);
        expect(actual).not.toContain(11);
    });

    test('should test addItem', () => {
        const adapter = new InMemoryAdapter();
        adapter.addItem(11);
        adapter.addItem(22);
        adapter.addItem(33);
        const actual = adapter.getAllItems();
        expect(actual).toContain(22);
        expect(actual).toContain(33);
        expect(actual).not.toContain(44);
    });

    test('should test getLength', () => {
        const adapter = new InMemoryAdapter();
        adapter.addItem(11);
        adapter.addItem(22);
        adapter.addItem(33);
        const actual = adapter.getLength();
        expect(actual).toBe(3);
    });

    test('should test getTopItem', () => {
        const adapter = new InMemoryAdapter();
        adapter.addItem(11);
        adapter.addItem(22);
        adapter.addItem(33);
        const actual = adapter.getTopItem();
        expect(actual).toBe(11);
    });
});
