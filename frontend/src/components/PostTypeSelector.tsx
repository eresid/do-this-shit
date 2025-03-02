import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { PostType } from "../store/PostsStore";

type Props = {
  type: PostType;
  setType: (type: PostType) => void;
};

const PostTypeSelector = ({ type, setType }: Props) => {
  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as PostType);
  };

  return (
    <Box sx={{ width: "30%" }}>
      <FormControl fullWidth>
        <InputLabel>Post Type</InputLabel>
        <Select
          labelId="post-type-select-label"
          value={type}
          label="Post Type"
          onChange={handleChange}
        >
          <MenuItem value={PostType.Link}>Link</MenuItem>
          <MenuItem value={PostType.Markdown}>Markdown</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default PostTypeSelector;
