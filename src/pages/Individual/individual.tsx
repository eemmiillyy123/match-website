import HomeNavbar from "@/components/HomeNavbar";
import { Alert, Button, Chip, Container, Dialog, Grid, IconButton, InputAdornment, InputBase, InputLabel, Modal, OutlinedInput, TextField, alpha, createTheme, styled } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React, { useEffect } from "react";
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
import axios from "axios";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import DialogContent from '@mui/material/DialogContent';
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
        <Container>
          <Box>{children}</Box>
        </Container>
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
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 500,
  bgcolor: 'rgba(255, 255, 255, 1)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const reviseStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 260,
  height: 260,
  bgcolor: 'rgba(255, 255, 255, 1)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
interface matchIntroduce {
  name: string;
  companyName: string;
  department: string;
  habit: string;
  img: string;
  matchState: boolean;
  tall: string;
  userId: number;
}
interface Post {
  articleId: number;
  email: string;
  title: string;
  context: string;
  board_id: string;
  img: string;
  shield: boolean;
  createdDate: Date;
}
const rows = [
  "信箱",
  "使用者名稱",
  "密碼"
];
const chipArray = ["唱歌", "跳舞", "旅遊", "看書", "烘焙", "烹飪", "調酒", "健身", "瑜珈", "游泳", "球類運動", "登山", "攝影", "看電影"
  , "繪畫"];

export default function Individual() {
  //我的文章
  const [myPostList, setMyPostList] = React.useState<Post[]>([]);
  //配對自介
  const [value, setValue] = React.useState(1);
  const [imageURL, setImageURL] = React.useState('');
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [selectedChips, setSelectedChips] = React.useState<string[]>([]);
  const [introduceModalOpen, setIntroduceModalOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [companyName, setCompanyName] = React.useState('');
  const [department, setDepartment] = React.useState('');
  const [tall, setTall] = React.useState("");
  const [matchState, setMatchState] = React.useState(false);
  const [introduceList, setIntroduceList] = React.useState<matchIntroduce | null>(null);
  const [haveIntroduce, setHaveIntroduce] = React.useState(false);
  //修改信箱
  const [reviseEmail, setReviseEmail] = React.useState(false);
  const [newEmail, setNewEmail] = React.useState("");
  const [confirmNewEmail, setConfirmNewEmail] = React.useState("");
  //修改使用者名稱
  const [reviseUsername, setReviseUsername] = React.useState(false);
  const [oldUsername, setUsername] = React.useState("");
  const [newUsername, setNewUsername] = React.useState("");
  //修改密碼
  const [showPassword, setShowPassword] = React.useState(false);
  const [revisePassword, setRevisePassword] = React.useState(false);
  const [oldPassword, setOldPassword] = React.useState("");
  const [verifyOldPassword, setVerifyOldPassword] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
  //修改是否成功
  const [revise, setRevise] = React.useState<boolean>(false);
  const [reviseSuccess, setReviseSuccess] = React.useState(false);
  //錯誤訊息
  const [error, setError] = React.useState('');
  const [oldPasswordError, setoldPasswordError] = React.useState('');
  const [newPasswordError, setnewPasswordError] = React.useState('');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState('');




  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  //配對自介
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {//圖片預覽:這個事件物件表示檔案輸入框的變化，即使用者選擇了新的檔案或取消了選擇
    const file = event.target.files?.[0];//屬性取得使用者選擇的檔案清單。 由於文件輸入框可能為空，使用可選鏈運算符 ?避免空引用錯誤
    if (file) {//檢查是否選擇了文件
      setSelectedFile(file);
      const imageURL = URL.createObjectURL(file);//產生預覽圖片的 URL。
      console.log("imageURL:", imageURL);
      setImageURL(imageURL);
      if (revise) {

      }
    }
  };
  const handleChipClick = (chipLabel: string) => {
    if (!selectedChips.includes(chipLabel)) {
      setSelectedChips([...selectedChips, chipLabel]);
    }
  };
  const handleChipDelete = (chipLabel: string) => {
    setSelectedChips(selectedChips.filter((chip) => chip !== chipLabel));
  };
  const handleSave = async () => {
    // (async () => {
    console.log("haveIntroduce", haveIntroduce);
    const formData = new FormData();
    formData.append('email', localStorage.getItem('email:') || '');
    formData.append('name', name);
    formData.append('companyName', companyName);
    formData.append('department', department);
    formData.append('tall', tall);
    formData.append('habit', selectedChips.join(','));
    formData.append('matchState', matchState.toString());
    if (selectedFile) {
      formData.append('file', selectedFile);
    }
    console.log("formData:", formData);
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    // for (const [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    console.log("haveIntroduce", haveIntroduce);
    if (!haveIntroduce) {
      console.log("saveMatchIntroduce");
      const introduceRes = await axios.post(process.env.REACT_APP_BASE_API + 'saveMatchIntroduce', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },

      });

      console.log("introduceRes:", introduceRes.data);
      setIntroduceList(introduceRes.data);

    } else {
      console.log("updataMatchIntroduce");
      const updateIntroduceRes = await axios.post(process.env.REACT_APP_BASE_API + 'updataMatchIntroduce', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setIntroduceList(updateIntroduceRes.data);
    }
    setIntroduceModalOpen(false);

    // }
    // )(

    // );
  }
  const clickReviseButton = () => {
    setIntroduceModalOpen(true);
    setRevise(true);
    setSelectedChips((introduceList as matchIntroduce).habit.split(","));
    setCompanyName((introduceList as matchIntroduce).companyName);
    setDepartment((introduceList as matchIntroduce).department);
    setImageURL((introduceList as matchIntroduce).img);
    setMatchState((introduceList as matchIntroduce).matchState);
    setName((introduceList as matchIntroduce).name);
    setTall((introduceList as matchIntroduce).tall);
    console.log("imageURL:", imageURL);
  };
  const clickAddButton = () => {
    setIntroduceModalOpen(true);
    console.log()
  };
  const IntroduceModalClose = () => {
    setIntroduceModalOpen(false);
  }

  //修改個人資料頁面
  const handlePersonInform = (row: string) => {
    console.log("row:", row);
    if (row === "信箱") {
      setReviseEmail(true);
    } else if (row === "使用者名稱") {
      (async () => {
        const response = await axios.get(process.env.REACT_APP_BASE_API + 'user/getUserByEmail?email=' + localStorage.getItem("email:"));
        console.log("response:", response);
        setUsername(response.data.username);
        setReviseUsername(true);
      })();
    } else if (row === "密碼") {
      setRevisePassword(true);
    }
  }

  //Modal
  const handleModalEmailClose = () => {
    setReviseEmail(false);
  }
  const handleModalUsernameClose = () => {
    setReviseUsername(false);
  }
  const handleModalPasswordClose = () => {
    setRevisePassword(false);
  }

  //信箱
  const handleNewEmailChange = (e: any) => {
    const newValue = e.target.value;
    setNewEmail(newValue);
    if (newValue !== confirmNewEmail) {
      setError('新信箱和確認信箱需一致');
    } else {
      setError('');
    }
  };
  const handleConfirmNewEmailChange = (e: any) => {
    const newValue = e.target.value;
    setConfirmNewEmail(newValue);
    if (newValue !== newEmail) {
      setError('新信箱和確認信箱需一致');
    } else {
      setError('');
    }
  };
  const handleReviseEmail = () => {
    (async () => {
      const response = await axios.post(process.env.REACT_APP_BASE_API + 'user/reviseEmail', {
        oldEmail: localStorage.getItem("email:"),
        newEmail: newEmail
      });
      if (response.request.status === 200) {
        setReviseSuccess(true);//控制Alert的出現
        setTimeout(() => {
          setReviseSuccess(false);
          setReviseEmail(false);//修改完就把modal關起來
          localStorage.setItem("email:", response.data.email);
        }, 2000);
      }
    })();
  }

  //使用者名稱
  const handleReviseUsername = () => {
    (async () => {
      const response = await axios.post(process.env.REACT_APP_BASE_API + 'user/reviseUsername', {
        username: newUsername,
        email: localStorage.getItem("email:")
      });
      if (response.request.status === 200) {
        setReviseSuccess(true);
        setTimeout(() => {
          setReviseSuccess(false);
          setReviseUsername(false);
        }, 2000);
      }
    })();
  }

  //密碼
  const handleClickShowPassword = () => setShowPassword((show: boolean) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleOldPasswordChange = (e: any) => {
    console.log(e.target.value);
    setOldPassword(e.target.value);
  }
  const handleNewPasswordChange = (e: any) => {
    const newPassword = e.target.value;
    setNewPassword(newPassword);
    if (newPassword === "") {
      setnewPasswordError('密碼為必填');
    } else if (newPassword.toString().length < 6) {
      setnewPasswordError('密碼不少於 6 碼');
    } else if (newPassword.toString().length > 12) {
      setnewPasswordError('密碼不大於 12 碼');
    } else if (newPassword !== confirmNewPassword) {
      setnewPasswordError('新密碼和確認密碼需一致');
      setConfirmPasswordError('新密碼和確認密碼需一致');
    } else {
      setnewPasswordError('');
      setConfirmPasswordError('');
    }
  };
  const handleConfirmNewPasswordChange = (e: any) => {
    const confirmNewPassword = e.target.value;
    setConfirmNewPassword(confirmNewPassword);
    if (confirmNewPassword === "") {
      setConfirmPasswordError('確認密碼為必填');
    } else if (confirmNewPassword.toString().length < 6) {
      setConfirmPasswordError('確認密碼不少於 6 碼');
    } else if (confirmNewPassword.toString().length > 12) {
      setConfirmPasswordError('確認密碼不大於 12 碼');
    } else if (newPassword !== confirmNewPassword) {
      setnewPasswordError('新密碼和確認密碼需一致');
      setConfirmPasswordError('新密碼和確認密碼需一致');
    } else {
      setnewPasswordError('');
      setConfirmPasswordError('');
    }
  }
  const handleRevisePassword = () => {
    (async () => {
      console.log("newPassword=", newPassword);
      const response = await axios.get(process.env.REACT_APP_BASE_API + 'user/revisePassword?newPassword=' + newPassword + "&email=" + localStorage.getItem("email:"));
      if (response.request.status === 200) {
        setReviseSuccess(true);
        setTimeout(() => {
          setReviseSuccess(false);
          setRevisePassword(false);
        }, 2000);
      }
    })();
  }
  const handleMouseLeave = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_BASE_API + 'user/verifyPassword?oldPassword=' + oldPassword + "&email=" + localStorage.getItem("email:"));
      console.log(response.data);
      if (response.data !== true) {
        setVerifyOldPassword(false);
        setoldPasswordError('密碼不正確');
      }
      else {
        setVerifyOldPassword(true);
        console.log("密碼正確");
      }
    } catch (error) {
      console.error("Error occurred while verifying password:", error);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const myArticleApi = process.env.REACT_APP_BASE_API + "getMyPostByEmail?email=" + localStorage.getItem("email:");
        console.log("myArticleApi:", myArticleApi);
        const myArticleRes = await axios.get(myArticleApi);
        console.log("myArticleRes:", myArticleRes);
        setMyPostList(myArticleRes.data);

        const getUserIdApi = process.env.REACT_APP_BASE_API + "getUserIdByEmail?email=" + localStorage.getItem("email:");
        const getUserIdRes = await axios.get(getUserIdApi);
        const api = process.env.REACT_APP_BASE_API + "getMatchIntroduce?userId=" + getUserIdRes.data;
        console.log("api:", api);
        const response = await axios.get(api);
        console.log("response:", response.data);

        // setHaveIntroduce(true);
        // setIntroduceList(response.data);
        // console.log(response.data!=null);
        if (response.data) {
          setHaveIntroduce(true);
          setIntroduceList(response.data);
        }
        else {
          setHaveIntroduce(false);
        }
        console.log("useeffect  ", haveIntroduce);

      } catch (error) {
        //   setErrorAlert(true);
        //   setTimeout(() => {
        //   }, 2000);
      }
    })()
  }, [])
  useEffect(() => {
    (async () => {
      try {
        const getUserIdApi = process.env.REACT_APP_BASE_API + "getUserIdByEmail?email=" + localStorage.getItem("email:");
        const getUserIdRes = await axios.get(getUserIdApi);
        const api = process.env.REACT_APP_BASE_API + "getMatchIntroduce?userId=" + getUserIdRes.data;
        const response = await axios.get(api);
        // console.log("response:",response.data);
        if (response.data) {
          setHaveIntroduce(true);
          setIntroduceList(response.data);
        }
        else {
          setHaveIntroduce(false);
        }
      } catch (error) {
        //   setErrorAlert(true);
        //   setTimeout(() => {
        //     window.location.reload(); // 登入失敗後 2 秒重新加載頁面
        //   }, 2000);
      }
    })()
  }, [introduceList])

  return (
    <>
      <HomeNavbar />
      <Box sx={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '80px' }}>
        <Box sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs orientation="vertical"
              variant="scrollable" value={value} onChange={handleTabChange} aria-label="basic tabs example">
              <Tab label="我的文章" {...a11yProps(0)} />
              <Tab label="配對自介" {...a11yProps(1)} />
              {/* <Tab label="訊息" {...a11yProps(2)} /> */}
              <Tab label="配對結果" {...a11yProps(2)} />
              <Tab label="修改個人資料" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <Box sx={{ backgroundColor: '#f3f5f6', width: '600px' }}>
            {/* 檢查 postList 是否為空， title和context都不能為空 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <CustomTabPanel value={value} index={0}>
                <Cardblock list={myPostList} />
              </CustomTabPanel>
            </Box>
            <CustomTabPanel value={value} index={1}>
              <Box display="flex" justifyContent="center" marginY="10px">
                {haveIntroduce && introduceList ? <img src={introduceList.img} alt="" width="150px" height="200px" /> : <AccountBoxIcon sx={{ fontSize: 80 }} />}
              </Box>
              <Grid container spacing={2} width="400px" marginLeft="auto" marginRight="auto">
                <Grid item xs={12} sm={6} >
                  <Typography variant="h6" sx={{ verticalAlign: 'top' }}>
                    名字
                  </Typography>
                  <Typography variant="body1" sx={{ verticalAlign: 'top' }}>
                    {haveIntroduce && introduceList ? (introduceList as matchIntroduce).name : "尚未填寫"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" sx={{ verticalAlign: 'top' }}>
                    公司名稱
                  </Typography>
                  <Typography variant="body1" sx={{ verticalAlign: 'top' }}>
                    {haveIntroduce && introduceList ? (introduceList as matchIntroduce).companyName : "尚未填寫"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" sx={{ verticalAlign: 'top' }}>
                    部門
                  </Typography>
                  <Typography variant="body1" sx={{ verticalAlign: 'top' }}>
                    {haveIntroduce && introduceList ? (introduceList as matchIntroduce).department : "尚未填寫"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" sx={{ verticalAlign: 'top' }}>
                    身高
                  </Typography>
                  <Typography variant="body1" sx={{ verticalAlign: 'top' }}>
                    {haveIntroduce && introduceList ? (introduceList as matchIntroduce).tall : "尚未填寫"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="h6" sx={{ verticalAlign: 'top' }}>
                      興趣
                    </Typography>
                    <Typography variant="body1" sx={{ verticalAlign: 'top' }}>
                      {haveIntroduce && introduceList ? (introduceList as matchIntroduce).habit : "尚未填寫"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item sm={6}>
                  <Box>
                    <Typography variant="h6" >
                      是否要配對
                    </Typography>
                    <Typography variant="body1" >
                      {haveIntroduce && introduceList ? ((introduceList as matchIntroduce).matchState ? "是" : "否") : "尚未選擇"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="center" marginTop="80px">
                {haveIntroduce && introduceList ? <Button variant="contained" size="small" onClick={() => clickReviseButton()}>更改</Button> : <Button variant="contained" size="small" onClick={() => clickAddButton()}>新增</Button>}
              </Box>
            </CustomTabPanel>
            {/* <CustomTabPanel value={value} index={2}>
              訊息
            </CustomTabPanel> */}
            <CustomTabPanel value={value} index={2}>
              尚無配對結果
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row}
                        </TableCell>
                        <TableCell align="right"><Button variant="contained" size="small" onClick={() => handlePersonInform(row)}>更改</Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CustomTabPanel>
          </Box>
        </Box>
      </Box>
      <Modal
        open={introduceModalOpen}
        onClose={IntroduceModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {introduceModalOpen && ( 
            <Box display="flex"
              alignItems="flex-start"
              justifyContent="space-between"
              gap={1}>
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
                      onClick={() => setImageURL('')}// 清除預覽照片
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
                <Grid item xs>
                  <TextField
                    type="text"
                    variant='outlined'
                    label="名字"
                    size="small"
                    name="name"
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                  />
                </Grid>
                <Grid item >
                  <TextField
                    type="text"
                    variant='outlined'
                    label="公司名稱"
                    size="small"
                    name="companyName"
                    value={companyName}
                    onChange={(e) => { setCompanyName(e.target.value) }}
                  />
                </Grid>
                <Grid item >
                  <TextField
                    type="text"
                    variant='outlined'
                    label="部門"
                    size="small"
                    value={department}
                    onChange={(e) => { setDepartment(e.target.value) }}
                  />
                </Grid>
                <Grid item >
                  <TextField
                    type="text"
                    variant='outlined'
                    label="身高"
                    size="small"
                    value={tall}
                    onChange={(e) => {
                      setTall(e.target.value)
                    }}
                  />
                </Grid>
                <Grid item >
                  <p style={{ marginBottom: "8px" }}>興趣</p>
                  {selectedChips.map((chipLabel, index) => (
                    <Chip
                      key={index}
                      label={chipLabel}
                      onDelete={() => handleChipDelete(chipLabel)}
                    />
                  ))}
                  <p style={{ marginBottom: "8px", marginTop: "8px" }}>推薦選項:</p>
                  {chipArray.map((chip, index) => (
                    <Chip key={index} label={chip} onClick={() => handleChipClick(chip)} />
                  ))}
                  <br />
                </Grid>
                <Grid item >
                  <FormLabel id="demo-row-radio-buttons-group-label">是否要配對</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={matchState.toString()}
                    onChange={(e) => { setMatchState(e.target.value === "true") }}
                  >
                    <FormControlLabel value="true" control={<Radio />} label="是" />
                    <FormControlLabel value="false" control={<Radio />} label="否" />
                  </RadioGroup>
                  <Box display="flex" justifyContent="flex-end" width="200px">
                    <Button variant="contained" size="small" onClick={(e) => handleSave()}>儲存</Button>

                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}

        </Box>
      </Modal>
      <Modal
        open={reviseEmail}
        onClose={handleModalEmailClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={reviseStyle}>
          {reviseEmail && (
            <Box display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap={3}>
              <Typography variant="body1" sx={{ verticalAlign: 'top' }}>
                目前信箱:{localStorage.getItem("email:")}
              </Typography>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" size='small'>
                <InputLabel htmlFor="outlined-adornment-oldPassword">新信箱</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-oldPassword"
                  value={newEmail}
                  onChange={handleNewEmailChange}
                  error={error !== ''}
                  label="新信箱"
                />
                {error && (
                  <Typography variant="body2" color="error" sx={{ marginTop: '4px', marginX: '14px', fontSize: '0.75rem' }}>
                    {error}
                  </Typography>
                )}
              </FormControl>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" size='small'>
                <InputLabel htmlFor="outlined-adornment-confirmOldPassword">確認信箱</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-confirmOldPassword"
                  value={confirmNewEmail}
                  onChange={handleConfirmNewEmailChange}
                  error={error !== ''}
                  label="確認信箱"
                />
                {error && (
                  <Typography variant="body2" color="error" sx={{ marginTop: '4px', marginX: '14px', fontSize: '0.75rem' }}>
                    {error}
                  </Typography>
                )}
              </FormControl>
              <Button variant="contained" size="small" onClick={() => handleReviseEmail()}>更改</Button>
              {reviseSuccess && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" style={{ width: '200px', position: 'fixed', bottom: "5%", left: '15%' }}>
                更改信箱成功!
              </Alert>}
            </Box>
          )}
        </Box>
      </Modal>
      <Modal
        open={reviseUsername}
        onClose={handleModalUsernameClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={reviseStyle}>
          {reviseUsername && (
            <Box display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap={3}>
              <Typography variant="body1" sx={{ verticalAlign: 'top' }}>
                目前使用者名稱:{oldUsername}
              </Typography>
              <TextField
                type="text"
                variant='outlined'
                label="新的使用者名稱"
                size="small"
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <Button variant="contained" size="small" onClick={() => handleReviseUsername()}>更改</Button>
              {reviseSuccess && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" style={{ width: '200px', position: 'fixed', bottom: "5%", left: '15%' }}>
                更改使用者名稱成功!
              </Alert>}
            </Box>
          )}
        </Box>
      </Modal>
      <Modal
        open={revisePassword}
        onClose={handleModalPasswordClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={reviseStyle}>
          {revisePassword && (
            <Box display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap={3}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" size='small'>
                <InputLabel htmlFor="outlined-adornment-password">新密碼</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  error={newPasswordError !== ''}
                  label="新密碼"
                />
                {newPasswordError && (
                  <Typography variant="body2" color="error" sx={{ marginTop: '4px', marginX: '14px', fontSize: '0.75rem' }}>
                    {newPasswordError}
                  </Typography>
                )}
              </FormControl>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" size='small'>
                <InputLabel htmlFor="outlined-adornment-password">確認密碼</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  value={confirmNewPassword}
                  onChange={handleConfirmNewPasswordChange}
                  error={confirmPasswordError !== ''}
                  label="確認密碼"
                />
                {confirmPasswordError && (
                  <Typography variant="body2" color="error" sx={{ marginTop: '4px', marginX: '14px', fontSize: '0.75rem' }}>
                    {confirmPasswordError}
                  </Typography>
                )}
              </FormControl>
              <Button variant="contained" size="small" onClick={() => handleRevisePassword()}>更改</Button>
              {reviseSuccess && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" style={{ width: '200px', position: 'fixed', bottom: "5%", left: '15%' }}>
                更改密碼成功!
              </Alert>}
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};


