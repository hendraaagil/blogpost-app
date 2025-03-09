import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UserState = {
  name: string
  token: string
  setUser: (name: string, token: string) => void
  clearUser: () => void
}

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      name: '',
      token: '',
      setUser: (name: string, token: string) => set({ name, token }),
      clearUser: () => set({ name: '', token: '' }),
    }),
    {
      name: 'user-storage',
    },
  ),
)

export default useUserStore
