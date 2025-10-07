import React from "react";
import { IPostState } from "@/store/post";
import Link from "next/link";
import { Container, Fab } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { Header } from "./components/Header";
import { PostFilter } from "./components/PostFilter";
import { PostList } from "./components/PostList";

interface IPostPage {
  postInfo: IPostState;
}

export const Post = (props: IPostPage) => {
  const { postInfo } = props;
  return (
    <Container maxWidth="xl" sx={{ px: 0 }}>
      <Header />
      <PostFilter />
      <PostList />
      <Fab
        component={Link}
        href="/post/new"
        color="primary"
        sx={{
          position: "fixed",
          bottom: { xs: 16, md: 24 },
          right: { xs: 16, md: 24 },
          zIndex: 1000,
        }}
        aria-label="写文章"
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};
