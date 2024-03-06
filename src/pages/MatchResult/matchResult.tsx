import HomeNavbar from "@/components/HomeNavbar";
import { Box, Button, ThemeProvider, createTheme } from "@mui/material";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const theme = createTheme()
function MatchResult() {
    const navigate = useNavigate();
    const handleStart=()=>{
        (async () => {
            try{
                navigate("/matchTarget")
               
            }catch(error){
                //   setErrorAlert(true);
                //   setTimeout(() => {
                //     window.location.reload(); // 登入失敗後 2 秒重新加載頁面
                //   }, 2000);
                }
              })()                
    }
    return (
        <ThemeProvider theme={theme}>
            <HomeNavbar />
            <Box
                sx={{
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                {"恭喜你配對成功!即可開始聊天"}
            </Box>

        </ThemeProvider>
    )
}
export default MatchResult;