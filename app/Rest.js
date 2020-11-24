class Rest{

    static get(data){//table, id, where, orderby
        return $.get('rest/', data)
    }

    static post(data){//table, fields (k,v)
        return $.post('rest/', JSON.stringify(data))
    }

    static put(table, id, params){//table, id, fields (k,v)
        return $.ajax({
            url : 'rest/',
            type : 'PUT',
            data : JSON.stringify({table, id, params})
        })
    }

    static delete(table, id){//table, id
        return $.ajax({
            url : 'rest/',
            type : 'DELETE',
            data : JSON.stringify({table, id})
        })
    }

    static showTables(){
        return $.ajax({
            url : 'rest/',
            type : 'SHOWTABLES',
        })
    }

}