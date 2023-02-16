import React, { useState, useEffect } from "react";
import { Input, Button, Card, Alert, Pagination } from "antd";
import { capitalizeWords, getIdFromUrl } from "./utils";
import axios from "axios";

const paginationBar = (currentPage, setCurrentPage, totalPokemon) => (
    <div style={{ justifyContent: "center", display: "flex" }}>
      <Pagination
        current={currentPage}
        pageSize={12}
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

const displayPokemonList = (pokemonList, handleSearch) => (
  pokemonList.map((pokemon, index) => (
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
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIdFromUrl(
            pokemon.url
          )}.png`}
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

const pokemonDetails = (selectedPokemon, handleClear) => (
  <Card
    key={selectedPokemon.name}
    style={{
      width: 300,
      margin: "12px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
    cover={
      <img
        alt={selectedPokemon.name}
        src={selectedPokemon.sprites.front_default}
        style={{ width: "150px", height: "150px", marginTop: "12px" }}
      />
    }
  >
    <Card.Meta
      title={capitalizeWords(selectedPokemon.name)}
      description={`
      Pokemon ID: ${selectedPokemon.id},
      Weight: ${selectedPokemon.weight / 10}kg,
      Height: ${selectedPokemon.height / 10}m,
      Types: ${selectedPokemon.types.map((type) => capitalizeWords(type.type.name)).join(", ")}
      `}
      style={{ textAlign: "center" }}
    />
    <Button type="primary" onClick={handleClear} style={{ marginTop: "12px", width: "100%" }}>
      Back
    </Button>
  </Card>
)

function Pokedex() {
  const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon/";
  const [search, setSearch] = useState("");
  const [pokemonList, setPokemonList] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPokemon, setTotalPokemon] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get(`${POKEMON_API_URL}?limit=12&offset=${(currentPage - 1) * 12}`);
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

  return (
    <>
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
          maxWidth: "960px",
          margin: "0 auto",
          marginTop: "24px",
        }}
      >
        {error && displayError(error)}

        {selectedPokemon ? pokemonDetails(selectedPokemon, handleClear) : displayPokemonList(pokemonList, handleSearch)}

      </div>
      {!selectedPokemon && paginationBar(currentPage, setCurrentPage, totalPokemon)}
    </>
  );
}


export default Pokedex;

