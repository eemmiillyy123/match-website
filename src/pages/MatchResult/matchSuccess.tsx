import HomeNavbar from "@/components/HomeNavbar";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const theme = createTheme()
function MatchSuccess() {
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
                {"恭喜你配對成功!"}
            </Box>

        </ThemeProvider>
    )
}
export default MatchSuccess;