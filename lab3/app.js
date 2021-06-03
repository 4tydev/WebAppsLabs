var express = require('express');
var app = express();
var axios = require('axios').default;
var body_parser = require('body-parser');
var cors = require('cors')

app.use(body_parser.urlencoded({extended: false}));
app.use(cors());

app.route('/').post((req,res)=>{
    const URL = 'https://pokeapi.co/api/v2/pokemon/' + req.body.name;
    
    axios.get(URL).then(pokemonResponse => {
        let pokemon_data = pokemonResponse.data;
        let pokemon_name = pokemon_data.name;
        let pokemon_image = pokemon_data.sprites.front_default;
        let pokemon_weight = pokemon_data.weight;
        let pokemon_obj = {
            'name' : pokemon_name,
            'image': pokemon_image,
            'weight': pokemon_weight
        }
        res.send(pokemon_obj);
    
    }).catch(error){
        console.log(error);
        res.status(400).send("There was a problem with the server")
    }

})

app.listen(3000,()=>{
    console.log('listening localhost:3000');
} )