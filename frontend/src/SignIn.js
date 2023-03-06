import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Profile from './Profile';
import axios from 'axios';
// const SignInTab = () => {
//   const [email, setEmail] = useState("")
//   const [fname, setFname] = useState("")
//   // const [uname, setUname] = useState("")
//   // const [lname, setLname] = useState("")
//   // const [phno, setPhno] = useState("")
//   // const [error, setError] = useState("\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0")
//   // const [errorph, setErrorph] = useState("\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0")
//   const [pwd, setPwd] = useState('');
//   const [isRevealPwd, setIsRevealPwd] = useState(false);
// }



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// localStorage.setItem('logged', '0');
const theme = createTheme();

export default function SignIn(props) {
  const [Disabling, setDisabling] = useState(true);
  // const [tab,setTab] = useState(false);
  // console.log(tab);
  const navigate = useNavigate();
  const [mail, chmail] = useState('');
  const [pass, chpass] = useState('');
  // function changeTab()
  //  {
  //   setTab(true);
  //   // return <SignUp 
  //  }
  function changemail(e) {
    const val = e.nativeEvent.data;
    if (val !== null)
      chmail(mail + val);
    if (pass !== '') {
      setDisabling(false);
    }
  }
  function changepass(e) {
    const val = e.nativeEvent.data;
    if (val !== null)
      chmail(pass + val);
    if (mail !== '') {
      setDisabling(false);
    }
  }
  const handleSubmit = (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const signdata =
    {
      email: data.get('email'),
      password: data.get('password'),
    };
    console.log(signdata);
    if (signdata.email === '' || signdata.password === '') {
      setDisabling(true);
    }
    // Send email and password to Backend for verification
    else{
      localStorage.setItem('email', signdata.email);
      check();
    }

   function check() {
      console.log("entered check")
      axios.post('/api/login', { email: signdata.email, password: signdata.password })
        .then(data => {
          console.log("Data is", data.data);
          if (data.data.id) {
            console.log('correct');
            localStorage.setItem('logged', "1");
            localStorage.setItem('id', data.data.id);
            navigate("/profile");
          }
          else {
            alert("Wrong Credentials!");
          }
        });
    
  }

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={changemail}
            ></TextField>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={changepass}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
        /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={Disabling}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <button variant="body2" onClick={props.switch}>
                  Don't have an account? Sign Up
                  {/* {tab ? <SignUp /> : <SignIn />} */}
                </button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}


