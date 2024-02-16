import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CreateIcon from '@mui/icons-material/Create';
import { Container, Fab, ThemeProvider, createTheme } from '@mui/material';
import Cardblock from '@/components/Cardblock';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import HomeNavbar from '@/components/HomeNavbar';
import { useSelector } from 'react-redux';
import { PostListState } from '../../slice/listSlice';

const theme = createTheme();

function PrimarySearchAppBar() {
    const navigate = useNavigate();

    const pathToAddPost = () => {
        navigate('/addPost');
    }

    const postList = useSelector((state: { postList: PostListState[] }) => state.postList);

    //AppBar
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <PersonAddIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <CreateIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>

            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
        
    );
    return (
        <ThemeProvider theme={theme}>
            <HomeNavbar menuId={menuId} handleProfileMenuOpen={handleProfileMenuOpen} mobileMenuId={mobileMenuId} handleMobileMenuOpen={handleMobileMenuOpen} renderMobileMenu={renderMobileMenu} renderMenu={renderMenu}></HomeNavbar>
            {/* 檢查 postList 是否為空， title和context都不能為空 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Cardblock list={postList.filter(item => item.title !== '' && item.context !== '')} />
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