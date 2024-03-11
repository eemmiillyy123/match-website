import HomeNavbar from "@/components/HomeNavbar";
import { Box, Button, CircularProgress, Grid, ThemeProvider, Typography, createTheme } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const theme = createTheme()
interface Introduce {
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
    const [anotherIntroduce, setAnotherIntroduce] = React.useState<Introduce | null>(null);
    const [yesIsHovered, setYesIsHovered] = React.useState(false);
    const [noIsHovered, setNoIsHovered] = React.useState(false);
    const [thisIntroduce, setThisIntroduce] = React.useState<Introduce | null>(null);
    const [waitForMatch, setWaitForMatch] = React.useState(false);
    const navigate = useNavigate();
    const handleYes = () => {
        const yesApi = process.env.REACT_APP_BASE_API + "willingToMatch";
        const getUserIdRes = axios.post(yesApi, {
            userAId: thisIntroduce?.userId,
            userBId: anotherIntroduce?.userId
        });
        setTimeout(() => {
            (async () => {
                const res = axios.post(process.env.REACT_APP_BASE_API + "confirmMatchResult", {
                    userAId: thisIntroduce?.userId,
                    userBId: anotherIntroduce?.userId
                });
                // console.log(res.data)
                if(await res){
                    navigate("/matchSuccess")
                }
                else{
                    navigate("/matchUnsuccess")
                }
            })()
        }, 40000); 
        
    }
    const handleNo =async () => {
        const noApi = process.env.REACT_APP_BASE_API + "notwillingToMatch";
        const getUserIdRes = axios.post(noApi, {
            userAId: thisIntroduce?.userId,
            userBId: anotherIntroduce?.userId
        });
        navigate("/matchUnsuccess")
    }
    useEffect(() => {
        (async () => {
            try {
                const getUserIdApi = process.env.REACT_APP_BASE_API + "getUserIdByEmail?email=" + localStorage.getItem("email:");
                const getUserIdRes = await axios.get(getUserIdApi);

                const api = process.env.REACT_APP_BASE_API + "getMatchIntroduce?userId=" + getUserIdRes.data;
                const res = await axios.get(api);
                console.log("response:", res.data);
                setThisIntroduce(res.data);

                const matchApi = process.env.REACT_APP_BASE_API + "match";

                const matchRes = await axios.post(matchApi, res.data);
                console.log("matchRes:", matchRes.data);
                if (matchRes.status === 200) {
                    // if (!matchRes.data) {
                    //     setWaitForMatch(true);
                    //     console.log("waitForMatch=",waitForMatch);
                    //     // const interval = setInterval(async () => {
                    //     //     try {
                    //     //         // 發送請求檢查是否有新的配對資料
                    //     //         // const response = await axios.post(process.env.REACT_APP_BASE_API + "checkForNewMatches",res.data,
                    //     //         // {
                    //     //         //     headers: {
                    //     //         //       'Content-Type': 'application/json'
                    //     //         //     }
                    //     //         //   });
                                
                    //     //         // // 檢查後端回傳的資料，如果有新的配對資料，設置狀態為等待配對
                    //     //         // if (response.data.hasNewMatches) {
                    //     //         //     console.log(response.data);
                    //     //         //     setWaitForMatch(false);
                    //     //         //     setAnotherIntroduce(response.data);
                    //     //         // }
                    //     //     } catch (error) {
                    //     //         console.error('Error checking for new matches:', error);
                    //     //     }
                    //     // }, 1000); // 每5秒檢查一次，您可以根據需求調整間隔時間
                    // }
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
    useEffect(() => {
    }, [waitForMatch]) 
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
                {waitForMatch ?
                (<><Typography variant="h6" sx={{ verticalAlign: 'top' }}>
                    等待配對中...
                </Typography><CircularProgress /></>) : (
                    <Box >
                        <Typography variant="h6" sx={{ verticalAlign: 'top' }}>
                            以下為對方的資料:
                        </Typography>
                        <img src={anotherIntroduce?.img} alt="" width="210px" height="260px" />
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
                        <Typography variant="h6" sx={{ marginTop: "40px" }}>
                            雙方都按願意就配對成功!
                        </Typography>
                        <Typography variant="h6">
                            請選擇是否願意與對方配對:
                        </Typography>
                        <Button variant={yesIsHovered ? "contained" : "outlined"} onMouseEnter={() => setYesIsHovered(true)} onMouseLeave={() => setYesIsHovered(false)} sx={{ marginRight: "20px" }} onClick={() => handleYes()}>願意</Button>
                        <Button variant={noIsHovered ? "contained" : "outlined"} onMouseEnter={() => setNoIsHovered(true)} onMouseLeave={() => setNoIsHovered(false)} onClick={() => handleNo()}>不願意</Button>
                    </Box>)}
                </Box>
        </ThemeProvider>
    )
}
export default MatchTarget;