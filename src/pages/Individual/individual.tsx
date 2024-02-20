import HomeNavbar from "@/components/HomeNavbar";
import { createTheme } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from "react";
const theme = createTheme();
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
// export function Individual(props: TabPanelProps){
//     return (
//         <>
//             <HomeNavbar/>
//         </>
//     );
// }
// // export const Individual: any;

  export default function Individual() {
    const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
    <HomeNavbar/>
     <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
        <Tab label="Item Four" />
        <Tab label="Item Five" />
        <Tab label="Item Six" />
        <Tab label="Item Seven" />
      </Tabs>
    </Box>
    </>
   
  );
}