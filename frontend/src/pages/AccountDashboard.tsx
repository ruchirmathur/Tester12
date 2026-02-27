import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetBalanceQuery } from '../store/services/accountsApi'
import styled from 'styled-components'

const Container = styled.div`padding:24px;max-width:900px;margin:40px auto;`

export default function AccountDashboard(){
  const { accountId } = useParams<{ accountId: string }>()
  const id = accountId || 'demo-account'
  const { data, error, isLoading } = useGetBalanceQuery(id)

  return (
    <Container>
      <h1>Account Dashboard</h1>
      {isLoading && <div>Loading balance...</div>}
      {error && <div style={{color:'red'}}>Failed to load balance</div>}
      {data && (
        <div>
          <p><strong>Account:</strong> {data.accountId}</p>
          <p><strong>Balance:</strong> {(data.balance/100).toFixed(2)} {data.currency}</p>
          <p><em>Last updated: (server time)</em></p>
        </div>
      )}
    </Container>
  )
}
