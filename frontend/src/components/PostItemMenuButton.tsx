import * as React from "react";
import { Menu, MenuItem, IconButton, Container, Box } from "@mui/material";

type Props = {
  onEditClick: () => void;
  onDeleteClick: () => void;
};

const PostItemMenuButton = ({ onEditClick, onDeleteClick }: Props) => {
  const [menuOpen, setMenuOpen] = React.useState<null | HTMLElement>(null);
  const open = Boolean(menuOpen);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuOpen(event.currentTarget);
  };

  const handleClose = () => {
    setMenuOpen(null);
  };

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="#5f6368"
          viewBox="0 -960 960 960"
        >
          <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
        </svg>
      </IconButton>
      <Menu anchorEl={menuOpen} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            onEditClick();
            handleClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDeleteClick();
            handleClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default PostItemMenuButton;
