//App.start();

//Test API Rest (1 à la  fois)

Rest.get(/* ... */).done((resp) => {
    $('#main').hide().html(resp).fadeIn();
})

// Rest.post(/* ... */).done((resp) => {
//     $('#main').hide().html(resp).fadeIn();
// })

// Rest.put(/* ... */).done((resp) => {
//     $('#main').hide().html(resp).fadeIn();
// })

// Rest.delete(/* ... */).done((resp) => {
//     $('#main').hide().html(resp).fadeIn();
// })