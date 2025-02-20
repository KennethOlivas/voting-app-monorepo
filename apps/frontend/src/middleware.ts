import { auth } from "@/auth"

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/auth/login") {
    const newUrl = new URL("/auth/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  } else if (req.auth && req.nextUrl.pathname === "/auth/login") {
    const newUrl = new URL("/dashboard", req.nextUrl.origin)
    return Response
      .redirect
      (newUrl)
  }
  if (req.nextUrl.pathname === "/") {
    const newUrl = new URL("/dashboard", req.nextUrl.origin)
    return Response
      .redirect
      (newUrl)
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
