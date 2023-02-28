import React, { useState, useEffect } from "react";
import { Card, Button, Typography, message } from "antd";
import { capitalizeWords } from "../utils/utils";
import { useNavigate } from "react-router-dom";

function FavoriteList() {
    const [favoritePokemons, setFavoritePokemons] = useState([]);

    const pokemonGifUrl = "https://www.smogon.com/dex/media/sprites/xy/";
    const navigate = useNavigate();
    const { Title } = Typography;


    useEffect(() => {
        const fetchFavoritePokemons = async () => {
            const favoritePokemonIds = JSON.parse(localStorage.getItem("favoritePokemon")) || {};
            const favoriteIds = Object.keys(favoritePokemonIds);

            const pokemonPromises = favoriteIds.map((id) =>
                fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                    .then((response) => response.json())
            );

            const pokemons = await Promise.all(pokemonPromises);
            setFavoritePokemons(pokemons);
        };

        if (!favoritePokemons.length && (!localStorage.getItem("favoritePokemon") || localStorage.getItem("favoritePokemon") === "{}")) {
            return message.info("You don't have any favorite pokemon yet");
        }

        fetchFavoritePokemons();
    }, [favoritePokemons.length]);


    return (
        <div>
            <Title level={2} style={{ marginTop: "12px", display: "flex", justifyContent: "center" }}>
                Favorite Pokemons
            </Title>
            <div style={{ justifyContent: "center", display: "flex" }}>
                {favoritePokemons.map((pokemon) => (
                    <Card
                        key={pokemon.name}
                        className="pokemon-card"
                        cover={
                            <img
                                alt={pokemon.name}
                                src={`${pokemonGifUrl}${pokemon.name
                                    }.gif`}
                                style={{ width: "100px", height: "100px", marginTop: "12px" }}
                            />
                        }
                    >
                        <Card.Meta
                            title={capitalizeWords(pokemon.name)}
                            description={`Pokemon ID: ${pokemon.id}`}
                            style={{ textAlign: "center" }}
                        />
                        <Button
                            type="primary"
                            onClick={() => navigate(`/pokemon/${pokemon.name}`)}
                            style={{ marginTop: "12px", width: "100%" }}
                        >
                            View
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default FavoriteList;
