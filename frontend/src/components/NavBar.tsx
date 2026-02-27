import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Nav = styled.nav`
  display:flex;gap:12px;padding:12px;background:#0b3d91;color:#fff;
`

export default function NavBar(){
  return (
    <Nav>
      <Link to="/account/demo-account" style={{color:'#fff'}}>Account</Link>
      <Link to="/transactions/demo-account" style={{color:'#fff'}}>Transactions</Link>
      <Link to="/exports" style={{color:'#fff'}}>Exports</Link>
      <Link to="/profile" style={{color:'#fff'}}>Profile</Link>
      <a href="/login" style={{color:'#fff'}}>Login</a>
    </Nav>
  )
}
