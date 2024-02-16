import { AppBar, Button, FormHelperText, IconButton, Input, InputLabel, TextField, Toolbar, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Search } from 'react-router-dom'
import { FormControl } from '@mui/material';
import { useState } from 'react'
import axios from 'axios'

const theme = createTheme()

function DemoRegister() {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const handleRegister = () => {
    console.log('regiter');
    (async()=>{
      // console.log(process.env.REACT_APP_PATH);//看一下環境變數是否有正常取得
      const api=process.env.REACT_APP_BASE_API+"user/register";
      console.log('api',api);
      // const path=process.env.REACT_APP_PATH;
      const result=await axios.post(api,
        {
          username:name,
          email:email,
          password:password
        }
        // ,{
        // headers: { 
        //   // 'x-apikey': '59a7ad19f5a9fa0808f11931',
        //   'Access-Control-Allow-Origin' : '*',
        //   'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        // }}
    );
      // const result=await axios.get('https://randomuser.me/api/');
      //前方定義一個變數 再搭配await取得promise結果
      console.log(result);
      // console.log(param);
    })();
  
  }
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <AppBar position="static">
          <Toolbar>
            {/* sx = {flexGrow: 1} allows us to set all content at right except typography */}
            <Typography variant="h4" sx={{ flexGrow: 1 }}>
              AppBar
            </Typography>
            {/* <Button color="inherit" onClick={handleRegister}> 註冊 </Button>
            <Button color="inherit"> 登入 </Button> */}
          </Toolbar>
        </AppBar>
      </Box>
      <Container component='main' maxWidth='xl'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Box component='form' noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <h1>Hello</h1>
              </Grid>
            </Grid>
          </Box> */}
          <FormControl>
            <Grid container direction="column"  spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  variant='outlined'
                  label="使用者名稱"
                  size="small"
                  // console.log(e)
                  onChange={e=>setName(e.target.value)}
                  value={name}
                  required
                />
                {/* {name} */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  variant='outlined'
                  label="信箱"
                  size="small"
                  onChange={e=>setEmail(e.target.value)}
                  value={email}
                  required
                />
              </Grid>
              {/* {email} */}
              <Grid item xs={12}>
                <TextField
                  type="password"
                  variant='outlined'
                  label="密碼"
                  size="small"
                  onChange={e=>setPassword(e.target.value)}
                  value={password}
                  required
                />
              </Grid>
              {/* {password} */}
              <Grid item xs={12} sx={{ textAlign: 'right' }}>
                <Button variant="contained" size="small" onClick={()=>handleRegister()}>註冊</Button>
              </Grid>
            </Grid>
          
            {/* <TextField
              type="text"
              variant='outlined'
              // color='secondary'
              label="使用者名稱"
              // onChange={e => setFirstName(e.target.value)}
              // value={firstName}
              size="small"
              // fullWidth
              required
            />
            <Grid container justifyContent="flex-end" className='MuiGrid-spacing-xs-10'>
              <Button variant="contained" className="text-right" size="small">註冊</Button>
            </Grid> */}
          </FormControl>
        </Box>
        
      </Container>
    </ThemeProvider>
  )
}

export default DemoRegister
