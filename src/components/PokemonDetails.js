import React, { useState, useEffect } from "react";
import { Button, Card } from "antd";
import { capitalizeWords, getTypeColor, displayError } from "../utils/utils";
import axios from "axios";
import FavoriteButton from "./Favorite";
import { useParams, useNavigate } from "react-router-dom";
import SearchBar from './SearchBar';

function PokemonDetail() {
    const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon/";
    const pokemonGifUrl = 'https://www.smogon.com/dex/media/sprites/xy/'
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const { idOrName } = useParams();

    useEffect(() => {
        const handleSearch = async (pokemonName) => {
            try {
                const response = await axios.get(`${POKEMON_API_URL}${pokemonName}`);
                setSelectedPokemon(response.data);
                setIsLoading(false);
            } catch (error) {
                setSelectedPokemon(null);
                setIsLoading(false);
            }
        };

        handleSearch(idOrName);
    }, [idOrName]);

    const textColor = 'white'
    return (
        <>
            <SearchBar />
            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                {isLoading ? (
                    <h1>Loading...</h1>
                ) : selectedPokemon ? (
                    <Card
                        key={selectedPokemon.name}
                        style={{
                            width: 300,
                            margin: "12px",
                            backgroundColor: getTypeColor(selectedPokemon.types[0].type.name)
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                            <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                                <FavoriteButton pokemon={selectedPokemon} />
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: "12px" }}>
                            <img
                                alt={selectedPokemon.name}
                                src={pokemonGifUrl + selectedPokemon.name + '.gif'}
                                style={{ width: "150px", height: "150px", margin: "auto" }}
                            />
                        </div>
                        <Card.Meta
                            title={<span style={{ color: textColor }}>{capitalizeWords(selectedPokemon.name) + ' Nº' + selectedPokemon.id}</span>}
                            description={
                                <>
                                    <p style={{ color: textColor }}>Weight: {selectedPokemon.weight / 10}kg</p>
                                    <p style={{ color: textColor }}>Height: {selectedPokemon.height / 10}m</p>
                                    <p style={{ color: textColor }}>Types: {selectedPokemon.types.map((type) => capitalizeWords(type.type.name)).join(", ")}</p>
                                    <p style={{ color: textColor }}>Abilities: {selectedPokemon.abilities.map((ability) => capitalizeWords(ability.ability.name)).join(", ")}</p>
                                </>
                            }
                            style={{ textAlign: "center" }}
                        />
                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <Button type="primary" style={{ width: "45%" }} onClick={() => navigate('/pokemon/' + parseInt(selectedPokemon.id - 1))}>
                                Previous
                            </Button>
                            <Button type="primary" style={{ width: "45%" }} onClick={() => navigate('/pokemon/' + parseInt(selectedPokemon.id + 1))}>
                                Next
                            </Button>
                        </div>
                    </Card>
                ) : (
                    displayError("Pokemon not found")
                )
                }
            </div>
        </>
    );
}

export default PokemonDetail;