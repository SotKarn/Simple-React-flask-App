import { Grid } from '@mui/material';
import ProductCard from './ProductCard';

const ProductContainer = (props) => {

  return (
    <div className="product_list_container" data-testid="product_list_container">
        {
          props.productList.length > 0 ?
          (
              <Grid
              marginTop={3}
              container
              alignItems="center"
              justifyContent="center"
              style={{ minHeight: '100vh' }}
              data-testid="product_list_grid"
              key={"grid_" + props.search_query}
              spacing={4}>
              {props.productList.map(product => (
                    <Grid data-testid="grid_item" item key={"grid_item_" + product.product_id}>
                        <ProductCard key={product.product_id} data={product}/>
                    </Grid>
              ))}
              </Grid>
          ) : (<h2 data-testid="empty_product_list" >No Products Found</h2>)
        }
    </div>
  );
}

export default ProductContainer;