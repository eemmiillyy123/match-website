import HomeNavbar from "@/components/HomeNavbar";
import { createTheme } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from "react";
import Cardblock from "@/components/Cardblock";
import { useSelector } from "react-redux";
import { PostListState } from "@/slice/listSlice";
const theme = createTheme();
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
 
  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
 
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
 
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


  export default function Individual() {
    const [value, setValue] = React.useState(0);


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const postList = useSelector((state: { postList: PostListState[] }) => state.postList);
  console.log('postList:',postList);
  return (
    <>
    <HomeNavbar/>
    {/* <Box sx={{display:'flex',flexDirection:'row',justifyContent:'center'}}>  */}
      <Box sx={{ width: '20%',display:'flex',flexDirection:'row',padding:'50px'}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs orientation="vertical"
        variant="scrollable" value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="我的文章" {...a11yProps(0)} />
            <Tab label="配對自介" {...a11yProps(1)} />
            <Tab label="訊息" {...a11yProps(2)} />
            <Tab label="配對" {...a11yProps(3)} />
            <Tab label="修改個人資料" {...a11yProps(4)} />
          </Tabs>
        </Box>
       
         {/* 檢查 postList 是否為空， title和context都不能為空 */}
         <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <CustomTabPanel value={value} index={0}>
                    <Cardblock list={postList.filter(item => item.title !== '' && item.context !== '')} />
                </CustomTabPanel>
        </Box>
        
        <CustomTabPanel value={value} index={1}>
        配對自介
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
        訊息
        </CustomTabPanel>
      </Box>
      {/*  */}
      {/*  改個人資料*/}
    {/* </Box> */}
    </>
   
  );
}



