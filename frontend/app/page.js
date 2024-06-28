'use client'
import React, { Suspense, useEffect, useState } from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function Home() {
  const router = useRouter();
  const [userData, setUserData] = useState({ name: "" });

  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await fetch('http://localhost:4000/users/me', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) return;

        const data = await res.json();
        if (res.ok) setUserData({ name: data.name });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);

  async function logout() {

    try {
      const res = await fetch('http://localhost:4000/users/logout', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("email");
      setUserData({ name: "" });

      const data = await res.json();
      if (res.ok) setUserData({ name: data.name });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        textAlign="center"
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome
        </Typography>
        <Suspense fallback={<Typography variant="h6" component="h2" gutterBottom>
          Loadingg...
        </Typography>}>
          {userData.name.length !== 0 ? (
            <>
              <Typography variant="h6" component="h2" gutterBottom>
                {userData.name}
              </Typography>
              <Box mt={4} width="100%">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{ marginBottom: 2 }}
                  onClick={logout}
                >
                  Logout
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h6" component="h2" gutterBottom>
                Please login or sign up to continue
              </Typography>
              <Box mt={4} width="100%">
                <Link href="/login" passHref>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{ marginBottom: 2 }}
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register" passHref>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    size="large"
                  >
                    Sign Up
                  </Button>
                </Link>
              </Box>
            </>
          )}
        </Suspense>
      </Box>
    </Container>
  );
}
