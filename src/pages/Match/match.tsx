import HomeNavbar from "@/components/HomeNavbar";
import { Box, Button, ThemeProvider, createTheme } from "@mui/material";
import axios from "axios";
import React from "react";

const theme = createTheme()
interface IntroduceList {
    name: string;
    companyName: string;
    department: string;
    habit: string;
    img: string;
    matchState: boolean;
    tall: string;
    userId: number;
  }
function Match() {
    const [matchSuccess,setMatchSuccess]=React.useState(false);
    const [anotherIntroduce,setAnotherIntroduce]=React.useState<IntroduceList | null>(null);
    const handleStart=()=>{
        (async () => {
            try{
                const getUserIdApi = process.env.REACT_APP_BASE_API + "getUserIdByEmail?email="+localStorage.getItem("email:");
                const getUserIdRes = await axios.get(getUserIdApi);
                const api = process.env.REACT_APP_BASE_API + "getMatchIntroduce?userId="+getUserIdRes.data;
                const response = await axios.get(api);
                const matchApi = process.env.REACT_APP_BASE_API + "match";
                const matchRes = await axios.post(matchApi,response.data);
                if (matchRes.status === 200) {
                    setMatchSuccess(true);
                    setAnotherIntroduce(matchRes.data);
                  }
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
                <img src="https://i.pinimg.com/474x/a5/f9/66/a5f9662d9cb35efbf12be3c5030c3545.jpg" alt="" style={{ width: '350px', height: 'auto', marginRight: '50px' }} />
                <Box>
                    <p style={{ width: '300px' ,marginBottom:'50px'}}>午夜12點，系統會根據您的興趣、部門等，為您精心挑選潛在的夥伴，選擇配對即可進入聊天室進行更深度的交流!</p>
                    <Button variant="contained" size="large" onClick={() => handleStart()}>開始配對</Button>
                </Box>
            </Box>
                {matchSuccess?("和"+anotherIntroduce?.name+"配對成功"):"配對失敗"}
        </ThemeProvider>
    )
}
export default Match;