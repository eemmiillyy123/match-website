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
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
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
  const [anchorElUser, setAnchorElUser] = React.useState < null | HTMLElement > (null);
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
      {list.map((item, index) => (
        <Card key={index} sx={{ maxWidth: 500 }}>
          {/* 標題 */}
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'red[500]' }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <Tooltip title="Open settings">
                <IconButton onClick={handlePostMenu} aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>
            }
            title={item.title}
            subheader={new Date().toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
          />
          <Box sx={{ display: 'flex', alignContent: 'center', width: '400px' }}>
            {/* 圖片 */}
            {item.img && (<CardMedia
              component="img"
              height="90"
              image={item.img}
              alt="upload image"
            />)}
            {/* 內文 */}
            <CardContent sx={{ paddingY: '0px' }}>
              <Typography variant="body2" color="text.secondary">
                {item.context}
              </Typography>
            </CardContent>
          
          </Box>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
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
      ))}
    </>
  );
}
