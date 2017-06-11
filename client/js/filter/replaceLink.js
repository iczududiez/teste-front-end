angular.module("app").filter("replaceLink", function(){
    return function(input){
        return input ? input.replace(/(http(s{0,1}):\/\/[\w\d\.\/\-=?&%]*)/ig,"<a href='$1'>$1</a>") : input;
    }
});