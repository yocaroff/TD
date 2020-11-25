class Router{

    static start(route, id){
        let page = "404";
        let data = []; //Pour stocker les objets necessaires aux select
        switch (route) {
            
        }
        let requests = []
        let deferred = $.Deferred();
        let view;
        //TODO Requete pour récuperer la vue
        
        //TODO Requete pour les données (utiliser select)

        //Synchronisation
        $.when.apply($, requests).then(()=>{
            deferred.resolve(view)
        })
        return deferred.promise();
    }

}