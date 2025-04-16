import React from "react";
import { useTheme } from '@mui/material/styles';
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

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const ProductCard = ({ product, onViewDetails, onAddToCart }) => {
  const theme = useTheme();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleAddToCartClick = () => {
    onAddToCart(product);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Updated button styles
  const containedButtonStyle = {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    transition: 'all 0.3s ease',
  };

  const outlinedButtonStyle = {
    borderColor: theme.palette.secondary.main,
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      borderColor: theme.palette.secondary.dark,
    },
    transition: 'all 0.3s ease',
  };

  return (
    <div>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.3s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 3,
          },
        }}
      >
        <Box sx={{ 
          position: "relative",
          height: "200px",
          width: "100%",
          overflow: 'hidden'
        }}>
          <CardMedia
            component="img"
            
            image={product.thumbnail}
            alt={product.title}
            sx={{ 
              width: '100%',
              height: '100%',
              objectFit: "contain",
              objectPosition: "center",
              transition: 'transform 0.3s ease',
              '&:hover, &:active': {
                transform: 'scale(1.20)'
              },
              '@media (pointer: coarse)': {
                transition: 'transform 0.3s ease', // Faster transition for mobile
                touchAction: 'manipulation' // Better touch handling
              }
            }}
          />
          <Chip
            label={`${product.discountPercentage}% OFF`}
            color="secondary"
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              fontWeight: 'bold'
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
              fontWeight: 'bold'
            }}
          />
        </Box>

        <CardContent sx={{ 
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
          <Box>
            <Typography 
              gutterBottom 
              variant="h6"
              sx={{
                mt: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                minHeight: '6px'
              }}
            >
              {product.title}
            </Typography>
            
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                mb: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}
            >
              {product.brand}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mb: 1, alignItems: 'center' }}>
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
          </Box>

          <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => onViewDetails(product)}
              sx={containedButtonStyle}
            >
              View Details
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleAddToCartClick}
              sx={outlinedButtonStyle}
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
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: theme.shadows[4],
          }
        }}
      />
    </div>
  );
};

export default ProductCard;