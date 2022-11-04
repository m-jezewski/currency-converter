interface UseFetchOutput {
  data: any
  isLoading: boolean
  isError: any
}

export interface SymbolsData extends UseFetchOutput {
  data: {
    success: boolean
    symbols: {
      [key: string]: string
    }
  }
}
