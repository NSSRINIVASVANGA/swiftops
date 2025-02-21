import React from "react";
import { Container, Grid, Card, CardContent, Typography, Button } from "@mui/material";

const plans = [
  {
    title: "Basic",
    price: "$9.99/month",
    features: ["Business ID", "Plan valid for 30days", "follow the subscription for membership plan"],
  },
  {
    title: "Standard",
    price: "$19.99/month",
    features: ["Business ID", "Plan valid for 30days", "follow the subscription for membership plan"],
  },
  {
    title: "Premium",
    price: "$29.99/month",
    features: ["Business ID", "Plan valid for 30days", "follow the subscription for membership plan"],
  },
];

const SubscriptionPlans = () => {
  return (
    <Container sx={{ mt: 5, marginRight:'100px',display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Choose Your Plan
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {plans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ textAlign: "center", p: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {plan.title}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  {plan.price}
                </Typography>
                {plan.features.map((feature, i) => (
                  <Typography key={i} variant="body2" color="textSecondary">
                    {feature}
                  </Typography>
                ))}
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Subscribe
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SubscriptionPlans;