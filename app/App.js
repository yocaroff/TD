class App {

    static start() {
        //chargement de la page
        $(document).ready(function() {
            console.clear();
            App.loadClasses().done(() => {
                Utils.init();
                App.createMenu();
                App.browse();
            });
        }); 

        //onpopstate
        window.onpopstate = function() {
            App.browse();
        };

        //correction burger
        $('.nav-link').on('click', function(evt) {
            if ($(window).width() < 992) {
                let btn = $(evt.target).closest('.navbar').find('.navbar-toggler').not('collapsed');
                btn ? btn.click() : null;
            }
        }) 
    }

    static browse() {
        //récupérer le hash et l'afficher dans main
        let hash = (window.location.hash || "#accueil").substring(1);
        // $('main').hide().html(hash).fadeIn(100);
        Router.start(hash, null);
    }

    static classes = ["Utils", "Rest", "model/Model"];

    static extends = ["model/Product", "model/Category", "router/Router"];

    static loadClasses() {
        let deferred = $.Deferred();
        let _classes = $.map(App.classes, (cl)=> {
            return App.getScript("app/"+cl+".js");
        });
        $.when.apply($, _classes).then(() => {
            console.log('classes chargées');
            let _extends = $.map(App.extends, (cl)=> {
                return App.getScript("app/"+cl+".js");
            })
            $.when.apply($, _extends).then(() => {
                console.log('extends chargés');
                deferred.resolve();
            });
        });
        return deferred.promise();
    }

    static getScript(scriptUrl) {
        let deferred = $.Deferred();
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.defer = true;
        script.onload = function () {
            deferred.resolve()
        };
        document.body.appendChild(script);
        return deferred.promise();
    }

    static test() {
        // let product = new Product({id : 100, active: false, category_id: 3, title: 'ABC', description: 'DEF', price: 10.5, onsale: false, ord: 100 });
        // console.log(product);
        // Product.select().done((resp) => {
        //     console.log(resp);
            // product.title = 'ABCZ';
            // product.description = 'DEFZ';
            // product.active = true;
            // product.onsale = true;
            // // product.update().done((resp) => {
            //     console.log(resp);
                // product.delete().done((resp) => {
                //     console.log(resp);
                // })
            // })
        // })
    }

    static createMenu() {
        Model.showTables().done((resp) => {
            let menu = '';
            let navbar= $('#headerNavbar').find('ul')[0];
            $(resp).each((i) => {
               let tableName = resp[i]['Tables_in_td'];
               let menuName = Utils.capitalize(tableName);
               menuName = menuName.replaceAll('_', ' ');
               menu += '<li class="nav-item"><a class="nav-link" href="#'+tableName+'">'+menuName+'</a></li>' ;
            })
            $(navbar).html(menu);
        })
        
    }
}   
