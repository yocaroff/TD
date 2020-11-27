class Model {

    assign(obj) {
        for (let k in obj) {
            if (this[k] != undefined && typeof this[k] == 'number') {
                this[k] = Number(obj[k])
            }
            else if (this[k] != undefined && typeof this[k] == 'boolean') {
                this[k] = (obj[k] == ("1" || true)) ? true : false;
            }
            else {
                this[k] = obj[k]
            }
        }
    }

    insert() {
        let table = this.constructor.name.toLowerCase();
        let params = this;
        let deferred = $.Deferred();
        console.log('insert into ' + table);
        Rest.post({ table, params }).done((resp) => {
            let json = resp.tryJsonParse();
            if (json) {
                deferred.resolve(json);
            }
            else {
                deferred.reject(json);
            }
        }).fail((resp) => {
            deferred.reject(json);
        });
        return deferred.promise();
        //Q? Quels sont les paramètres attendus par Rest.post ?
        //Q? Que renvoi Rest.post ?
        // TODO Step 5
    }

    update() {
        let table = this.constructor.name.toLowerCase();
        let id = this.id;
        // TODO oldProduct à modifier avec select(table, id)
        //  let oldProduct = new Product({id : 100, active: false, category_id: 3, title: 'ABC', description: 'DEF', price: 10.5, onsale: false, ord: 100 });
        //  let res = false;
        let deferred = $.Deferred();
        let params = this;
        // oldProduct.forEach(k => {
        //     console.log(oldProduct[k])
        // });
        console.log('update from ' + table);
        Rest.put(table, id, params).done((resp) => {
            let json = resp.tryJsonParse();
            if (json) {
                deferred.resolve(json);
            }
            else {
                deferred.reject(json);
            }
        }).fail((resp) => {
            deferred.reject(json);
        });
        return deferred.promise();
        // TODO (plus tard) Faire un update seulement si une des propriétés de l'objet courant a changé
        //Q? Quels sont les paramètres attendus par Rest.put ?
        //Q? Que renvoi Rest.put ?
        // TODO Step 5
    }

    delete() {
        let table = this.constructor.name.toLowerCase();
        let id = this.id;
        let deferred = $.Deferred();
        console.log('delete from ' + table);
        Rest.delete(table, id).done((resp) => {
            let json = resp.tryJsonParse();
            if (json) {
                deferred.resolve(json);
            }
            else {
                deferred.reject(json);
            }
        }).fail((resp) => {
            deferred.reject(json);
        });
        return deferred.promise();
        //Q? Quels sont les paramètres attendus par Rest.delete ?
        //Q? Que renvoi Rest.delete ?
        // TODO Step 5

    }

    static list = [];
    static get selected(){
        let classe = this.prototype.constructor;//this
        return classe.list.length == 1 ? classe.list[0] : undefined;
    }
    static select(params = {}){
        //Q? Quels sont les paramètres attendus par Rest.get ?
        let table = this.prototype.constructor.name.toLowerCase();//this.name
        console.log(table);
        params.table = table;
        // let id = params.id
        // let where = params.where
        // let orderby = params.orderby
        let deferred = $.Deferred();
        let classe = this.prototype.constructor;//this
        classe.list = [];
        Rest.get(params).done((resp)=>{
            //Q? Que renvoi Rest.get ?
            let json = resp.tryJsonParse();
            if(json){
                for(let item of json){
                    let current = new classe(item)
                    classe.list.push(current)
                }
                deferred.resolve(classe.list)
            }
            else{
                //TODO Afficher un message à l'utilisateur
                deferred.reject(resp)
            }
        }).fail((resp)=>{
            //TODO Afficher un message à l'utilisateur
            deferred.reject(resp)
        })
        return deferred.promise();
    }

}