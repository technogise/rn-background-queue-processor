/**
 * Class Common
 *
 * This class provide common methods
 */
export default class Common {
    /**
     * Generate random UUID
     *
     * @return {string} UUID
     */
    static generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
