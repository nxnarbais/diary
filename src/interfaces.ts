import {
  // Auth,
  // UserCredential,
  User,
  // createUserWithEmailAndPassword,
  // signInWithEmailAndPassword,
  // sendPasswordResetEmail,
} from 'firebase/auth'

export interface ILoading {
  showActivityIndicator: boolean
  showErrorIndicator: boolean
  showComponentWhileFetching: boolean
}

export interface ICallState {
  isFetching: boolean
  isError: boolean
  error?: any
}

// export interface IJSONFormInputParams {
//   label: string
//   type: string
//   default?: any
//   rules: { [key: string]: any }
//   options?: IJSONFormOptions
//   disabled?: boolean
// }

// export interface IJSONFormOptions {
//   [key: string]: any
// }

export interface IStatetDailyNotes extends ICallState {
    data?: IDailyNote[]
}

export interface IDailyNote {
  id?: string
  // date: Date
  date: { seconds: number }
  title: string
  content: string
  labels: string[]
  mood: number
}

export interface IStateDailyQuestionNotes extends ICallState {
  data?: IDailyQuestionNote[]
}

export interface IDailyQuestionNote {
  id?: string
  date: { seconds: number }
  question: string
  answer: string
}

export interface IStateUser extends ICallState {
  data?: User
}

export interface IStateStore {
  dailyNotes: IStatetDailyNotes
  dailyQuestionNotes: IStateDailyQuestionNotes
  user: IStateUser
}

export interface IStoreAction {
  type: string
  payload: any
}
