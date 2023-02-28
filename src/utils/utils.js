import { Alert } from "antd";


function capitalizeWords(str) {
    return str.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
}

function getTypeColor(type) {
    const typeColors = {
        normal: "#A8A77A",
        fire: "#EE8130",
        water: "#6390F0",
        electric: "#F7D02C",
        grass: "#7AC74C",
        ice: "#96D9D6",
        fighting: "#C22E28",
        poison: "#D7A1F9",
        ground: "#E2BF65",
        flying: "#A98FF3",
        psychic: "#F95587",
        bug: "#A6B91A",
        rock: "#B6A136",
        ghost: "#735797",
        dragon: "#6F35FC",
        dark: "#705746",
        steel: "#B7B7CE",
        fairy: "#D685AD"
    }
    return typeColors[type];
}

function getBrightness(color) {
    // get r, g, b values
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);

    // calculate relative luminance
    const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return brightness;
}

function getTextColor(pokemon) {
    const luminance = getBrightness(getTypeColor(pokemon.types[0].type.name));
    return luminance > 0.5 ? "#000000" : "#ffffff";
};

function displayError(error) {
    return (
        <Alert
            message={error}
            type="error"
            style={{ width: "350px" }}
        />
    )
}

function getIdFromUrl(url) {
    const urlParts = url.split("/");
    return urlParts[urlParts.length - 2];
}


export { capitalizeWords, getTypeColor, getBrightness, displayError, getTextColor, getIdFromUrl };