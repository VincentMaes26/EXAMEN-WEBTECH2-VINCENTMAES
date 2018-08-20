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
            pokemonSrv.getPokemon().then(function(data){
                for(var i = 0; i < data.length; i++){
                    if(pokemonSrv.getPokemon(data[i])== null)
                    saveSrv.setPokemon(data[i].name, data[i]);
                };
            },function(err){
              alert('Pokemon not found');  
            });
            
            
            $("#searchButton").on("click", function(){
                var date1 = Date.parse($('#date1').val());
                var date2 = Date.parse($('#date2').val());
                var pokemonList = [];
                pokemonSrv.getPokemon().then(function(data){
                    for(var i = 0; i<data.length; i++){
                        if(Date.parse(data[i].owned) >= date1 && Date.parse(data[i].owned)<=date2){
                            pokemonList.push(data[i]);
                        };
                    };
                    $scope.pokemon = pokemonList;
                }, function(err){
                    alert('Not found');
                });
                
            });
        });  
    })

    .service('pokemonSrv', function($http, $q){
        this.getPokemon = function(){
            var q = $q.defer();
            var url = 'http://localhost:5984/pokemon/87794933bbcea92d7f500c1f03006642';

            $http.get(url)
                .then(function(data){
                     var pokemon = data.data.docs;
                    //console.log(pokemon);
                    //console.log(typeof pokemon);
                    var pokemonList = [];
                    for(var i=0; i < pokemon.length; i++){
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
        this.getPokemon = function(key){
            var q = $q.defer();
            $http.get('../../' + key)
                .then(function(data){
                    q.resolve(data);
                }, function(err){
                    q.reject(err);
                });
            return q.promise;
        };

        this.getAllPokemon = function(){
            var q = $q.defer();
            $http.get('../../_all_docs')
            .then(function(data){
                q.resolve(data);
            }, function(err){
                q.reject(err);
            });
            return q.promise;
        };

        this.setPokemon = function(key, value){
            $http.put('../../' + key, value);
        };
    })