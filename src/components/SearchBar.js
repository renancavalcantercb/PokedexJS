import { Input, AutoComplete } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../SearchBar.css';
import { toast } from 'react-toastify';

function SearchBar() {
    const [searchValue, setSearchValue] = useState('');
    const [options, setOptions] = useState([]);
    const navigate = useNavigate();

    const handleClear = () => {
        setSearchValue('');
        setOptions([]);
        navigate('/');
    };

    const searchPokemon = () => {
        if (searchValue) {
            navigate(`/pokemon/${searchValue}`);
        } else {
            handleClear();
            toast.warning('Please enter a Pokemon name or ID');
        }
    };

    async function getSuggestions(value) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1000`);
        const data = await response.json();
        const pokemons = data.results.map(pokemon => pokemon.name);
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : pokemons.filter(pokemon =>
            pokemon.toLowerCase().slice(0, inputLength) === inputValue
        );
    }

    const onSearch = async value => {
        setOptions(value ? await getSuggestions(value) : []);
    };

    const onSelect = value => {
        setSearchValue(value);
        navigate(`/pokemon/${value}`);
    };

    const onChange = value => {
        setSearchValue(value);
    };

    const renderOption = item => {
        return {
            value: item,
            label: item,
        };
    };

    return (
        <div className="pokemon-input">
            {<AutoComplete
                options={options.map(renderOption)}
                onSearch={onSearch}
                onSelect={onSelect}
                value={searchValue}
                onChange={onChange}
                style={{ width: 350 }}

                placeholder="Enter Pokemon name or ID"
            >
                <Input.Search
                    enterButton="Search"
                    allowClear
                    onSearch={value => value ? searchPokemon() : handleClear()}
                />
            </ AutoComplete>}
        </div>
    );
}

export default SearchBar;
