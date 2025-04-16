import { useEffect, useState } from "react";
import { Box, Typography, Skeleton, ThemeProvider } from "@mui/material";
import baseTheme, { darkTheme } from "../theme/theme";
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
  const [toggleDark, setToggleDark] = useState(false);

  const currentTheme = toggleDark ? darkTheme : baseTheme;

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setCategories([...new Set(data.products.map(p => p.category))]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    existingItem 
      ? setCart(cart.map(item => 
          item.id === product.id ? {...item, quantity: item.quantity + 1} : item
        ))
      : setCart([...cart, {...product, quantity: 1}]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const adjustQuantity = (productId, quantity) => {
    setCart(cart.map(item => 
      item.id === productId ? {...item, quantity: Math.max(1, quantity)} : item
    ));
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setSelectedProduct(null);
    setViewCart(false);
  };

  if (error) {
    return (
      <Typography color="error" align="center" sx={{ p: 4 }}>
        Error: {error}
      </Typography>
    );
  }
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };
  return (
    <ThemeProvider theme={currentTheme}>
     
     <CustomAppBar
        cartLength={cart.length}
        onToggleCart={() => setViewCart(!viewCart)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categories={categories}
        onSelectCategory={handleSelectCategory}
        setToggleDark={setToggleDark}
        toggleDark={toggleDark}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: { xs: 0, sm: "280px" },
          mt: "64px",
          color: 'text.primary',
          minHeight: '100vh',
          position: 'relative',
          
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
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)"
              },
              gap: 2,
            }}
          >
            {[...Array(8)].map((_, index) => (
              <Box key={index}>
                <Skeleton variant="rectangular" height={200} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="80%" />
              </Box>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",         
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)", 
              },
              gap: 2,
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={handleViewDetails}
                onAddToCart={addToCart}
              />
            ))}
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default ProductsList;