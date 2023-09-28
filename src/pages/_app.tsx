import '@/styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import { SessionProvider, getSession, signIn } from "next-auth/react"

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  getSession(session)
  .then((res) => {
    // when not logged in redirect to login page
    if(!res) {
      signIn();
    }
  });

  return (
    <SessionProvider session={session}>      
     <Component {...pageProps} />    
    </SessionProvider>
  )
}
