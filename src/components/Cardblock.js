import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeProvider, createTheme } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
const theme = createTheme();
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));




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

export default function Cardblock({ list }) {
  const settings = ['編輯', '刪除'];
  const [anchorEl, setAnchorEl] = React.useState(null); // State to manage anchor element for menu
  // const [anchorElUser, setAnchorElUser] = React.useState < null | HTMLElement > (null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [modal, setModal] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = (item) => {
    setModal(item)
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handlePostMenu = (event) => {
    setAnchorEl(event.currentTarget); // Open menu when MoreVertIcon is clicked
  };
  const handleCloseMenu = () => {
    setAnchorElUser(null);
  };

  // const [expanded, setExpanded] = React.useState(false);
  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  return (
    <>
      <ThemeProvider theme={theme}>
        {Array.isArray(list) && list.map((item, index) => (
          <Box key={index} sx={{ mb: '3px' }}>
            <Card key={index} sx={{ maxWidth: '600px', padding: 0 }} onClick={() => handleOpen(item)}>
              {/* 標題 */}
              <CardContent style={{ paddingTop: '0px', paddingBottom: '0px', display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="caption" display="block" gutterBottom>
                    {item.board}
                    <br />
                    {new Date().toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                  </Typography>
                </Box>

                <Tooltip title="Open settings" style={{ paddingRight: '0px' }}>
                  <IconButton onClick={handlePostMenu} aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>

              </CardContent>
              <Box sx={{ width: '350px', padding: "0 1rem 0 1rem", display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <CardHeader sx={{ padding: '0px' }}
                    // avatar={
                    // subheader={new Date().toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                    //   <Avatar sx={{ bgcolor: 'red[500]' }} aria-label="recipe">
                    //     R
                    //   </Avatar>
                    // }
                    // action={
                    //   <Tooltip title="Open settings" style={{paddingRight:'0px'}}>
                    //     <IconButton onClick={handlePostMenu} aria-label="settings">
                    //       <MoreVertIcon />
                    //     </IconButton>
                    //   </Tooltip>
                    // }
                    title={
                      <Typography variant="body1">
                        {item.title}
                      </Typography>
                    }

                  />

                  {/* 內文 */}

                  <CardContent sx={{ padding: '0px', margin: '0px' }}>
                    <Typography variant="body2" color="text.secondary">
                      <Box sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '220px' }}>
                        {item.context}
                      </Box>
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing style={{ paddingLeft: '0px', paddingTop: '0px' }}>
                    <IconButton aria-label="add to favorites" style={{ paddingLeft: '0px' }}>
                      <FavoriteIcon fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="share" style={{ paddingLeft: '0px' }}>
                      <CommentIcon fontSize="small" />
                    </IconButton>
                  </CardActions>


                  {/* <CardContent sx={{ padding:'0px',margin:'0px'}} style={{paddingBottom:'0px'}}> */}
                  {/* <CardContent sx={{ paddingBottom:'0px' ,margin:'0px'}}> */}
                  {/* 不能寫成以上寫法:使用 sx 屬性設定 paddingBottom 並不會生效，因為 CardContent 元件可能會覆蓋您在 sx 中設定的 paddingBottom。*/}
                  {/* <div className="d-inline-block text-truncate" style={{maxWidth: '15px',maxHeight:'10px'}}>
                    <Typography variant="body2" color="text.secondary" >
                      {item.context}
                    </Typography>
                  </div> */}
                  {/* <div className="row">
                    <div className="col-2 text-truncate">
                      {item.context}
                    </div>
                  </div>
                </CardContent>*/}
                </Box>

                {/* 圖片 */}
                {item.img && (<CardMedia
                  component="img"
                  image={item.img}
                  alt="upload image"
                  sx={{ maxHeight: '25%', maxWidth: '25%', objectFit: "fit" }}
                // style={'object':'fit';}
                />)}

              </Box>


              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleCloseMenu}>編輯</MenuItem>
                <MenuItem onClick={handleCloseMenu}>刪除</MenuItem>
              </Menu>
            </Card>
          </Box>
        ))}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {/* {modal && ( // 添加條件渲染
            <Box sx={style}>
              {modal.selectBoard}
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {modal.title}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {modal.context}
                {modal.img && <img src={modal.img} alt='img' style={{ maxWidth: '50%', maxHeight: '50%' }}></img>}
              </Typography>
            </Box>
          )} */}
          <Box sx={style}>
            {modal && ( // 檢查modal是否存在
              <div style={{ maxHeight: '80vh', overflowY: 'auto' }}> {/* 添加滾動條 */}
           {modal.selectBoard}
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {modal.title}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {modal.context}
                </Typography> 
                  {modal.img && <img src={modal.img} alt='img' style={{ maxWidth: '50%', maxHeight: '50%' }}></img>}
           </div> 
          )} 
         </Box>
          {/* <Box sx={style}>
            {modal && ( 
              <div style={{ maxHeight: '80vh', overflow: 'hidden' }}>
                {modal.selectBoard}
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {modal.title}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {modal.context}
                  {modal.img && <img src={modal.img} alt='img' style={{ maxWidth: '50%', maxHeight: '50%' }}></img>}
                </Typography>
              </div>
            )}
          </Box> */}
        </Modal>

      </ThemeProvider>
    </>
  );
}



