import Adapter from "./Adapter";

export default class InMemoryAdapter extends Adapter {
    constructor(props) {
        super(props);
        this.items = [];
    }

    getAllItems(){
        return this.items;
    }

    slice(){
        return this.items.slice(1);
    }

    addItem(item){
        this.items.push(item);
    }

    getLength(){
        return this.items.length;
    }

    getTopItem(){
        return this.items[0];
    }
}
