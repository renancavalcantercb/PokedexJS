import React, { useState, useEffect } from "react";
import { Input, Button, Card, Alert, Pagination } from "antd";
import { capitalizeWords, getIdFromUrl } from "./utils";
import { FaStar } from 'react-icons/fa';
import { BiStar } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const paginationBar = (currentPage, setCurrentPage, totalPokemon) => (
  <div style={{ justifyContent: "center", display: "flex" }}>
    <Pagination
      current={currentPage}
      pageSize={15}
      total={totalPokemon}
      onChange={(page) => setCurrentPage(page)}
    />
  </div>
)

const displayError = (error) => (
  <Alert
    message={error}
    type="error"
    style={{ width: "350px", margin: "12px" }}
  />
)

const typeColors = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};

function getTypeColor(type) {
  return typeColors[type];
}

const getTextColor = (pokemon) => {
  const luminance = getBrightness(getTypeColor(pokemon.types[0].type.name));
  return luminance > 0.5 ? "#000000" : "#ffffff";
};


function getBrightness(color) {
  // get r, g, b values
  const r = parseInt(color.substring(1, 3), 16);
  const g = parseInt(color.substring(3, 5), 16);
  const b = parseInt(color.substring(5, 7), 16);

  // calculate relative luminance
  const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return brightness;
}

const pokemonGifUrl = 'https://www.smogon.com/dex/media/sprites/xy/'

const displayPokemonList = (pokemonList, handleSearch) => (
  pokemonList.map((pokemon) => (
    <Card
      key={pokemon.name}
      style={{
        width: 200,
        margin: "12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
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
        description={`Pokemon ID: ${getIdFromUrl(pokemon.url)}`}
        style={{ textAlign: "center" }}
      />
      <Button
        type="primary"
        onClick={() => handleSearch(pokemon.name)}
        style={{ marginTop: "12px", width: "100%" }}
      >
        View
      </Button>
    </Card>
  ))
)

const pokemonDetails = (selectedPokemon, handleClear, toggleFavorite, starIcon) => {
  const textColor = getTextColor(selectedPokemon);
  return (
    <Card
      key={selectedPokemon.name}
      style={{
        width: 300,
        margin: "12px",
        backgroundColor: getTypeColor(selectedPokemon.types[0].type.name)
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        <button onClick={toggleFavorite} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize:"22px" }}>
          {starIcon}
        </button>
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
      <div style={{ display: "flex", justifyContent: "center", width: "100%"}}>
      <Button type="primary" onClick={handleClear} style={{width: "50%" }}>
        Back
      </Button>
      </div>
    </Card>
  )
}

function Pokedex() {
  const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon/";
  const [search, setSearch] = useState("");
  const [pokemonList, setPokemonList] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPokemon, setTotalPokemon] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const starIcon = favorited ? <FaStar /> : <BiStar />;

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get(`${POKEMON_API_URL}?limit=15&offset=${(currentPage - 1) * 15}`);
        setPokemonList(response.data.results);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch Pokemon list");
      }
    };

    if (pageLoaded) {
      fetchPokemonList();
    }

  }, [currentPage, pageLoaded]);

  useEffect(() => {
    const fetchTotalPokemon = async () => {
      try {
        const response = await axios.get(`${POKEMON_API_URL}?limit=1`);
        setTotalPokemon(response.data.count);
        setPageLoaded(true);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch Pokemon list");
      }
    };

    if (!pageLoaded) {
      fetchTotalPokemon();
    }

  }, [pageLoaded]);

  const handleSearch = async (pokemonName) => {
    try {
      const response = await axios.get(`${POKEMON_API_URL}${pokemonName}`);
      setSelectedPokemon(response.data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Pokemon not found");
      setSelectedPokemon(null);
    }
  };

  const handleClear = () => {
    setSearch("");
    setError(null);
    setSelectedPokemon(null);
  };

  const toggleFavorite = () => {
    setFavorited(!favorited);
    const toastStatus = favorited ? "error" : "success";
    const toastText = favorited ? "Pokemon <strong>removed</strong> from favorites!" : "Pokemon <strong>added</strong> to favorites!";
    toast[toastStatus](
      <div dangerouslySetInnerHTML={{ __html: toastText }} />,
      toastText, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined
    });
  };
  

  return (
    <>
      <ToastContainer />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "10px",
        }}
      >
        <Input
          placeholder="Enter Pokemon name or ID"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            if (!event.target.value) {
              handleClear();
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch(event.target.value);
            }
          }}
          allowClear
          style={{ width: 300 }}
        />

        <Button
          type="primary"
          onClick={() => handleSearch(search)}
          style={{ marginLeft: 8 }}
        >
          Search
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          maxWidth: "1200px",
          margin: "0 auto",
          marginTop: "24px",
        }}
      >
        {error && displayError(error)}

        {selectedPokemon ? pokemonDetails(selectedPokemon, handleClear, toggleFavorite, starIcon) : displayPokemonList(pokemonList, handleSearch)}

      </div>
      {!selectedPokemon && paginationBar(currentPage, setCurrentPage, totalPokemon)}
    </>
  );
}


export default Pokedex;

