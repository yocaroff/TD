class Product extends Model{

    constructor(obj) {
        super(obj);
        this.assign(obj);
        let bp;
    }

    id = 0;
    active = true;
    category_id = 0;
    title = "";
    description = "";
    price = 0;
    onsale = false;
    ord = 0;

}