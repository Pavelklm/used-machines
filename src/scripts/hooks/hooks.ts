import { AppDispatch, RootState } from '@/context/store'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// Используйте во всем приложении вместо обычных `useDispatch` и `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
