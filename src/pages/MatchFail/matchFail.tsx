import HomeNavbar from "@/components/HomeNavbar";
import { Box, Button, ThemeProvider, Typography, createTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const theme = createTheme();
function MatchFail() {
    const [buttonIsHovered, setButtonIsHovered] = React.useState(false);
    const navigate = useNavigate();
    const headToWrite=()=>{
        navigate("/individual");
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
                <Box>
                    <img src="https://img.freepik.com/vetores-gratis/conceito-de-aplicativo-de-namoro-com-sinal-de-partida_52683-23440.jpg?size=626&ext=jpg&ga=GA1.1.842724343.1709708670&semt=ais" alt="" style={{ width: '350px', height: 'auto', marginRight: '50px' }}/>
                    <Typography variant="h6" sx={{ verticalAlign: 'top' }}>
                        要填寫完配對的自我介紹才能進行配對喔!
                    </Typography>
                    <Button variant={buttonIsHovered ? "contained" : "outlined"} onMouseEnter={() => setButtonIsHovered(true)} onMouseLeave={() => setButtonIsHovered(false)} onClick={()=>headToWrite()}>前往填寫</Button>
                </Box>
            </Box>

        </ThemeProvider>
    )
}
export default MatchFail;