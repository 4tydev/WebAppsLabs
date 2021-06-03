var express = require('express');
var app = express();
var axios = require('axios').default;
var body_parser = require('body-parser');
var cors = require('cors')
var pokemon_map = new Map();

app.use(body_parser.urlencoded({extended: false}));
app.use(cors());

app.route('/queryForm').post((req,res)=>{
    var pokemon_obj;
    if(pokemon_map.has(req.body.name)){
        console.log("initializing map...")
        res.send(pokemon_map.get(req.body.name))
    }
    else{
        const URL = 'https://pokeapi.co/api/v2/pokemon/' + req.body.name;
    
        axios.get(URL).then(pokemonResponse => {
            let pokemon_data = pokemonResponse.data;
            let pokemon_name = pokemon_data.name;
            let pokemon_image = pokemon_data.sprites.front_default;
            let pokemon_weight = pokemon_data.weight;
            pokemon_obj = {
                'name' : pokemon_name,
                'image': pokemon_image,
                'weight': pokemon_weight
            }
            pokemon_map.set(req.body.name,pokemon_obj);
            res.send(pokemon_obj);
    
        }).catch(function(error){
        console.log(error);
        res.status(400).send("There was a problem with the server")
        })
    }
    

})

app.listen(3000,()=>{
    console.log('listening localhost:3000');
} )