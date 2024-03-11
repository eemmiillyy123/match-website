import * as React from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CreateIcon from '@mui/icons-material/Create';
import { Container, Divider, Drawer, Fab, ThemeProvider, createTheme } from '@mui/material';
import Cardblock from '@/components/Cardblock';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import HomeNavbar from '@/components/HomeNavbar';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useEffect} from 'react'

const theme = createTheme();
function PrimarySearchAppBar() {
    // Drawer
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [list, setList] = React.useState({});
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleBoard=(s:String)=>{

    }
    //AppBar
    const pathToAddPost = () => {
        navigate('/addPost');
    }

    useEffect(() => {
    (async () => {
        try{
          const api = process.env.REACT_APP_BASE_API + "getposts";
          const response = await axios.get(api);
          console.log(response.data);
          setList(response.data);
          
        //   list=response.data;
        //   if (response.request.status === 200) {
        //     setTimeout(() => {
        //       navigate('/home');
        //     }, 3000)
        //   }
        }catch(error){
        //   setErrorAlert(true);
        //   setTimeout(() => {
        //     window.location.reload(); // 登入失敗後 2 秒重新加載頁面
        //   }, 2000);
        }
        
      })()
    }, [])
    console.log("list",list);
   
    return (
        <ThemeProvider theme={theme}>
            <HomeNavbar/>
             {/* 檢查 postList 是否為空， title和context都不能為空 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Cardblock list={list}/>
            </Box> 
            
            {/* 新增貼文的加號按鈕 */}
            <Box sx={{ '& > :not(style)': { m: 1 }, position: 'fixed', bottom: 30, right: 20 }}>
                <Fab color="primary" aria-label="add" onClick={() => pathToAddPost()}>
                    <AddIcon />
                </Fab>
            </Box>
        </ThemeProvider>
    );
}
export default PrimarySearchAppBar


