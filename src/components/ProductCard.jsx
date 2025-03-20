import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Rating,
  Stack,
  Box,
} from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

const ProductCard = ({ product, onViewDetails, onAddToCart }) => {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleAddToCartClick = () => {
    onAddToCart(product);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }

  return (
    <div>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 3,
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="200"
            image={product.thumbnail}
            alt={product.title}
            sx={{ objectFit: "cover" }}
          />
          <Chip
            label={`${product.discountPercentage}% OFF`}
            color="secondary"
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
            }}
          />
          <Chip
            label={product.stock > 0 ? "In Stock" : "Out of Stock"}
            color={product.stock > 0 ? "success" : "error"}
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {product.brand}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <Rating value={product.rating} precision={0.5} size="small" readOnly />
            <Typography variant="body2">({product.rating}/5)</Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h6" color="primary">
              ${product.price}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: "line-through" }}
            >
              $
              {(
                product.price /
                (1 - product.discountPercentage / 100)
              ).toFixed(2)}
            </Typography>
          </Stack>

          <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => onViewDetails(product)}
            >
              View Details
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleAddToCartClick}
            >
              Add to Cart
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        TransitionComponent={SlideTransition}
        autoHideDuration={2000}
        message="Item added to cart!"
      />
    </div>
  );
};

export default ProductCard;