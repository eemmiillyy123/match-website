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
import { Button, InputLabel, Select, SelectChangeEvent, ThemeProvider, createTheme, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeNavbar from '@/components/HomeNavbar';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch, useSelector } from 'react-redux';
import { PostListState, createPost } from '../../slice/listSlice';
import ClearIcon from '@mui/icons-material/Clear';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';

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
    //看板
    const allBoard=["音樂看板","星座看板","NEC員工專屬看板"];
    const [selectBoard, setSelectBoard] = React.useState('');
    const handleChange = (event: SelectChangeEvent) => {
        // console.log(event.target.value);
        // const selectedIndex = Number(event.target.value) as number; 
        // setSelectBoard(allBoard[selectedIndex]);
        // console.log(allBoard[selectedIndex]);
        setSelectBoard(event.target.value as string);
    };

    const [title, setTitle] = React.useState('');
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [imageURL, setImageURL] = React.useState('');
    const [context, setContext] = React.useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const posts = useSelector((state: { postList: PostListState[] }) => {
    //     return state.postList;
    // })

    // const handlePost = (title: String, context: String, img: String,selectBoard:string) => {
    //     // console.log('title:', title, ' context:', context, 'img:', img);
    //     (async () => {
    //         try{
    //           const api = process.env.REACT_APP_BASE_API + "addpost";
    //           console.log(api);
    //           const response = await axios.post(api, {
    //             email: localStorage.getItem("email:"),
    //             board: selectBoard,
    //             title:title,
    //             context:context,
    //             img:imageURL
    //           })
    //           if (response.request.status === 200) {
    //             setTimeout(() => {
    //               navigate('/home');
    //             }, 3000)
    //           }
    //         }catch(error){
    //             console.error("home頁面錯誤");
    //         //   setTimeout(() => {
    //         //     window.location.reload(); // 登入失敗後 2 秒重新加載頁面
    //         //   }, 2000);
    //         }
    //     })()
    //     // dispatch(createPost({
    //     //     title: title,
    //     //     img: img,
    //     //     context: context,
    //     //     selectBoard:selectBoard
    //     // }))
    //     // setTimeout((posts) => {
    //     //     console.log('List of titles:');
    //     //     // posts.forEach((item, index) => {
    //     //     //     console.log(`posts [${index}]: ${item.title},${item.context},${item.img}`);
    //     //     // });
    //     //     navigate('/home');
    //     // }, 2000, [{ title, context,selectBoard }]);
    // };
    const handlePost = async () => {
        try {
          const selectedIndex = Number(selectBoard) as number; 
          const formData = new FormData();
          formData.append('email', localStorage.getItem('email:') || '');
          formData.append('board', allBoard[selectedIndex]);
          formData.append('title', title);
          formData.append('context', context);
        //   formData.append('file', selectedFile);
          if (selectedFile) {
            formData.append('file', selectedFile);
          }
          const response = await axios.post(process.env.REACT_APP_BASE_API + 'addpost', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          if (response.status === 200) {
            setTimeout(() => {
              navigate('/home');
            }, 3000);
          }
        } catch (error) {
          console.error('home頁面錯誤');
        }
      };
    //在頁面上進行圖片預覽
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {//這個事件物件表示檔案輸入框的變化，即使用者選擇了新的檔案或取消了選擇
        const file = event.target.files?.[0];//屬性取得使用者選擇的檔案清單。 由於文件輸入框可能為空，使用可選鏈運算符 ?避免空引用錯誤
        if (file) {//檢查是否選擇了文件
            setSelectedFile(file);
            const imageURL = URL.createObjectURL(file);//產生預覽圖片的 URL。
            setImageURL(imageURL);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            {/* <HomeNavbar menuId={menuId} handleProfileMenuOpen={handleProfileMenuOpen} mobileMenuId={mobileMenuId} handleMobileMenuOpen={handleMobileMenuOpen} renderMobileMenu={renderMobileMenu} renderMenu={renderMenu}></HomeNavbar> */}
            <HomeNavbar/>
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
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">看板</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectBoard}
                            label="Age"
                            onChange={handleChange}
                        >
                            {allBoard.map((item,index)=>(
                                <MenuItem key={index} value={index}>{allBoard[index]}</MenuItem>
                            ))}
                            {/* <MenuItem value={10}>Ten</MenuItem> */}
                            {/* <MenuItem value={20}>Twenty</MenuItem> */}
                            {/* <MenuItem value={30}>Thirty</MenuItem> */}
                        </Select>
                    </FormControl>
                </Box>
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
                    {/*  {imageURL && <img src={imageURL} alt="Uploaded" style={{ width: '40%', marginBottom: '10px' }} />} */}
                        {imageURL && (
                            <Box sx={{ position: 'relative', width: '40%', marginBottom: '10px' }}>
                                <img src={imageURL} alt="Uploaded" style={{ width: '100%' }} />
                                <IconButton
                                    sx={{ position: 'absolute', top: 0, right: 0, color: 'white' }}
                                    onClick={() => setImageURL('')}
                                // 清除預覽照片
                                >
                                    <ClearIcon />
                                </IconButton>
                            </Box>
                        )}
                        <label htmlFor="imageUploadInput">
                            <Button component="span" variant="contained" startIcon={<CloudUploadIcon />}>
                                上傳照片
                            </Button>
                        </label>

                </Box>
                {/* <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload file
                        <VisuallyHiddenInput type=pi />
                    </Button> */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" color="success" onClick={handlePost}>發布</Button>
                    {/* <Button variant="contained" color="success" onClick={() => handlePost(title, context, imageURL,allBoard[Number(selectBoard)])}>發布</Button> */}
                </Box>
            </Box>
        </ThemeProvider>
    );
}
export default AddPost;