import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Carousel from 'react-material-ui-carousel'

const ProductCard = (props) => {

  return (
    <Card sx={{ maxWidth: 250 }}>
      <Carousel autoPlay={false}>
        {
          props.data.image_urls.map((image_url, index) =>
            <CardMedia
              key={index}
              component="img"
              image={image_url}
              alt={image_url}
            />
          )
        }
      </Carousel>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h7"
            sx={{
              marginBottom: '1.35em',
              display: "block",
              maxHeight: '50px',
              textOverflow: 'ellipsis',
              overflow: "hidden"
            }} >
            {props.data.product_title}
          </Typography>

          <Typography gutterBottom variant="subtitle2">
            {"Price: " + props.data.price + " " + props.data.currency_code}
          </Typography>
          <Typography gutterBottom variant="subtitle2" align="right">
            {"Stock: " + props.data.stock}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;