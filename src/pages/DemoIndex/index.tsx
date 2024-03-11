import { AppBar, Button, IconButton, Toolbar, Typography, createStyles, makeStyles } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Link from '@mui/material/Link';

const theme = createTheme();

function DemoIndex() {
  return (
    <ThemeProvider theme={theme}>
       <Box>
         <AppBar position="static">
            <Toolbar>
               <Typography variant = "h4" sx = {{ flexGrow: 1 }}>
                  MateSpark
               </Typography>
               <Link underline="none" href="/demo/register" color = "inherit" marginRight={2}>註冊</Link>
               <br/>
               <Link underline="none" href="/demo/login" color = "inherit" >登入</Link>
            </Toolbar>
         </AppBar>
      </Box>
      <Container component='main' maxWidth='xl'>
        <CssBaseline />
        <Box
          sx={{
            marginTop:10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent:'center',
            alignItems: 'center'
          }}
        >
          <h3 >社交交流，點燃火花</h3>
          <p style={{width:'600px',textAlign:'center',marginTop:'30px'}}>在 MateSpark，我們鼓勵社交交流，讓每個用戶都能在這個充滿活力的網絡社區中找到屬於自己的火花。無論是發布照片、分享故事，還是找到理想中的伴侶，MateSpark 將為您提供獨特且有趣的體驗。</p>
        </Box>
        <Box
          sx={{
            marginTop:10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent:'center',
            alignItems: 'center'
          }}
        >
            <img src="https://i.pinimg.com/474x/a5/f9/66/a5f9662d9cb35efbf12be3c5030c3545.jpg" alt=""  style={{width:'350px',height:'auto',marginRight:'50px'}}/>
            <p style={{ width: '300px' }}>午夜12點，系統會根據您的興趣等，為您精心挑選潛在的夥伴，選擇配對即可進入聊天室進行更深度的交流!</p> 
        </Box>
        <Box
          sx={{
            marginTop:10,
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent:'center',
            alignItems: 'center',
          }}
        >
            <img src="https://i.pinimg.com/474x/7b/14/e2/7b14e215f24d0205783c21a47999c5e8.jpg" alt="" style={{width:'350px',height:'auto',marginRight:'50px'}}/>
            <p style={{ width: '300px' }}>這裡不僅僅是發布貼文和分享心情的地方，更是激發靈感、創造和分享獨特光芒的平台。</p> 
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default DemoIndex
