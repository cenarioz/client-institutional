import Nav from "@/components/molecules/Navbar";
import PostBody from "@/components/organisms/PostBody";
import PostHeader from "@/components/organisms/PostHeader";

export default function Root() {
  return (
    <main className="max-w-7xl mx-auto">
      <Nav search divisor fill="#4E20E0" searchSize="xs" />
      <PostHeader></PostHeader>
      <PostBody></PostBody>
    </main>
  );
}
