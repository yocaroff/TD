class Rest{

    static get(data){//table, id, where, orderby
        return $.get('rest/', data)
    }

    static post(data){//table, fields (k,v)
        return $.post('rest/', data)
    }

    static put(data){//table, id, fields (k,v)
        return $.ajax({
            url : 'rest/',
            type : 'PUT',
            data : JSON.stringify({table, data})
        })
    }

    static delete(data){//table, id
        return $.ajax({
            url : 'rest/',
            type : 'DELETE',
            data : JSON.stringify({table, data})
        })
    }

}