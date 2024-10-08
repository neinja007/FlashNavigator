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

	const blobData = await fetch(blob.url, { cache: 'no-store' })
		.then((res) => res.text())
		.catch(() => console.error("Couldn't fetch blob data"));

	const data = { ...blob, data: blobData };

	return Response.json(data);
}
