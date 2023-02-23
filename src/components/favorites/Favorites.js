import React, { useState } from "react";
import { FaStar } from 'react-icons/fa';
import { BiStar } from 'react-icons/bi';

function FavoriteButton({ isFavorite, onToggle }) {
    const [favorite, setFavorite] = useState(isFavorite);

    const handleToggle = () => {
        const newFavorite = !favorite;
        setFavorite(newFavorite);
        onToggle(newFavorite);
    };

    return (
        <button onClick={handleToggle} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: "22px" }}>
            {favorite ? <FaStar /> : <BiStar />}
        </button>
    );
}

export default FavoriteButton;
