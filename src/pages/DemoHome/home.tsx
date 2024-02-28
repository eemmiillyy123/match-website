import * as React from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CreateIcon from '@mui/icons-material/Create';
import { Container, Divider, Drawer, Fab, ThemeProvider, createTheme } from '@mui/material';
import Cardblock from '@/components/Cardblock';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import HomeNavbar from '@/components/HomeNavbar';
import { useSelector } from 'react-redux';
import { PostListState } from '../../slice/listSlice'; // 导入 PostListState 类型
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactIcon from '@mui/icons-material/ContactSupport';
import axios from 'axios';
import { useEffect} from 'react'
const theme = createTheme();
function PrimarySearchAppBar() {
    // Drawer
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleBoard=(s:String)=>{

    }
    // const drawer = (
    //     <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
    //         <Typography variant="h6" sx={{ my: 2 }}>
    //             所有看板
    //         </Typography>
    //         <Divider />
    //         <List>
    //             <ListItem button onClick={()=>handleBoard("音樂看板")}>
    //                 <ListItemIcon>
    //                     <HomeIcon />
    //                 </ListItemIcon>
    //                 <ListItemText primary="音樂看板" />
    //             </ListItem>
    //             <ListItem button>
    //                 <ListItemIcon>
    //                     <InfoIcon />
    //                 </ListItemIcon>
    //                 <ListItemText primary="星座看板" />
    //             </ListItem>
    //             <ListItem button>
    //                 <ListItemIcon>
    //                     <ContactIcon />
    //                 </ListItemIcon>
    //                 <ListItemText primary="NEC員工專屬看板" />
    //             </ListItem>
    //         </List>
    //     </Box>
    // );
    const [list, setList] = React.useState({});

    //AppBar
    const navigate = useNavigate();
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
    // const postList = useSelector((state: { postList: PostListState[] }) => state.postList);
   
    return (
        <ThemeProvider theme={theme}>
            <HomeNavbar/>
            {/* <HomeNavbar menuId={menuId} handleProfileMenuOpen={handleProfileMenuOpen} mobileMenuId={mobileMenuId} handleMobileMenuOpen={handleMobileMenuOpen} renderMobileMenu={renderMobileMenu} renderMenu={renderMenu}></HomeNavbar> */}
             {/* <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                            onClick={handleDrawerToggle}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            MUI
                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={4} color="error">
                                    <PersonAddIcon />
                                </Badge>
                            </IconButton>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={4} color="error">
                                    <CreateIcon />
                                </Badge>
                            </IconButton>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={4} color="error">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                            >
                                <Badge badgeContent={17} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu} */}
                {/* 渲染抽屉菜单
                <Drawer
                    variant="temporary"
                    anchor="left"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                >
                    {drawer}
                </Drawer> */}
            {/* </Box> */}
             {/* 檢查 postList 是否為空， title和context都不能為空 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {/* <Cardblock list={list.filter(item:any => item.title !== '' && item.context !== '')} /> */}
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


