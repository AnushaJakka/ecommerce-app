import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Divider,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const ShoppingCart = ({ cart, onAdjustQuantity, onRemoveFromCart }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Shopping Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <List>
          {cart.map((item, index) => (
            <Box key={index}>
              <ListItem sx={{ flexDirection: isMobile ? "column" : "row", alignItems: "center" }}>
                <ListItemAvatar sx={{ display: "flex", justifyContent: "center", mb: isMobile ? 2 : 0 }}>
                  <Avatar
                    src={item.thumbnail}
                    variant="square"
                    sx={{
                      width: isMobile ? 80 : 60,
                      height: isMobile ? 80 : 60,
                      objectFit: "contain",
                      backgroundColor: "#fff"
                    }}
                    alt={item.title}
                  />
                </ListItemAvatar>

                <ListItemText
                  primary={item.title}
                  secondary={`$${item.price} x ${item.quantity}`}
                  sx={{ flex: 1, textAlign: isMobile ? "center" : "left" }}
                />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: isMobile ? 2 : 0,
                    justifyContent: isMobile ? "center" : "flex-start",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => onAdjustQuantity(item.id, item.quantity - 1)}
                    size={isMobile ? "small" : "medium"}
                  >
                    -
                  </Button>
                  <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => onAdjustQuantity(item.id, item.quantity + 1)}
                    size={isMobile ? "small" : "medium"}
                  >
                    +
                  </Button>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: isMobile ? "center" : "flex-start",
                    mt: isMobile ? 2 : 0,
                    ml: isMobile ? 0 : 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => onRemoveFromCart(item.id)}
                    size={isMobile ? "small" : "medium"}
                  >
                    Remove
                  </Button>
                </Box>
              </ListItem>
              <Divider />
            </Box>
          ))}

          <ListItem>
            <ListItemText
              primary="Total"
              secondary={`$${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}`}
            />
          </ListItem>
        </List>
      )}
    </Paper>
  );
};

export default ShoppingCart;
