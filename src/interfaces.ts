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
  date: string
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
  date: Date
  question: string
  answer: string
}

export interface IStateStore {
  dailyNotes: IStatetDailyNotes
  dailyQuestionNotes: IStateDailyQuestionNotes
}

export interface IStoreAction {
  type: string
  payload: any
}

export interface ITableColumn {
  title: string
  dataIndex: string
  key: string
  sorter?: any
  render?: any
}