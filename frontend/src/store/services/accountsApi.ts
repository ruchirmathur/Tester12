import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Auth } from 'aws-amplify'

const baseUrl = process.env.REACT_APP_API_BASE || ''

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: async (headers) => {
    try {
      const session = await Auth.currentSession()
      const token = session.getAccessToken().getJwtToken()
      headers.set('Authorization', `Bearer ${token}`)
    } catch (e) {
      // no-op: allow unauthenticated calls to fail upstream
    }
    return headers
  }
})

export const accountsApi = createApi({
  reducerPath: 'accountsApi',
  baseQuery,
  endpoints: (build) => ({
    getBalance: build.query<{ accountId: string; balance: number; currency: string }, string>({
      query: (accountId) => `/accounts/${accountId}/balance`
    })
  })
})

export const { useGetBalanceQuery } = accountsApi
