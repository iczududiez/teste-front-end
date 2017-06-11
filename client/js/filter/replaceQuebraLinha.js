angular.module("app").filter("replaceQuebraLinha", function replaceQuebraLinha(){
    return function(input){
        return input ? input.replace(/\n/g,"<br>") : input;
    }
});