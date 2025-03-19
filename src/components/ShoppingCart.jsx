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
  } from "@mui/material";
  
  const ShoppingCart = ({ cart, onAdjustQuantity, onRemoveFromCart }) => {
    return (
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Shopping Cart
        </Typography>
        {cart.length === 0 ? (
          <Typography>Your cart is empty.</Typography>
        ) : (
          <List>
            {cart.map((item, index) => (
              <Box key={index}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      src={item.thumbnail}
                      variant="square"
                      sx={{ width: 60, height: 60, mr: 2 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.title}
                    secondary={`$${item.price} x ${item.quantity}`}
                  />
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => onAdjustQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </Button>
                  <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => onAdjustQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => onRemoveFromCart(item.id)}
                    sx={{ ml: 2 }}
                  >
                    Remove
                  </Button>
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