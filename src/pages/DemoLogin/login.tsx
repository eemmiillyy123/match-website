import { Style, Visibility, VisibilityOff } from '@mui/icons-material'
import { AppBar, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Toolbar, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from 'axios'
import { useState } from 'react'
import { Link, NavLink, Search ,useNavigate  } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';


const theme = createTheme()
function DemoLogin() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    (async () => {
      const api = process.env.REACT_APP_BASE_API + "user/login";
      const response = await axios.post(api, {
        email: email,
        password: password
      })
      console.log('response', response);
      if (response.request.status === 200) {
        console.log('登入成功');
        setShowAlert(true);
        setTimeout(()=>{
          navigate('/home');
        },3000)
        
        // <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        //   登入成功
        // </Alert>
      }
    })()
  }
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <AppBar position="static">
          <Toolbar>
            {/* sx = {flexGrow: 1} allows us to set all content at right except typography */}
            <Typography variant="h4" sx={{ flexGrow: 1 }}>
              AppBar
            </Typography>
            {/* <NavLink className="nav-link" to="/register">註冊</NavLink>
               {/* <Button color = "inherit" onClick={handleRegister}> 註冊 </Button> }
               <Button color = "inherit"> 登入 </Button> */}
          </Toolbar>
        </AppBar>
      </Box>
      
      <Container component='main' maxWidth='xl'>
        <CssBaseline />
            {showAlert && (
              <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" style={{ width: '200px', position: 'fixed', top: 70, left: '50%', marginLeft: '-100px' }}>
                登入成功
              </Alert>
            )}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          
          
          <FormControl>
            <Grid container direction="column" spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  variant='outlined'
                  label="信箱"
                  size="small"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  variant='outlined'
                  label="密碼"
                  size="small"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />

              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'right' }}>
                <Button variant="contained" size="small" onClick={() => handleLogin()}>登入</Button>
              </Grid>
            </Grid>
          </FormControl>
        </Box>

      </Container>
    </ThemeProvider>
  )
}

export default DemoLogin
