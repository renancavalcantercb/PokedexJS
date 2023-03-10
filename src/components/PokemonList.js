import React, { useState, useEffect } from "react";
import { Card, Button, Pagination } from "antd";
import { capitalizeWords, getIdFromUrl } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from './SearchBar';
import '../index.css'

function PokemonList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(15);
  const { pokemonList } = useSelector((state) => state);

  const pokemonGifUrl = "https://www.smogon.com/dex/media/sprites/xy/";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const paginationBar = () => {
    const handlePageChange = (page) => {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    };

    return (
      <div style={{ justifyContent: "center", display: "flex" }}>
        <Pagination
          current={currentPage}
          pageSize={paginationSize}
          total={1000}
          pageSizeOptions={["10", "15", "20", "30", "40"]}
          onShowSizeChange={(current, size) => setPaginationSize(size)}
          onChange={handlePageChange}
        />
      </div>
    );
  };


  useEffect(() => {
    const fetchPokemonList = (page) => {
      const offset = (page - 1) * paginationSize;
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=${paginationSize}&offset=${offset}`)
        .then((response) => response.json())
        .then((data) => {
          dispatch({ type: "SET_POKEMON_LIST", payload: data.results });
        });
    };

    fetchPokemonList(currentPage);
  }, [currentPage, paginationSize, dispatch]);


  return (
    <>
      <SearchBar />
      <div className="body-list">
        <div className="pokemon-list">
          {pokemonList.map((pokemon) => (
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
                description={`Pokemon ID: ${getIdFromUrl(pokemon.url)}`}
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
        {paginationBar()}
      </div>
    </>
  );
}

export default PokemonList;