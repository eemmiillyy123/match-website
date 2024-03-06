import HomeNavbar from "@/components/HomeNavbar";
import { Box, Button, ButtonGroup, Grid, ThemeProvider, Typography, createTheme } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
function MatchTarget() {
    const [matchSuccess, setMatchSuccess] = React.useState(false);
    const [anotherIntroduce, setAnotherIntroduce] = React.useState<IntroduceList | null>(null);
    const [yesIsHovered, setYesIsHovered] = React.useState(false);
    const [noIsHovered, setNoIsHovered] = React.useState(false);
    const [thisIntroduce,setThisIntroduce]= React.useState<IntroduceList | null>(null);
    const navigate = useNavigate();
    const handleYes=()=>{
        const yesApi = process.env.REACT_APP_BASE_API + "willingToMatch";
        const getUserIdRes =axios.post(yesApi,{
            userAId:thisIntroduce?.userId,
            userBId:anotherIntroduce?.userId
        });
        navigate("/matchResult")
    }
    useEffect(() => {
        (async () => {
            try {
                const getUserIdApi = process.env.REACT_APP_BASE_API + "getUserIdByEmail?email=" + localStorage.getItem("email:");
                const getUserIdRes = await axios.get(getUserIdApi);
                console.log(getUserIdRes.data);
                const api = process.env.REACT_APP_BASE_API + "getMatchIntroduce?userId=" + getUserIdRes.data;
                const response = await axios.get(api);
                setThisIntroduce(response.data);
                const matchApi = process.env.REACT_APP_BASE_API + "match";
                console.log("response:", response.data);
                const matchRes = await axios.post(matchApi, response.data);
                console.log("matchRes:", matchRes.data);
                if (matchRes.status === 200) {
                    setMatchSuccess(true);
                    setAnotherIntroduce(matchRes.data);
                }
            } catch (error) {
                //   setErrorAlert(true);
                //   setTimeout(() => {
                //     window.location.reload(); // 登入失敗後 2 秒重新加載頁面
                //   }, 2000);
            }
        })()
    }, [])
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
                <Box>
                    <Typography variant="h6" sx={{ verticalAlign: 'top' }}>
                        以下為對方的資料:
                        {/* {matchSuccess ? ("恭喜你和" + anotherIntroduce?.name + "配對成功!") : "配對失敗"} */}
                    </Typography>
                    <img src={anotherIntroduce?.img} alt="" width="25%" height="25%"/>
                    <Typography variant="body1" sx={{ verticalAlign: 'top' }}>
                        <Grid container width="400px" marginLeft="auto" marginRight="auto" >
                            <Grid item xs={12}>
                                名字:{anotherIntroduce?.name}
                            </Grid>
                            <Grid item xs={12}  >
                                公司名稱:{anotherIntroduce?.companyName}
                            </Grid>
                            <Grid item xs={12}  >
                                部門:{anotherIntroduce?.department}
                            </Grid>
                            <Grid item xs={12}  >
                                身高:{anotherIntroduce?.tall}
                            </Grid>
                            <Grid item xs={12}  >
                                興趣:{anotherIntroduce?.habit}
                            </Grid>
                        </Grid>
                        
                    </Typography>
                    <Typography variant="h6" sx={{ marginTop:"40px" }}>
                        配對成功即可成為好友開啟聊天!
                    </Typography>
                    <Typography variant="h6">
                        請選擇是否願意與對方配對:
                    </Typography>
                    <Button variant={yesIsHovered ? "contained" : "outlined"} onMouseEnter={() => setYesIsHovered(true)} onMouseLeave={() => setYesIsHovered(false)} sx={{marginRight:"20px"}} onClick={()=>handleYes()}>願意</Button>
                    <Button variant={noIsHovered ? "contained" : "outlined"} onMouseEnter={() => setNoIsHovered(true)} onMouseLeave={() => setNoIsHovered(false)}>不願意</Button>
                </Box>
            </Box>

        </ThemeProvider>
    )
}
export default MatchTarget;