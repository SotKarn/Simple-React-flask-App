import { Button } from '@mui/material';
import ErrorSnackBar from './ErrorSnackBar';
import React from 'react'
import ProductContainer from './ProductContainer';

const Search = () => {

    const [searchInput, setSearchInput] = React.useState("");
    const [productList, setProductList] = React.useState([]);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [snackBarIsopen, setSnackBarIsopen] = React.useState(false);
    const [showResults, setShowResults] = React.useState(false);

    const snackBarCloseCallback = () => {
        setSnackBarIsopen(false)
    }

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    const getProductResults = async () => {
        try {
            var response = await fetch("http://localhost:5000/api/v1/products/search?query=" + searchInput);
            if (response.ok) {
                var jsonList = await response.json()
                setProductList(jsonList);
                setShowResults(true);
            }
            else {
                var response_json = await response.json()
                throw new Error(response_json.message);
            }
        } catch (err) {
            setErrorMessage(err.message);
            setSnackBarIsopen(true);
        }
    }

    const handlSearchClick = (e) => {
        e.preventDefault();
        getProductResults()
    };

    return (<div>
        {
            errorMessage && <ErrorSnackBar open={snackBarIsopen} data={errorMessage} onClose={snackBarCloseCallback} />
        }

        <div className="search_container" data-testid="search_container">
            <input className="search_input" data-testid="search_input_field" type="text" onChange={handleChange} placeholder="What are you looking for?" />
        </div>
        <Button variant="contained" data-testid="search_button" onClick={handlSearchClick}>Search</Button>
        {showResults && <ProductContainer key={searchInput} search_query={searchInput} productList={productList} />}
    </div>
    )
}

export default Search;
