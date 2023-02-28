import React, { useState, useEffect } from "react";
import { FaStar } from 'react-icons/fa';
import { BiStar } from 'react-icons/bi';
import { toast } from 'react-toastify';

function FavoriteButton({ isFavorite }) {
    const [favorite, setFavorite] = useState(isFavorite);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (mounted) {
            if (favorite) {
                toast.success(`Added to favorites`);
            } else {
                toast.success(`Removed from favorites`);
            }
        } else {
            setMounted(true);
        }
    }, [favorite]);

    const handleToggleFavorite = () => {
        setFavorite(!favorite);
    }

    return (
        <button onClick={handleToggleFavorite} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '22px' }}>
            {favorite ? <FaStar /> : <BiStar />}
        </button>
    );
}

export default FavoriteButton;
