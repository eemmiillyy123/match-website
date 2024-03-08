import { Alert, AppBar, Button, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Toolbar, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { FormControl } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';
import { useForm } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material'
const theme = createTheme()

function DemoRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      setName(value.username);
      setEmail(value.email);
      setPassword(value.password);
    })
    return () => { subscription.unsubscribe() }
  }, [watch])

  const onSubmit = (data: any) => {
    (async () => {
      const api = process.env.REACT_APP_BASE_API + "user/register";
      try{
        const response = await axios.post(api,
          {
            username: name,
            email: email,
            password: password
          }
        );
        if (response.request.status === 201) {
          console.log('註冊成功，即將前往登入頁面');
          setShowAlert(true);
          setTimeout(() => {
            navigate('/login');
          }, 3000)
        }
      }catch(error){
        setErrorAlert(true);
      }
    })();
  };
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            AppBar
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        height='90vh'
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CssBaseline />
        {showAlert && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" style={{ width: '300px', position: 'fixed', top: '15%', left: '50%', marginLeft: '-100px' }}>
            註冊成功，即將前往登入頁面
          </Alert>
        )}
         {errorAlert && (
          <Alert severity="error" style={{ width: '300px', position: 'fixed', top: '15%', left: '50%', marginLeft: '-100px' }}>
            註冊失敗，請再試一次。
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', maxWidth: '400px' }}>
          <Grid container direction="column" spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <p>已經有帳號了嗎? <a href="/demo/login">登入</a></p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                variant='outlined'
                label="使用者名稱"
                size="small"
                {...register('username', { required: true })}
                error={!!errors.username}
                helperText={errors.username ? '使用者名稱為必填' : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: '25ch' }} variant="outlined" size='small'>
                <InputLabel htmlFor="outlined-adornment-password">密碼</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={(e) => {
                          
                          handleClickShowPassword();
                      }}
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
                />
                {errors.password && (
                  <Typography variant="body2" color="error" sx={{ marginTop: '4px', marginX: '14px', fontSize: '0.75rem' }}>
                    {errors.password && <span>{errors.password.message as string}</span>}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: '25ch' }} variant="outlined" size='small'>
                  <InputLabel htmlFor="outlined-adornment-password">再次輸入密碼</InputLabel>
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
                    label="再次輸入密碼"
                    {...register('confirmPassword', {
                      required: {
                        value: true,
                        message: '再次輸入密碼為必填'
                      },
                      minLength: {
                        value: 6,
                        message: '再次輸入密碼不少於 6 碼',
                      },
                      maxLength: {
                        value: 12,
                        message: '再次輸入密碼不大於 12 碼',
                      },
                      validate: (value) => value === password || '密碼和再次輸入密碼需一致'
                    })}
                    error={!!errors.confirmPassword} 
                  />
                  {errors.confirmPassword && (
                    <Typography variant="body2" color="error" sx={{ marginTop: '4px', marginX: '14px', fontSize: '0.75rem' }}>
                      {errors.confirmPassword && <span>{errors.confirmPassword.message as string}</span>}
                    </Typography>
                  )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" size="small" type="submit">註冊</Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </ThemeProvider>
  )
}
export default DemoRegister;
