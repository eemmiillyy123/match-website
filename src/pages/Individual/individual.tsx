import HomeNavbar from "@/components/HomeNavbar";
import { Button, Chip, Grid, IconButton, InputBase, TextField, alpha, createTheme, styled } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from "react";
import Cardblock from "@/components/Cardblock";
import { useSelector } from "react-redux";
import { PostListState } from "@/slice/listSlice";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import SearchIcon from '@mui/icons-material/Search';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ClearIcon from '@mui/icons-material/Clear';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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
  const [imageURL, setImageURL] = React.useState('');
  const [searchText, setSearchText] = React.useState('');
  const [selectedChips, setSelectedChips] = React.useState<string[]>([]);
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.5),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 1),
    },
    marginRight: 0,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      // marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const postList = useSelector((state: { postList: PostListState[] }) => state.postList);
  console.log('postList:', postList);
  function handleDelete(event: any): void {
    throw new Error("Function not implemented.");
  }

  //在頁面上進行圖片預覽
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {//這個事件物件表示檔案輸入框的變化，即使用者選擇了新的檔案或取消了選擇
    const file = event.target.files?.[0];//屬性取得使用者選擇的檔案清單。 由於文件輸入框可能為空，使用可選鏈運算符 ?避免空引用錯誤
    if (file) {//檢查是否選擇了文件
      const imageURL = URL.createObjectURL(file);//產生預覽圖片的 URL。
      setImageURL(imageURL);
    }
  };

  const handleChipClick = (chipLabel: string) => { // 明確指定參數類型為 string
    if (!selectedChips.includes(chipLabel)) {
      setSelectedChips([...selectedChips, chipLabel]);
    }
  };

  const handleChipDelete = (chipLabel: string) => { // 明確指定參數類型為 string
    setSelectedChips(selectedChips.filter((chip) => chip !== chipLabel));
  };
  const rows = [
    "信箱",
    "使用者名稱",
    "密碼"
  ];

  return (
    <>
      <HomeNavbar />
      <Box sx={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '80px' }}>
        <Box sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
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


          <Box sx={{ backgroundColor: '#f3f5f6', width: '800px' }}>
            {/* 檢查 postList 是否為空， title和context都不能為空 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <CustomTabPanel value={value} index={0}>
                <Cardblock list={postList.filter(item => item.title !== '' && item.context !== '')} />
              </CustomTabPanel>
            </Box>
            <CustomTabPanel value={value} index={1}>
              <Box display="flex"
                alignItems="flex-start"
                justifyContent="space-between"
                gap={4}>
                <Box
                  height={200}
                  width={200}
                  display="flex"
                  alignItems="flex-end"
                  justifyContent="end"
                  gap={4}
                  lineHeight={0}
                  sx={{ border: '2px solid grey', position: 'relative' }}
                >
                  {imageURL && (
                    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                      <img src={imageURL} alt="Uploaded" style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
                      <IconButton
                        sx={{ position: 'absolute', top: 0, right: 0, color: 'white' }}
                        onClick={() => setImageURL('')}
                      // 清除預覽照片
                      >
                        <ClearIcon />
                      </IconButton>
                    </Box>
                  )}
                  <Box p='7px' sx={{
                    borderRadius: 1, bgcolor: "#a49e9e", opacity: '0.6', '&:hover': {
                      cursor: "pointer",
                    }, position: 'absolute', bottom: 0, right: 0
                  }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                      id="imageUploadInput"

                    />
                    <label htmlFor="imageUploadInput">
                      <CameraAltIcon />
                    </label>
                  </Box>

                </Box>
                <Grid container direction="column"
                  justifyContent="center"
                  alignItems="flex-start" spacing={2}>
                  <Grid item >
                    <TextField
                      type="text"
                      variant='outlined'
                      label="名字"
                      size="small"
                    />
                  </Grid>
                  <Grid item >
                    <TextField
                      type="text"
                      variant='outlined'
                      label="公司名稱"
                      size="small"
                    />
                  </Grid>
                  <Grid item >
                    <TextField
                      type="text"
                      variant='outlined'
                      label="部門"
                      size="small"
                    />
                  </Grid>
                  <Grid item >
                    <TextField
                      type="text"
                      variant='outlined'
                      label="身高"
                      size="small"
                    />
                  </Grid>
                  <Grid item >
                    <p>興趣</p>
                    {/* <input type="search" /> */}
                    {/* <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      value={selectedChips.map((chipLabel) => (
                        // <Chip
                        //   key={chipLabel}
                        //   label={chipLabel}
                        //   onDelete={() => handleChipDelete(chipLabel)}
                        // />
                        <Chip label="唱歌" onClick={() => handleChipClick('唱歌')} />
                      ))}
                      // inputProps={{ 'aria-label': 'search' }}
                    />
                  </Search> */}
                    {selectedChips.map((chipLabel, index) => (
                      <Chip
                        key={index}
                        label={chipLabel}
                        onDelete={() => handleChipDelete(chipLabel)}
                      />
                    ))}
                    {/* <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }} /> */}
                    {/* </Search> */}
                    <p>推薦選項:</p>
                    <Chip label="唱歌" onClick={() => handleChipClick('唱歌')} />
                    <Chip label="跳舞" onClick={() => handleChipClick('跳舞')} />
                    <Chip label="旅遊" onClick={() => handleChipClick('旅遊')} />
                    {/* <Chip label="打羽球" onDelete={handleDelete} /> */}
                    <br />
                  </Grid>
                  <Grid item >
                    {/* <FormControl> */}
                    <FormLabel id="demo-row-radio-buttons-group-label">是否要配對</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel value="female" control={<Radio />} label="是" />
                      <FormControlLabel value="male" control={<Radio />} label="否" />
                    </RadioGroup>
                    {/* </FormControl> */}
                  </Grid>
                </Grid>
              </Box>

            </CustomTabPanel>


            <CustomTabPanel value={value} index={2}>
              訊息
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              配對
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">

                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row}
                        </TableCell>
                        <TableCell align="right"><Button variant="contained" size="small">更改</Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* <Box display="flex" >
                <Box display="flex" justifyContent="space-between">
                  <p>信箱</p>
                  <button>更改</button>
                </Box>
                <p>使用者名稱</p>
                <p>密碼</p>
              </Box> */}
            </CustomTabPanel>
          </Box>

        </Box>
      </Box>
      {/*  */}
      {/*  改個人資料*/}
      {/* </Box> */}
    </>

  );
}



