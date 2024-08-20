import { currentUser } from '@clerk/nextjs/server';
import { list } from '@vercel/blob';

export async function GET() {
  const user = await currentUser();
  if (!user) {
    return Response.redirect('/sign-in');
  }

  const blob = (await list()).blobs.find((blob) => (blob.pathname = user.id));

  if (!blob) {
    return Response.error();
  }

  const blobData = await fetch(blob.url).then((res) => res.text());

  return Response.json({ ...blob, data: blobData });
}
