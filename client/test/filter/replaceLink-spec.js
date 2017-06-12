describe('replaceLink', function() {
    var $filter, replaceLink;

    beforeEach(function() {
        module('app');

        inject(function ($injector){
            $filter = $injector.get('$filter');
            replaceLink = $filter('replaceLink');
        });
    });

    it('Deve retorna undefined quando passado undefined',function(){
        expect(replaceLink(undefined)).toBeUndefined();
    });

    it('Deve retorna null quando passado null', function() {
        expect(replaceLink(null)).toBeNull();
    });

    it('Deve retorna false quando passado false', function() {
        expect(replaceLink(false)).toBe(false);
    });

    it('Deve retrona um erro quando passado um tipo diferente de String', function() {
        expect(function (){ replaceLink(1123123) }).toThrowError('input.replace is not a function');
        expect(function (){ replaceLink(12313.123) }).toThrowError('input.replace is not a function');
        expect(function (){ replaceLink(true) }).toThrowError('input.replace is not a function');
        expect(function (){ replaceLink({}) }).toThrowError('input.replace is not a function');
    });

    it('Deve retorna a string identica se a mesma não for identificada como url pela regex /(http(s{0,1}):\/\/[\w\d\.\/\-=?&%]*)/ig', function() {
        var testString = "teste teste";
        expect(replaceLink(testString)).toEqual(testString);
    });

    it('Deve retorna a string colocando todas as urls em <a> tag html', function() {
        expect(replaceLink("http://teste.com?id=teste&top=sucess-error testando replaceLink https://wwww.site.com e htt://www.naoValido.com"))
        .toEqual("<a href='http://teste.com?id=teste&top=sucess-error'>http://teste.com?id=teste&top=sucess-error</a> testando replaceLink <a href='https://wwww.site.com'>https://wwww.site.com</a> e htt://www.naoValido.com");
    });   
});