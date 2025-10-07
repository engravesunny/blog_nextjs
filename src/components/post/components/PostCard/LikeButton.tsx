import { Button } from "@mui/material";
import { Favorite as FavoriteIcon } from "@mui/icons-material";
import { IPost } from "@/store/post";
import { useStore } from "@/store/StoreProvider";
export const LikeButton = ({ post }: { post: IPost }) => {
  const store = useStore();
  return (
    <Button
      size="small"
      startIcon={<FavoriteIcon />}
      onClick={() => store.getState().likePost(post.id)}
      sx={{
        minWidth: "auto",
        color: "text.secondary",
        "&:hover": {
          color: "error.main",
          backgroundColor: "transparent",
        },
      }}
    >
      {post.likes}
    </Button>
  );
};
