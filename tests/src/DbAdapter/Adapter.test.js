import Adapter from "../../../src/DbAdapter/Adapter";

describe('Test Adapter class', () => {
    test('getAllItems function', () => {
        const adapter = new Adapter();
        expect(adapter.getAllItems).toThrow('get method not defined for this adapter');
    });

    test('remove function', () => {
        const adapter = new Adapter();
        expect(adapter.remove).toThrow('slice method not defined for this adapter');
    });

    test('addItem function', () => {
        const adapter = new Adapter();
        expect(adapter.addItem).toThrow('addItem method not defined for this adapter');
    });

    test('getLength function', () => {
        const adapter = new Adapter();
        expect(adapter.getLength).toThrow('getLength method not defined for this adapter');
    });

    test('getTopItem function', () => {
        const adapter = new Adapter();
        expect(adapter.getTopItem).toThrow('getTopItem method not defined for this adapter');
    });
});
