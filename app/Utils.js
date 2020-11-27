class Utils{

    static init(){
        String.prototype.tryJsonParse = function () {
            let value;
            try {
                value = JSON.parse(this)
            } catch {
                console.log("tryJsonParse fail", this)
            }
            return value;
        }
    }

    static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.substring(1)
    }

    static tryEval(context) {
        let value;
        let expr = this;
        if(context){
            expr = "context." + expr
        }
        try {
            value = eval(expr)
        } catch {
            console.log("tryEval Error", this)
        }
        return value;
    }

    static showTables() {
        let deferred = $.Deferred();
        Rest.showTables().done((resp) => {
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
    }

}