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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


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






export default function Cardblock({ list }) {
  const settings = ['編輯', '刪除'];
  const [anchorEl, setAnchorEl] = React.useState(null); // State to manage anchor element for menu
  // const [anchorElUser, setAnchorElUser] = React.useState < null | HTMLElement > (null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);


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
      {Array.isArray(list) && list.map((item, index) => (
        <Box key={index} sx={{ mb: '1px'}}> 
          <Card key={index} sx={{ maxWidth: 500 , padding: 0}}>
            {/* 標題 */}
            <CardHeader style={{paddingBottom:'0px'}}
              // avatar={
              //   <Avatar sx={{ bgcolor: 'red[500]' }} aria-label="recipe">
              //     R
              //   </Avatar>
              // }
              action={
                <Tooltip title="Open settings">
                  <IconButton onClick={handlePostMenu} aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
              }
              title={item.title}
              // subheader={new Date().toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
            />
            <Box sx={{  width: '400px' , padding: "0 1rem 0 1rem"}}>
              {/* 圖片 */}
              {item.img && (<CardMedia
                component="img"
                image={item.img}
                alt="upload image"
                sx={{maxHeight:'30%',maxWidth:'30%', objectFit: "fit" }}
                // style={'object':'fit';}
              />)}
              {/* 內文 */}
              <CardContent sx={{ padding:'0px',margin:'0px'}} style={{paddingBottom:'0px'}}>
              {/* <CardContent sx={{ paddingBottom:'0px' ,margin:'0px'}}> */}
              {/* 不能寫成以上寫法:使用 sx 屬性設定 paddingBottom 並不會生效，因為 CardContent 元件可能會覆蓋您在 sx 中設定的 paddingBottom。*/}
                <Typography variant="body2" color="text.secondary" >
                  {item.context}
                </Typography>
              </CardContent>
          
            </Box>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon fontSize="small"/>
              </IconButton>
              <IconButton aria-label="share">
                <CommentIcon fontSize="small"/>
              </IconButton>
            </CardActions>
          
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
    </>
  );
}



