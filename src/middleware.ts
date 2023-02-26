import {NextFetchEvent, NextRequest, NextResponse, URLPattern} from 'next/server';
import * as jose from 'jose';
export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const previousPage = req.nextUrl.pathname;
  const token = req.cookies.get('token')?.value || '';

  try {
    await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_SEED));
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL(`/auth/login?p=${previousPage}`, req.url));
  }
}
export const config = {
  matcher: '/checkout/:path*',
};
