import { Style, Visibility, VisibilityOff } from '@mui/icons-material'
import { AppBar, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Toolbar, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, NavLink, Search, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useForm } from 'react-hook-form';

const theme = createTheme()
function DemoLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  // const handleLogin = () => {
  //   (async () => {
  //     const api = process.env.REACT_APP_BASE_API + "user/login";
  //     const response = await axios.post(api, {
  //       email: email,
  //       password: password
  //     })
  //     console.log('response', response);
  //     if (response.request.status === 200) {
  //       console.log('登入成功');
  //       setShowAlert(true);
  //       setTimeout(()=>{
  //         navigate('/home');
  //       },3000)
  //     }
  //   })()
  // }
  // const handleClickShowPassword = () => setShowPassword((show) => !show);
  // const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  // };
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      // console.log('value:', value, 'name:', name);;
      setEmail(value.email);
      setPassword(value.password);
    })
    //在useEfect如果有監聽的行為要補上取消監聽行為避免重複觸發
    console.log(subscription);//裡面有一個unsubscribe:取消訂閱(監聽)
    return () => { subscription.unsubscribe() }
  }, [watch])
  const onSubmit = (data: any) => {
    (async () => {
      try{
        const api = process.env.REACT_APP_BASE_API + "user/login";
        const response = await axios.post(api, {
          email: email,
          password: password
        })
        if (response.request.status === 200) {
          console.log('登入成功');
          setShowAlert(true);
          localStorage.setItem('email:', email);
          setTimeout(() => {
            navigate('/home');
          }, 3000)
        }
      }catch(error){
        setErrorAlert(true);
        setTimeout(() => {
          window.location.reload(); // 登入失敗後 2 秒重新加載頁面
        }, 2000);
      }
      
    })()
  }
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            AppBar
          </Typography>
          {/* <NavLink className="nav-link" to="/register">註冊</NavLink>
               {/* <Button color = "inherit" onClick={handleRegister}> 註冊 </Button> }
               <Button color = "inherit"> 登入 </Button> */}
        </Toolbar>
      </AppBar>
      <CssBaseline />
      {showAlert && (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" style={{ width: '200px', position: 'fixed', top: 70, left: '50%', marginLeft: '-100px' }}>
          登入成功
        </Alert>
      )}
      {errorAlert && (
        <Alert severity="error"  style={{ width: '200px', position: 'fixed', top: '20%', left: '50%', marginLeft: '-100px' }}>
          登入失敗
        </Alert>
      )}
      <Box
        height='90vh'
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px' }}>
          {/* <FormControl> */}
          <Grid container direction="column" spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <p>還沒有帳號嗎? <a href="/demo/register">註冊</a></p>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl sx={{ width: '100%' }}>
                <TextField
                  type="text"
                  variant='outlined'
                  label="信箱"
                  size="small"
                  {...register('email', {
                    required: {
                      value: true,
                      message: '信箱為必填'
                    },
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: '信箱格式不正確'
                    }
                  })}
                  error={!!errors.email}
                  helperText={errors.email ? (errors.email.message as string | undefined) : ''}
                // sx={{ width: '100%' }}
                // sx={{ width: 'calc(100% + 48px)' }}
                // onChange={(e) => setEmail(e.target.value)}
                // value={email}
                // required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" size='small'>
                <InputLabel htmlFor="outlined-adornment-password">密碼</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="密碼"
                  {...register('password', {
                    required: {
                      value: true,
                      message: '密碼為必填'
                    },
                    minLength: {
                      value: 6,
                      message: '密碼不少於 6 碼',
                    },
                    maxLength: {
                      value: 12,
                      message: '密碼不大於 12 碼',
                    }
                  })}
                  error={!!errors.password}
                // helperText={errors.password ? (errors.password.message as string | undefined) : ''}

                />
                {/* {errors.password && <span>{errors.password.message as string}</span>} */}
                {/* {errors.password ? (errors.password.message as string | undefined) : ''} */}
                {errors.password && (
                  <Typography variant="body2" color="error" sx={{ marginTop:'4px',marginX:'14px',fontSize:'0.75rem' }}>
                    {errors.password && <span>{errors.password.message as string}</span>}
                  </Typography>
                )}
              </FormControl>

            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'right' }}>
              {/* <Button variant="contained" size="small" onClick={() => handleLogin()}>登入</Button> */}
              <Button variant="contained" size="small" type="submit">登入</Button>
            </Grid>
          </Grid>
        </form>
        {/* </div> */}
        {/* </FormControl> */}
        {/* </Box> */}
      </Box>
    </ThemeProvider>
  )
}

export default DemoLogin
