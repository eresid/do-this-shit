import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
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
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to delete this post?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
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
