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
            var pokemonList = pokemonSrv.getPokemon();
            for(var i = 0; i < pokemonList.length; i++){
                saveSrv.setPokemon(pokemonList[i].name, pokemonList[i]);
            };
            
        });

        $('#searchButton').on('click', function(e){
            var date1 = Date.parse($('#date1').val());
            var date2 = Date.parse($('#date2').val());
            
        })

    })

    .service('pokemonSrv', function($http, $q){
        this.getPokemon = function(){
            var q = $q.defer();
            var url = 'http://localhost:5984/pokemon/87794933bbcea92d7f500c1f03006642';

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