class Model{

    assign(obj){
        for(let k in obj){
            if(this[k] != undefined && typeof this[k] == 'number'){
                this[k] = Number(obj[k])
            }
            else if(this[k] != undefined && typeof this[k] == 'boolean'){
                this[k] = (obj[k] == ("1" || true)) ? true : false;
            }
            else{
                this[k] = obj[k]
            }
        }
    }

    insert(){
        //Q? Quels sont les paramètres attendus par Rest.post ?
        //Q? Que renvoi Rest.post ?
        // TODO Step 5
    }

    update(){// TODO (plus tard) Faire un update seulement si une des propriétés de l'objet courant a changé
        //Q? Quels sont les paramètres attendus par Rest.put ?
        //Q? Que renvoi Rest.put ?
        // TODO Step 5
    }

    delete(){
        //Q? Quels sont les paramètres attendus par Rest.delete ?
        //Q? Que renvoi Rest.delete ?
        // TODO Step 5
        
    }

    static select(id){

    }

}