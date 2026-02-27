import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Auth } from 'aws-amplify'

const Container = styled.div`padding:24px;max-width:900px;margin:40px auto;`

export default function Exports(){
  async function triggerExport(){
    try{
      const session = await Auth.currentSession()
      const token = session.getAccessToken().getJwtToken()
      const base = process.env.REACT_APP_API_BASE || ''
      const resp = await axios.post(`${base}/exports/snapshot`, {}, { headers: { Authorization: `Bearer ${token}` } })
      alert('Export triggered: ' + resp.data.jobId)
    }catch(e){
      console.error(e)
      alert('Failed to trigger export')
    }
  }

  return (
    <Container>
      <h1>Exports & Snapshots</h1>
      <p>Trigger on-demand snapshot export to S3.</p>
      <button onClick={triggerExport}>Trigger Export</button>
    </Container>
  )
}
