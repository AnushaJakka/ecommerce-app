import { useEffect, useState } from "react";
import { Grid, Box, Typography, Skeleton } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme/theme";
import CustomAppBar from "../components/AppBar";
import ProductCard from "../components/ProductCard";
import ProductDetailView from "../components/ProductDetailView";
import ShoppingCart from "../components/ShoppingCart";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewCart, setViewCart] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        const uniqueCategories = [...new Set(data.products.map((product) => product.category))];
        setCategories(uniqueCategories);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const groupedProducts = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const adjustQuantity = (productId, quantity) => {
    setCart(cart.map((item) =>
      item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
    ));
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setSelectedProduct(null); 
  };

  if (error)
    return (
      <Typography color="error" align="center" sx={{ p: 4 }}>
        Error: {error}
      </Typography>
    );

  return (
    <ThemeProvider theme={theme}>
      <CustomAppBar
        cartLength={cart.length}
        onToggleCart={() => setViewCart(!viewCart)}
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        categories={categories}
        onSelectCategory={handleSelectCategory}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: { xs: 0, sm: "280px" }, 
          mt: "64px",
        }}
      >
        {viewCart ? (
          <ShoppingCart
            cart={cart}
            onAdjustQuantity={adjustQuantity}
            onRemoveFromCart={removeFromCart}
          />
        ) : selectedProduct ? (
          <ProductDetailView
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            onAddToCart={addToCart}
          />
        ) : loading ? ( 
          <Grid container spacing={3}>
            {[...Array(8)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Skeleton variant="rectangular" width="100%" height={200} sx={{ mb: 2 }} />
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="80%" />
              </Grid>
            ))}
          </Grid>
        ) : (
          Object.entries(groupedProducts).map(([category, products]) => (
            <Box key={category} sx={{ mb: 4 }}>
              {/* <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                {category}
              </Typography> */}
              <Grid container spacing={3}>
                {products.map((product) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                    <ProductCard
                      product={product}
                      onViewDetails={handleViewDetails}
                      onAddToCart={addToCart}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))
        )}
      </Box>
    </ThemeProvider>
  );
};

export default ProductsList;