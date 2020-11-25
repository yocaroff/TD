class Router{
    static page;

    static start(route, id){
        Router.page = "404";
        let data = []; //Pour stocker les objets necessaires aux select
        Model.showTables().done((resp) => {
            console.log(resp)
            $(resp).each((i) => {
                if (route == resp[i]['Tables_in_td']) {
                    Router.page = route;
                    console.log(Router.page)
                }
            })
            
            let requests = [];
            let deferred = $.Deferred();
            let view;
            //TODO Requete pour récuperer la vue
            $.get('app/view/' + Router.page + '.html').done((resp) => {
               $('#main').hide().html(resp).fadeIn(100);
            })
            //TODO Requete pour les données (utiliser select)
    
            //Synchronisation
            $.when.apply($, requests).then(()=>{
                deferred.resolve(view)
            })
            return deferred.promise();
        })

    }

}