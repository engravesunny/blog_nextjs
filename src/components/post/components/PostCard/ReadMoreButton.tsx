import { IPost } from "@/store/post";
import { Button } from "@mui/material";
import Link from "next/link";
import { ArrowForward as ArrowForwardIcon } from "@mui/icons-material";
import { useStore } from "@/store/StoreProvider";
export const ReadMoreButton = ({ post }: { post: IPost }) => {
  const store = useStore();
  return (
    <Button
      component={Link}
      href={`/post/${post.id}`}
      size="small"
      endIcon={<ArrowForwardIcon />}
      onClick={() => store.getState().incrementViews(post.id)}
      sx={{
        fontWeight: 500,
        "&:hover": {
          backgroundColor: "transparent",
        },
      }}
    >
      阅读更多
    </Button>
  );
};
