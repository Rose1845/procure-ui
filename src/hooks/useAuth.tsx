import { AuthContext } from '@/stores/AuthProvider'
import React from 'react'

export default function useAuth() {
  const { dispatch, state } = React.useContext(AuthContext)
  return (
    { dispatch, state: state.user }
  )
}
