import { Box, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, Stack, TextField, Typography, circularProgressClasses, colors } from "@mui/material";
import React, { useState, useEffect } from "react";
import { images } from "../assets";
import { useNavigate } from "react-router-dom";
import Animate from "../components/common/Animate";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const [onRequest, setOnRequest] = useState(false);
  const [loginProgress, setLoginProgress] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    const validateForm = () => {
      const isValidEmail = validateEmail(email);
      setEmailError(isValidEmail ? "" : "Email format should be valid");
      return email !== "" && firstName !== "" && lastName !== "" && password !== "" && isValidEmail;
    };

    setIsFormValid(validateForm());
  }, [email, firstName, lastName, password]);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const onSignin = async (e) => {
    e.preventDefault();
    setOnRequest(true);
    // setIsLoading(true); 

    const interval = setInterval(() => {
      setLoginProgress(prev => prev + 100 / 40);
    }, 50);

    try {
      const response = await fetch('http://localhost:8022/api/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setIsTransitioning(true);
        

        setTimeout(() => {
          setIsLoggedIn(true);
          setIsLoading(false);
          navigate("/dashboard");
        }, 1000); 
      } else {
        toast.error(data.message || 'Login failed');
        setIsLoading(false); 
      }
    } catch (error) {
      toast.error('An error occurred');
      setIsLoading(false); 
    } finally {
      clearInterval(interval);
      setOnRequest(false);
      setLoginProgress(0);
    }
  };

  const onRegister = async (e) => {
    e.preventDefault();
    setOnRequest(true);
    setIsLoading(true); 

    const interval = setInterval(() => {
      setLoginProgress(prev => prev + 100 / 40);
    }, 50);

    const payload = {
          email,
          username:username,
          first_name: firstName,
          last_name: lastName,
          password,
    };

    try {
      const response = await fetch('http://localhost:8022/api/users/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Registration successful! Please log in.');
        setIsRegistering(false);
        setIsLoggedIn(false);
        setOnRequest(false);
        setIsLoading(false); 
        setLoginProgress(0);
      } else {
        toast.error(data.message || 'Registration failed');
        setIsLoading(false); 
      }
    } catch (error) {
      toast.error('An error occurred');
      setIsLoading(false); 
    } finally {
      clearInterval(interval);
      setOnRequest(false);
      setLoginProgress(0);
    }
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <Box
      position="relative"
      height="100vh"
      sx={{ "::-webkit-scrollbar": { display: "none" } }}
    >
      <ToastContainer />

      {/* background box */}
      <Box sx={{
        position: "absolute",
        right: 0,
        height: "100%",
        width: "70%",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${images.loginBg})`
      }} />
      {/* background box */}

      {/* Form container */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          height: "100%",
          width: isLoggedIn ? "100%" : { xl: "30%", lg: "40%", md: "50%", xs: "100%" },
          transition: "all 1s ease-in-out",
          bgcolor: colors.common.white,
          // opacity: isTransitioning ? 0 : 1, 
        }}
      >
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          opacity: isLoggedIn ? 0 : 1,
          transition: "all 0.3s ease-in-out",
          height: "100%",
          "::-webkit-scrollbar": { display: "none" }
        }}>
          {/* logo */}
          <Box sx={{ textAlign: "center", p: 5 }}>
            <Animate type="fade" delay={0.5}>
              <img src={images.logo} alt="logo" height={60}></img>
            </Animate>
          </Box>
          {/* logo */}

          {/* form */}
          <Box sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "::-webkit-scrollbar": { display: "none" }
          }}>
            <Animate type="fade" sx={{ maxWidth: 400, width: "100%" }}>
              {!isRegistering ? (
                <Box component="form" maxWidth={400} width="100%" onSubmit={onSignin}>
                  <Stack spacing={3}>
                    <TextField label="Username" fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />
                    <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button type="submit" size="large" variant="contained" color="success">
                      Sign in
                    </Button>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Remember me" />
                      </FormGroup>
                      <Typography color="error" fontWeight="bold">
                        <Button variant="text" onClick={() => { /* handle forgot password */ }}>
                          Forgot password?
                        </Button>
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              ) : (
                <Box component="form" maxWidth={400} width="100%" onSubmit={onRegister}>
                  <Stack spacing={3}>
                    <TextField
                      label="Email"
                      fullWidth
                      value={email}
                      onChange={handleEmailChange}
                      error={!!emailError}
                      helperText={emailError}
                    />
                     <TextField label="Username" fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />
                    <TextField label="First Name" fullWidth value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <TextField label="Last Name" fullWidth value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button type="submit" size="large" variant="contained" color="success" disabled={!isFormValid}>
                      Register
                    </Button>
                  </Stack>
                </Box>
              )}
            </Animate>
          </Box>
          {/* form */}

          {/* footer */}
          <Box sx={{ textAlign: "center", p: 5, zIndex: 2 }}>
            <Animate type="fade" delay={1}>
              <Typography
                display="inline"
                fontWeight="bold"
                sx={{ "& > button": { color: colors.red[900], ml: "5px", cursor: 'pointer', background: 'none', border: 'none', padding: 0, font: 'inherit', textDecoration: 'underline' } }}
                onClick={toggleForm}
              >
                {isRegistering ? (
                  <>Already have an account? <button>Sign in</button></>
                ) : (
                  <>Don't have an account? <button>Register now</button></>
                )}
              </Typography>
            </Animate>
          </Box>
          {/* footer */}

          {/* loading box */}
          {onRequest && (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                height: "100%",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                bgcolor: colors.common.white,
                zIndex: 1000
              }}
            >
              <Box position="relative">
                <CircularProgress
                  variant="determinate"
                  sx={{ color: colors.grey[200] }}
                  size={100}
                  value={100}
                />
                <CircularProgress
                  variant="determinate"
                  disableShrink
                  value={loginProgress}
                  size={100}
                  sx={{
                    [`& .${circularProgressClasses.circle}`]: {
                      strokeLinecap: "round"
                    },
                    position: "absolute",
                    left: 0,
                    color: colors.green[600]
                  }}
                />
              </Box>
            </Stack>
          )}
          {/* loading box */}
        </Box>
      </Box>
      {/* Form container */}
    </Box>
  );
};

export default LoginPage;
