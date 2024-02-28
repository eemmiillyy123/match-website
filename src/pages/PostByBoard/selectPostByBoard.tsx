import Cardblock from "@/components/Cardblock";
import HomeNavbar from "@/components/HomeNavbar";
import { AppBar, Box, ThemeProvider, Toolbar, Typography, createTheme } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";

const theme = createTheme()

function PostByBoard() {
    const [list, setList] = React.useState({});
    const searchParams = new URLSearchParams(window.location.search);
    const board = searchParams.get('board');
    const search = searchParams.get('search');
    // console.log(window.location);
    console.log("board:",board,"search:",search);
    useEffect(() => {
        (async () => {
            try {
                // const api = process.env.REACT_APP_BASE_API + "selectPost/?board="+board+"&search=search";
                let api = process.env.REACT_APP_BASE_API + "selectPost?";
                if (board) {
                    api += `board=${board}`;
                }
                if (search) {
                    api += `search=${search}`;
                }

                const response = await axios.get(api);
                if (response.request.status === 200) {
                    setList(response.data);
                    // window.location.reload();
                    //     console.log('成功');
                    // //   setShowAlert(true);
                    // //   localStorage.setItem('email:', email);
                    //   setTimeout(() => {
                    //     navigator('/selectPostByBoard?board='+s);
                    //   }, 000)
                }


                //   list=response.data;
                //   if (response.request.status === 200) {
                //     setTimeout(() => {
                //       navigate('/home');
                //     }, 3000)
                //   }
            } catch (error) {
                //   setErrorAlert(true);
                //   setTimeout(() => {
                //     window.location.reload(); // 登入失敗後 2 秒重新加載頁面
                //   }, 2000);
            }

        })()
    }, [board, list])
    return (
        <ThemeProvider theme={theme}>
            <HomeNavbar />

            {/* 檢查 postList 是否為空， title和context都不能為空 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {/* <Cardblock list={list.filter(item:any => item.title !== '' && item.context !== '')} /> */}
                <Cardblock list={list} />
            </Box>

        </ThemeProvider>
    )
}
export default PostByBoard;