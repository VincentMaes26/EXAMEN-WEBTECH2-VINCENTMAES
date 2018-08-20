'use strict'

angular.module('pokemonApp', ['ngRoute'])

    .config(function($routeProvider){
        $routeProvider
            .when('/home', {
                templateUrl: 'views/home.html',
                controller: 'homeCtrl'
            })
            .otherwise({redirectTo: '/home'});
    })

    .controller('homeCtrl', function($scope, pokemonSrv, saveSrv){
        $(function(){
            for(var i = 0; i<)
            saveSrv.getPokemon
        })
    })

    .service('pokemonSrv', function($http, $q){
        this.getPokemon = function(id){
            var q = $q.defer();
            var url = 'http://localhost:5984/_utils/index.html#database/pokemon/87794933bbcea92d7f500c1f03006642';

            $http.get(url)
                .then(function(data){
                    var pokemon = data.data[0].docs;
                    var pokemonList = [];
                    for(var i; i < pokemon.length; i++){
                        pokemonList.push(pokemon[i]);
                    }
                    q.resolve(pokemonList);
                }, function(err){
                    q.reject(err);
                });
                return q.promise;
        };

    })

    .service('saveSrv', function($http, $q){
        this.getPokemon = function(name){
            var q = $q.defer();
            $http.get('../../' + key)
                .then(function(data){
                    q.resolve(data);
                }, function(err){
                    q.reject(err);
                });
            return q.promise;
        };

        this.setPokemon = function(key, value){
            $http.put('../../0' + key, value);
        }
    })