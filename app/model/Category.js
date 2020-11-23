class Category extends Model {

    constructor(obj) {
        super(obj);
        super.assign(obj);
    }

    id = 0;
    active = true;
    title = "";
    description = "";
    onsale = false;
    ord = 0;

}