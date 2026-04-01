import { api, HydrateClient } from "~/trpc/server";
import VerticalFeed from "~/components/feed/VerticalFeed";

export default async function Home() {
  // Prefetch all posts for the feed to ensure a smooth initial load
  await api.post.getAll.prefetch();

  return (
    <HydrateClient>
      <VerticalFeed />
    </HydrateClient>
  );
}
