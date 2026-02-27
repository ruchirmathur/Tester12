import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Auth } from 'aws-amplify'
import styled from 'styled-components'

const Container = styled.div`padding:24px;max-width:900px;margin:40px auto;`
const List = styled.ul`padding-left:16px;`

type Tx = { transactionId: string; amount: number; currency: string; createdAt: string; type: string }

export default function Transactions(){
  const { accountId } = useParams<{ accountId: string }>()
  const id = accountId || 'demo-account'
  const [txs, setTxs] = useState<Tx[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    async function load(){
      setLoading(true)
      try{
        const session = await Auth.currentSession()
        const token = session.getAccessToken().getJwtToken()
        const base = process.env.REACT_APP_API_BASE || ''
        const resp = await axios.get(`${base}/accounts/${id}/transactions`, { headers: { Authorization: `Bearer ${token}` } })
        if(mounted) setTxs(resp.data.transactions || [])
      }catch(e){
        console.error('Failed to fetch transactions', e)
      }finally{ setLoading(false) }
    }
    load()
    return () => { mounted = false }
  }, [id])

  return (
    <Container>
      <h1>Transactions for {id}</h1>
      {loading && <div>Loading...</div>}
      {!loading && txs.length === 0 && <div>No transactions found.</div>}
      <List>
        {txs.map(t => (
          <li key={t.transactionId}>{t.createdAt} - {t.type} - {(t.amount/100).toFixed(2)} {t.currency}</li>
        ))}
      </List>
    </Container>
  )
}
