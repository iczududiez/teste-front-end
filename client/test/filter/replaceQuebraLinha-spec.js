describe('replaceQuebraLinha', function() {
    var $filter, replaceQuebraLinha;

    beforeEach(function() {
        module('app');

        inject(function ($injector){
            $filter = $injector.get('$filter');
            replaceQuebraLinha = $filter('replaceQuebraLinha');
        });
    });

    it('Deve retorna undefined quando passado undefined',function(){
        expect(replaceQuebraLinha(undefined)).toBeUndefined();
    });

    it('Deve retorna null quando passado null', function() {
        expect(replaceQuebraLinha(null)).toBeNull();
    });

    it('Deve retorna false quando passado false', function() {
        expect(replaceQuebraLinha(false)).toBe(false);
    });

    it('Deve retrona um erro quando passado um tipo diferente de String', function() {
        expect(function (){ replaceQuebraLinha(1123123) }).toThrowError('input.replace is not a function');
        expect(function (){ replaceQuebraLinha(12313.123) }).toThrowError('input.replace is not a function');
        expect(function (){ replaceQuebraLinha(true) }).toThrowError('input.replace is not a function');
        expect(function (){ replaceQuebraLinha({}) }).toThrowError('input.replace is not a function');
    });

    it('Deve retorna a string identica se a mesma não conter \n', function() {
        var testString = "teste teste";
        expect(replaceQuebraLinha(testString)).toEqual(testString);
    });

    it('Deve retorna a string modificando todas as ocorrencias de \n por <br>', function() {
        expect(replaceQuebraLinha("teste\nteste\n\nteste")).toEqual("teste<br>teste<br><br>teste");
    });   
});