class Router{
    static page;

    static start(route, id){
        Router.page = "404";
        let deferred = $.Deferred();
        let data = []; //Pour stocker les objets necessaires aux select
        Utils.showTables().done((resp) => {
            // console.log(App.navbar);
            // console.log(App.menu);

            $(App.navbar).html(App.menu);
            $(resp).each((i) => {
                if (route == resp[i]['Tables_in_td']) {
                    Router.page = route;
                }
            })
            if (route == '' || route == 'accueil') {
                Router.page = 'accueil';
            }
            
            let requests = [];
            let view;
            //TODO Requete pour récuperer la vue
            $.get('app/view/' + Router.page + '.html').done((resp) => {
                // console.log(resp);
                // console.log(typeof(resp))
                view = resp
                // console.log(view)
            })
            //TODO Requete pour les données (utiliser select)
            for (let dtObj of data){
                let classe = dtObj.table.getClasse();
                requests.push(classe.select(dtObj))
            }
            // App.navbar.html()=App.menu;
            //Synchronisation
            $.when.apply($, requests).then(()=>{
                deferred.resolve(view)
            })

        })
        return deferred.promise();
    }

}