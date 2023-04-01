import { Button } from '@mui/material';
import ErrorSnackBar from './ErrorSnackBar';
import React, {useState} from 'react'
import ProductContainer from './ProductContainer';

const Search = () => {

    const [searchInput, setSearchInput] = useState("");
    const [productList, setProductList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [snackBarIsopen, setSnackBarIsopen] = useState(false);
    const [showResults, setShowResults] =  useState(false);

    const snackBarCloseCallback = () => {
        setSnackBarIsopen(false)
    }

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    const getProductResults = async () => {
       try{
            var response = await fetch("http://localhost:5000/api/v1/products/search?query=" + searchInput);
            if(response.ok){
                var jsonList = await response.json()
                setProductList(jsonList);
                setShowResults(true);
            }
            else{
                var response_json = await response.json()
                throw new Error(response_json.message);
            }
        }catch(err) {
            console.log(err);
            setErrorMessage(err.message);
            setSnackBarIsopen(true);
        }
    }

    const handlClick = (e) => {
        e.preventDefault();
        getProductResults()
    };

    return (<div>
                {
                errorMessage && <ErrorSnackBar data-testid="error_snackbar" open={snackBarIsopen} data={errorMessage} onClose={snackBarCloseCallback}/>
                }

                <div className="search_container" data-testid="search_container">
                    <input className="search_input" data-testid="search_input_field" type="text" onChange={handleChange} placeholder="What are you looking for?"/>
                </div>
                <Button variant="contained" data-testid="search_button" onClick={handlClick}>Search</Button>
                { showResults && <ProductContainer key={searchInput} search_query={searchInput} productList={productList}/>}
              </div>
      )
}

export default Search;
