import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
  Tabs,
  Tab,
  Divider,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  FormHelperText,
  InputAdornment,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import {
  Home,
  Person,
  Email,
  Phone,
  LocationCity,
  CreditCard,
  AccountBalance,
  Payment,
} from "@mui/icons-material";

const steps = ["Delivery Address", "Payment Options", "Order Summary"];

const paymentOptions = [
  { value: "upi", label: "UPI", icon: <Payment fontSize="small" /> },
  { value: "cards", label: "Credit/Debit Card", icon: <CreditCard fontSize="small" /> },
  { value: "netbanking", label: "Net Banking", icon: <AccountBalance fontSize="small" /> },
  { value: "wallet", label: "Wallet", icon: <Payment fontSize="small" /> },
];

const banks = [
  { name: "State Bank of India", code: "SBI" },
  { name: "HDFC Bank", code: "HDFC" },
  { name: "ICICI Bank", code: "ICICI" },
  { name: "Axis Bank", code: "AXIS" },
];

const initialAddress = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

const initialPayment = {
  upiId: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
  bank: "",
  saveCard: false,
};

const MultiStepCheckout = ({ open, onClose, product }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState("upi");
  const [address, setAddress] = useState(initialAddress);
  const [paymentDetails, setPaymentDetails] = useState(initialPayment);
  const [errors, setErrors] = useState({});

  const validateAddress = () => {
    const newErrors = {};
    if (!address.name.trim()) newErrors.name = "Name is required";
    if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(address.email))
      newErrors.email = "Invalid email address";
    if (!/^\d{10}$/.test(address.phone)) newErrors.phone = "Invalid phone number";
    if (!address.address.trim()) newErrors.address = "Address is required";
    if (!address.city.trim()) newErrors.city = "City is required";
    if (!address.state.trim()) newErrors.state = "State is required";
    if (!/^\d{6}$/.test(address.pincode)) newErrors.pincode = "Invalid pincode";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors = {};
    if (selectedPayment === "upi" && !/^\w+@\w+$/.test(paymentDetails.upiId))
      newErrors.upiId = "Invalid UPI ID";
    if (selectedPayment === "cards") {
      if (!/^\d{16}$/.test(paymentDetails.cardNumber))
        newErrors.cardNumber = "Invalid card number";
      if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(paymentDetails.expiry))
        newErrors.expiry = "Invalid expiry date";
      if (!/^\d{3}$/.test(paymentDetails.cvv)) newErrors.cvv = "Invalid CVV";
    }
    if (selectedPayment === "netbanking" && !paymentDetails.bank)
      newErrors.bank = "Please select a bank";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (activeStep === 0 && !validateAddress()) return;
    if (activeStep === 1 && !validatePayment()) return;
    if (activeStep === steps.length - 1) handleFinish();
    else setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleFinish = () => {
    onClose();
    // Reset form
    setAddress(initialAddress);
    setPaymentDetails(initialPayment);
    setActiveStep(0);
    alert("Order placed successfully!");
  };

  const renderAddressForm = () => (
    <Grid container spacing={3} sx={{ mt: 1 }}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Full Name"
          value={address.name}
          onChange={(e) => setAddress({ ...address, name: e.target.value })}
          error={!!errors.name}
          helperText={errors.name}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={address.email}
          onChange={(e) => setAddress({ ...address, email: e.target.value })}
          error={!!errors.email}
          helperText={errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Phone"
          type="tel"
          value={address.phone}
          onChange={(e) => setAddress({ ...address, phone: e.target.value })}
          error={!!errors.phone}
          helperText={errors.phone}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Phone />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Address"
          multiline
          value={address.address}
          onChange={(e) => setAddress({ ...address, address: e.target.value })}
          error={!!errors.address}
          helperText={errors.address}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Home />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label="City"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
          error={!!errors.city}
          helperText={errors.city}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationCity />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label="State"
          value={address.state}
          onChange={(e) => setAddress({ ...address, state: e.target.value })}
          error={!!errors.state}
          helperText={errors.state}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
      <TextField
    fullWidth
    label="State"
    value={address.state}
    onChange={(e) => setAddress({ ...address, state: e.target.value })}
    error={!!errors.state}
    helperText={errors.state}
   
        />
      </Grid>
    </Grid>
  );

  const renderPaymentOptions = () => (
    <Box sx={{ mt: 2 }}>
      <Tabs
        value={selectedPayment}
        onChange={(e, value) => setSelectedPayment(value)}
        variant="scrollable"
        scrollButtons="auto"
      >
        {paymentOptions.map((option) => (
          <Tab
            key={option.value}
            value={option.value}
            icon={option.icon}
            label={option.label}
            sx={{ textTransform: "none" }}
          />
        ))}
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {selectedPayment === "upi" && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="UPI ID"
                placeholder="yourname@upi"
                value={paymentDetails.upiId}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, upiId: e.target.value })}
                error={!!errors.upiId}
                helperText={errors.upiId || "e.g. john@oksbi"}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<Payment />}
                disabled={!paymentDetails.upiId}
                onClick={() => window.open(`upi://pay?pa=${paymentDetails.upiId}`)}
              >
                Pay via UPI Apps
              </Button>
            </Grid>
          </Grid>
        )}

        {selectedPayment === "cards" && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                value={paymentDetails.cardNumber}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                error={!!errors.cardNumber}
                helperText={errors.cardNumber}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CreditCard />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Expiry Date"
                placeholder="MM/YY"
                value={paymentDetails.expiry}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, expiry: e.target.value })}
                error={!!errors.expiry}
                helperText={errors.expiry}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="CVV"
                type="password"
                value={paymentDetails.cvv}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                error={!!errors.cvv}
                helperText={errors.cvv}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={paymentDetails.saveCard}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, saveCard: e.target.checked })}
                  />
                }
                label="Save card for future payments"
              />
            </Grid>
          </Grid>
        )}

        {selectedPayment === "netbanking" && (
          <RadioGroup value={paymentDetails.bank} sx={{ gap: 2 }}>
            {banks.map((bank) => (
              <Box
                key={bank.code}
                sx={{
                  border: 1,
                  borderRadius: 1,
                  borderColor: paymentDetails.bank === bank.name ? "primary.main" : "divider",
                  p: 2,
                }}
              >
                <FormControlLabel
                  value={bank.name}
                  control={<Radio />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar sx={{ bgcolor: "primary.main", width: 35, height: 35, fontSize:"10px"}}>
                        {bank.code}
                      </Avatar>
                      <Typography>{bank.name}</Typography>
                    </Box>
                  }
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, bank: e.target.value })}
                />
              </Box>
            ))}
            {errors.bank && <FormHelperText error>{errors.bank}</FormHelperText>}
          </RadioGroup>
        )}
      </Box>
    </Box>
  );

  const renderOrderSummary = () => (
    <Box>
      <List>
        <ListItem>
          <ListItemText
            primary="Delivery Address"
            secondary={
              <>
                <Typography variant="body2" color="text.primary">
                  {address.name}
                </Typography>
                {address.address}<br />
                {address.city}, {address.state} - {address.pincode}<br />
                Phone: {address.phone}
              </>
            }
          />
        </ListItem>
        <Divider sx={{ my: 2 }} />

        <ListItem>
          <ListItemText
            primary="Payment Method"
            secondary={
              paymentOptions.find((opt) => opt.value === selectedPayment)?.label
            }
          />
        </ListItem>
        <Divider sx={{ my: 2 }} />

        <ListItem>
          <ListItemText
            primary="Order Total"
            secondary={
              <>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Original Price:</span>
                  <span>${product.price}</span>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Discount ({product.discountPercentage}%):</span>
                  <span>-${(product.price * product.discountPercentage / 100).toFixed(2)}</span>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                  <Typography variant="subtitle1">Total Amount:</Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
                  </Typography>
                </Box>
              </>
            }
          />
        </ListItem>
      </List>

      <Box sx={{ mt: 2, p: 2, bgcolor: "action.hover", borderRadius: 1 }}>
        <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Chip label="Note" color="info" size="small" />
          Your order will be shipped within 3-5 business days
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 2 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>
                <Typography variant="subtitle2">{label}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </DialogTitle>

      <DialogContent dividers>
        {activeStep === 0 && renderAddressForm()}
        {activeStep === 1 && renderPaymentOptions()}
        {activeStep === 2 && renderOrderSummary()}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={handleBack}
          disabled={activeStep === 0}
          variant="outlined"
          size="large"
        >
          Back
        </Button>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNext}
          sx={{ ml: 2 }}
        >
          {activeStep === steps.length - 1 ? "Place Order" : "Continue"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MultiStepCheckout;