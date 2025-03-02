import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

type Props = {
  isEditMode: boolean;
  setIsEditMode: (isEdit: boolean) => void;
};

const PostMarkdownTabs = ({ isEditMode, setIsEditMode }: Props) => {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    selectedTab: string
  ) => {
    setIsEditMode(selectedTab == "edit");
  };

  return (
    <ToggleButtonGroup
      sx={{ mt: 1 }}
      color="primary"
      value={isEditMode ? "edit" : "preview"}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="edit">Edit</ToggleButton>
      <ToggleButton value="preview">Preview</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default PostMarkdownTabs;
