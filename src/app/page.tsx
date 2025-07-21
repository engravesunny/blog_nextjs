import { Post } from "@/components/post";

export default function Home() {
  return (
    <div className="flex">
      Page {" =>> "} {Math.random()}
      <div>
        <Post />
      </div>
    </div>
  );
}
