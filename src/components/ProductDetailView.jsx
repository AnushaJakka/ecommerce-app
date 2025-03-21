import React, { useState } from "react";
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
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
  IconButton,
  useMediaQuery,
  useTheme,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import MultiStepCheckout from "./MultiStepCheckout";

const ProductDetailView = ({ product, onBack, onAddToCart }) => {
  const [buyNowOpen, setBuyNowOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); 
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const handleBuyNowClick = () => {
    setBuyNowOpen(true);
  };

  const handleBuyNowClose = () => {
    setBuyNowOpen(false);
  };

  const handleAddToCart = () => {
    onAddToCart(product); 
    setSnackbarOpen(true); 
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); 
  };

  
  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }

  return (
    <>
      <Card sx={{ maxWidth: 1200, margin: "auto", position: "relative" }}>
        <IconButton
          aria-label="close"
          onClick={onBack}
          sx={{
            position: "absolute",
            left: 16,
            top: 16,
            color: "black.500",
            "&:hover": {
              backgroundColor: "rgba(16, 3, 3, 0.81)",
            },
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>

        <Grid container spacing={isMobile ? 2 : 4}>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              image={product.thumbnail}
              alt={product.title}
              sx={{
                borderRadius: 2,
                height: isMobile ? 200 : 400,
                objectFit: "cover",
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CardContent>
              <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
                {product.title}
              </Typography>

              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <Rating value={product.rating} precision={0.5} readOnly size={isMobile ? "small" : "medium"} />
                <Typography variant="body2">
                  ({product.reviews?.length} reviews)
                </Typography>
                <Chip
                  label={product.stock > 0 ? "In Stock" : "Out of Stock"}
                  color={product.stock > 0 ? "success" : "error"}
                  size="small"
                />
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <Typography variant={isMobile ? "h4" : "h3"} color="primary">
                  ${product.price}
                </Typography>
                <Typography
                  variant={isMobile ? "body1" : "h6"}
                  color="text.secondary"
                  sx={{ textDecoration: "line-through" }}
                >
                  ${(
                    product.price /
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                </Typography>
                <Chip
                  label={`Save ${product.discountPercentage}%`}
                  color="secondary"
                  size={isMobile ? "small" : "medium"}
                />
              </Stack>

              <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                {product.description}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Product Details
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>ID:</strong> {product.id || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Brand:</strong> {product.brand || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Sku:</strong> {product.sku || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Weight:</strong> {product.weight} kg
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Dimensions:</strong> {product.dimensions.width}cm (W) x {product.dimensions.height}cm (H) x {product.dimensions.depth}cm (D)
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Customer Reviews
                </Typography>
                {product.reviews?.length > 0 ? (
                  <List>
                    {product.reviews.map((review, index) => (
                      <ListItem key={index}>
                        <ListItemAvatar>
                          <Avatar>{review.reviewerName.charAt(0)}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={review.reviewerName}
                          secondary={
                            <>
                              <Typography variant="body2">{review.reviewerEmail}</Typography>
                              <Rating value={review.rating} readOnly size="small" />
                              <Typography variant="body2">{review.comment}</Typography>
                              <Typography variant="body2">{review.date}</Typography>
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2">No reviews yet.</Typography>
                )}
              </Box>

              <Stack direction={isMobile ? "column" : "row"} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleAddToCart} 
                  fullWidth={isMobile}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleBuyNowClick}
                  fullWidth={isMobile}
                >
                  Buy Now
                </Button>
              </Stack>
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        TransitionComponent={SlideTransition}
        message="Item added to cart!"
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: theme.palette.success.main,
            color: theme.palette.success.contrastText,
          },
        }}
      />

     
      <MultiStepCheckout open={buyNowOpen} onClose={handleBuyNowClose} product={product} />
    </>
  );
};

export default ProductDetailView;