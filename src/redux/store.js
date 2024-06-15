// ** Redux Imports
import rootReducer from './rootReducer'
import { configureStore } from '@reduxjs/toolkit'
import {logger} from "redux-logger/src"

const store = configureStore({
  reducer: rootReducer,
  // middleware: getDefaultMiddleware => {
  //   return getDefaultMiddleware({
  //     serializableCheck: false
  //   })
  // }
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export { store }
