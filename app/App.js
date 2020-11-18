class App {

    static start() {
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

        //chargement de la page
        $(document).ready(function() {
            App.browse()
        }); 
    }

    static browse() {
        //récupérer le hash et l'afficher dans main
        let hash = (window.location.hash || "#accueil").substring(1);
        $('main').hide().html(hash).fadeIn(100)
    }
}