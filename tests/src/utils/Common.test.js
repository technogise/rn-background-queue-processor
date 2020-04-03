import Common from "../../../src/utils/Common";

describe('Test common class', () => {
    test('generateUUID function', () => {
        Common.generateUUID = jest.fn().mockReturnValue('testid');
        const id = Common.generateUUID();
        expect(id).toBe('testid');
    })
});
