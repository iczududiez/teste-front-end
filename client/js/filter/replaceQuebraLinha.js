angular.module("app").filter("replaceQuebraLinha", function replaceQuebraLinha(){
    return function(input){
        return input.replace(/\n/g,"<br>");
    }
});
console.log("HIHIHI");