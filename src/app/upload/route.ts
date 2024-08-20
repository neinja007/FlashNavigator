import { currentUser } from '@clerk/nextjs/server';
import { put } from '@vercel/blob';

export async function PUT(request: Request) {
  const user = await currentUser();
  if (!user) {
    return Response.redirect('/sign-in');
  }

  const body = await request.json();
  const data = JSON.stringify(body['data']);
  const blob = await put(user.id, data, { access: 'public', addRandomSuffix: false });

  return Response.json(blob);
}
