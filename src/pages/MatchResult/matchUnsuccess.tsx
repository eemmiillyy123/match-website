import HomeNavbar from "@/components/HomeNavbar";
import { Box, Button, ThemeProvider, createTheme } from "@mui/material";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const theme = createTheme()
function MatchUnsuccess() {
    const navigate = useNavigate();
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
                {"等待明天配對吧!"}
            </Box>

        </ThemeProvider>
    )
}
export default MatchUnsuccess;