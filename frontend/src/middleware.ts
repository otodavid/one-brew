import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export default withMiddlewareAuthRequired();

export const config = {
  matcher: ['/account', '/account/profile', '/account/orders', '/checkout'],
};

export function middleware(req: NextApiRequest) {
  const response = NextResponse.next();
  response.headers.set('Access-Control-Allow-Origin', '*'); // Update '*' to your allowed origin
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );
  return response;
}
