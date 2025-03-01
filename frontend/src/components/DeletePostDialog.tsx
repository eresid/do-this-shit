import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Post } from "../store/PostsStore";

type Props = {
  postToDelete: Post | null;
  onCloseClick: () => void;
  onDeleteClicked: (post: Post) => void;
};

const DeletePostDialog = ({
  postToDelete,
  onCloseClick,
  onDeleteClicked,
}: Props) => {
  return (
    <Dialog
      open={!!postToDelete}
      onClose={onCloseClick}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete Post"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete the post?
          {postToDelete?.title}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseClick}>Cancel</Button>
        <Button
          onClick={() => {
            if (postToDelete) {
              onDeleteClicked(postToDelete);
            }
          }}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePostDialog;
