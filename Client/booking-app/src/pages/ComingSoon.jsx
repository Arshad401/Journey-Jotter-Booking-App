import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const ComingSoonPage = () => {
  return (
    <>
      <Navbar />
      <Header type="list" />
      <Container maxWidth="lg">
        <Box my={8}>
          <Typography variant="h1" align="center">
            Coming Soon!
          </Typography>
          <Typography variant="body1" align="center">
            We are currently working on this feature. Please stay tuned for
            updates!
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default ComingSoonPage;
