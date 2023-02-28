import React, { useState, useEffect } from "react";
import { FaStar } from 'react-icons/fa';
import { BiStar } from 'react-icons/bi';
import { toast } from 'react-toastify';

function FavoriteButton({ isFavorite }) {
    const [favorite, setFavorite] = useState(isFavorite);
    const [shouldNotify, setShouldNotify] = useState(false);

    useEffect(() => {
        if (shouldNotify) {
            if (favorite) {
                toast.success(`Added to favorites`);
            } else {
                toast.success(`Removed from favorites`);
            }
            setShouldNotify(false);
        }
    }, [favorite, shouldNotify]);

    const handleToggleFavorite = () => {
        setFavorite(!favorite);
        setShouldNotify(true);
    }

    return (
        <button onClick={handleToggleFavorite} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '22px' }}>
            {favorite ? <FaStar /> : <BiStar />}
        </button>
    );
}

export default FavoriteButton;
