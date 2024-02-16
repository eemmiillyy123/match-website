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
import { Button,ThemeProvider, createTheme, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeNavbar from '@/components/HomeNavbar';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch, useSelector } from 'react-redux';
import { PostListState, createPost } from '../../slice/listSlice';

const theme = createTheme();
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
export type ListItem = {
    title: string;
    context: string;
    img: string
};

function AddPost() {
    const [title, setTitle] = React.useState('');
    const [imageURL, setImageURL] = React.useState('');
    const [context, setContext] = React.useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const posts = useSelector((state: { postList: PostListState[] }) => {
    //     return state.postList;
    // })

    const handlePost = (title: String, context: String, img: String) => {
        console.log('title:', title, ' context:', context, 'img:', img);
        dispatch(createPost({
            title: title,
            img: img,
            context: context,
        }))
        setTimeout((posts) => {
            console.log('List of titles:');
            // posts.forEach((item, index) => {
            //     console.log(`posts [${index}]: ${item.title},${item.context},${item.img}`);
            // });
            navigate('/home');
        }, 2000, [{ title, context }]);
    };

    //在頁面上進行圖片預覽
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {//這個事件物件表示檔案輸入框的變化，即使用者選擇了新的檔案或取消了選擇
        const file = event.target.files?.[0];//屬性取得使用者選擇的檔案清單。 由於文件輸入框可能為空，使用可選鏈運算符 ?避免空引用錯誤
        if (file) {//檢查是否選擇了文件
            const imageURL = URL.createObjectURL(file);//產生預覽圖片的 URL。
            setImageURL(imageURL);
        }
    };

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
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '60%' },
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    alignContent: 'center'
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="outlined-basic"
                    label="標題"
                    variant="outlined"
                    value={title}
                    onChange={(e) => { setTitle(e.target.value) }}
                />
                <TextField
                    id="outlined-multiline-static"
                    label="內文"
                    multiline
                    rows={10}
                    value={context}
                    onChange={(e) => { setContext(e.target.value) }}
                    sx={{ width: '500px' }}
                />
                {/* 上傳圖片 */}
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                        id="imageUploadInput"

                    />
                    {imageURL && <img src={imageURL} alt="Uploaded" style={{ width: '40%', marginBottom: '10px' }} />}
                    <label htmlFor="imageUploadInput">
                        <Button component="span" variant="contained" startIcon={<CloudUploadIcon />}>
                            Upload Image
                        </Button>
                    </label>

                </Box>
                {/* <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload file
                        <VisuallyHiddenInput type=pi />
                    </Button> */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" color="success" onClick={() => handlePost(title, context, imageURL)}>發布</Button>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
export default AddPost;