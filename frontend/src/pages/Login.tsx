import React from 'react'
import { Auth } from 'aws-amplify'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { setAuth } from '../store/slices/authSlice'

const Container = styled.div`padding:24px;max-width:640px;margin:40px auto;`
const Button = styled.button`padding:12px 18px;background:#0066cc;color:white;border:none;border-radius:6px;cursor:pointer;`

export default function Login(){
  const dispatch = useDispatch()

  async function handleHostedUI(){
    try{
      // Use Amplify Hosted UI (redirect to Cognito Hosted UI)
      await Auth.federatedSignIn()
    }catch(e){
      // Fallback sign-in flow
      console.error('Hosted UI redirect failed', e)
    }
  }

  async function restoreSession(){
    try{
      const user = await Auth.currentAuthenticatedUser()
      const session = await Auth.currentSession()
      const id = user.getUsername?.() || (user.username || user.attributes?.email || '')
      const idToken = session.getIdToken().getJwtToken()
      dispatch(setAuth({ username: id, idToken }))
      alert('Session restored for ' + id)
    }catch(e){
      console.warn('No active session')
    }
  }

  return (
    <Container>
      <h1>Login</h1>
      <p>Use the Cognito Hosted UI to sign in with MFA enabled.</p>
      <Button onClick={handleHostedUI}>Login via Hosted UI</Button>
      <div style={{height:12}} />
      <Button onClick={restoreSession}>Restore Local Session</Button>
    </Container>
  )
}
