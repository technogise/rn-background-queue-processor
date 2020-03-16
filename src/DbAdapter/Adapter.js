export default class Adapter {
    constructor() {
    }

    getAllItems(){
        throw new Error('get method not defined for this adapter');
    }

    slice() {
        throw new Error('removeItem method not defined for this adapter');
    }

    addItem(){
        throw new Error('addItem method not defined for this adapter');
    }

    getLength(){
        throw new Error('getLength method not defined for this adapter');
    }

    getTopItem(){
        throw new Error('getTopItem method not defined for this adapter');
    }

}
