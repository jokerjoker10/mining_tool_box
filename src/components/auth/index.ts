import { NextComponentType } from "next"
import { useSession, signIn, signOut } from "next-auth/react"
import { FunctionComponent } from "react"

export default const Component:FunctionComponent = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return(
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}