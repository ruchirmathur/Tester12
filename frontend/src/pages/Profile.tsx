import React, { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
import styled from 'styled-components'

const Container = styled.div`padding:24px;max-width:800px;margin:40px auto;`

export default function Profile(){
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    let mounted = true
    async function fetchUser(){
      try{
        const u = await Auth.currentAuthenticatedUser()
        if(mounted) setUser(u)
      }catch(e){
        setUser(null)
      }
    }
    fetchUser()
    return () => { mounted = false }
  }, [])

  async function setupMFA(){
    try{
      // This is an example stub. Actual TOTP enrollment requires Cognito flows.
      alert('MFA setup flow should be implemented via Amplify / Cognito admin APIs')
    }catch(e){
      console.error(e)
      alert('Failed to initiate MFA')
    }
  }

  return (
    <Container>
      <h1>Profile & MFA Setup</h1>
      {user ? (
        <div>
          <p><strong>Username:</strong> {user.username || user.attributes?.email}</p>
          <p><strong>Email:</strong> {user.attributes?.email}</p>
          <button onClick={setupMFA}>Setup MFA (TOTP / SMS)</button>
        </div>
      ) : (
        <div>Not signed in.</div>
      )}
    </Container>
  )
}
