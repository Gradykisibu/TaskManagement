import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import DeleteModal from '../DeleteModal/DeleteModal';

export default function BasicMenu(field) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user } = useContext(AuthContext);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon style={{color:"#551a8b", cursor:"pointer"}}/>
      </Button>


      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem sx={{height:"35px"}}><DeleteModal field={field}/></MenuItem>
        <MenuItem onClick={handleClose}>Close</MenuItem>
      </Menu>
    </div>
  );
}