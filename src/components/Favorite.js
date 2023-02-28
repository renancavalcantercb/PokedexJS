import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { BiStar } from "react-icons/bi";
import { toast } from "react-toastify";

function FavoriteButton({ id }) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favoritePokemon = JSON.parse(localStorage.getItem("favoritePokemon")) || {};
        const isPokemonFavorite = favoritePokemon[id];

        setIsFavorite(!!isPokemonFavorite);
    }, [id]);

    const handleToggleFavorite = () => {
        setIsFavorite(!isFavorite);

        const favoritePokemon = JSON.parse(localStorage.getItem("favoritePokemon")) || {};
        favoritePokemon[id] = !isFavorite;

        if (!isFavorite) {
            toast.success(`Added to favorites`);
        } else {
            delete favoritePokemon[id];
            toast.success(`Removed from favorites`);
        }

        localStorage.setItem("favoritePokemon", JSON.stringify(favoritePokemon));
    };

    return (
        <button onClick={handleToggleFavorite} style={{ backgroundColor: "transparent", border: "none", cursor: "pointer", fontSize: "22px" }}>
            {isFavorite ? <FaStar /> : <BiStar />}
        </button>
    );
}

export default FavoriteButton;
