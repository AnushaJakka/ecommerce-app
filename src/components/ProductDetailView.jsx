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
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; 

const ProductDetailView = ({ product, onBack, onAddToCart }) => {
  return (
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

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            image={product.thumbnail}
            alt={product.title}
            sx={{ borderRadius: 2, height: 400, objectFit: "cover" }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {product.title}
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <Rating value={product.rating} precision={0.5} readOnly />
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
              <Typography variant="h3" color="primary">
                ${product.price}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ textDecoration: "line-through" }}
              >
                $
                {(
                  product.price /
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}
              </Typography>
              <Chip
                label={`Save ${product.discountPercentage}%`}
                color="secondary"
                size="medium"
              />
            </Stack>

            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              {product.description}
            </Typography>

            {/* Additional Product Details */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Product Details
              </Typography>
              <Typography variant="body2">
                <strong>ID:</strong> {product.id || "N/A"}
              </Typography>
              <Typography variant="body2">
                <strong>Brand:</strong> {product.brand || "N/A"}
              </Typography>
              <Typography variant="body2">
                <strong>Sku:</strong> {product.sku || "N/A"}
              </Typography>
              <Typography variant="body2">
                <strong>Weight:</strong> {product.weight} kg
              </Typography>
              <Typography variant="body2">
                <strong>Dimensions:</strong> {product.dimensions.width}cm (W) x {product.dimensions.height}cm (H) x {product.dimensions.depth}cm (D)
              </Typography>
              <Typography variant="body2">
                <strong>Warranty:</strong> {product.warrantyInformation || "N/A"}
              </Typography>
              <Typography variant="body2">
                <strong>Shipping:</strong> {product.shippingInformation || "N/A"}
              </Typography>
              <Typography variant="body2">
                <strong>AvailabilityStatus:</strong> {product.availabilityStatus || "N/A"}
              </Typography>
              <Typography variant="body2">
                <strong>Return Policy:</strong> {product.returnPolicy || "N/A"}
              </Typography>
              <Typography variant="body2">
                <strong>MinimumOrderQuantity:</strong> {product.minimumOrderQuantity || "N/A"}
              </Typography>
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

            <Button
              variant="contained"
              size="large"
              onClick={() => onAddToCart(product)}
              sx={{ mr: 2 }}
            >
              Add to Cart
            </Button>
            <Button variant="outlined" size="large">
              Buy Now
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProductDetailView;