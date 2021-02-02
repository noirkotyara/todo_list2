import { useCallback } from "react"

export const useMessage = () => {
    return useCallback( message => {
        (window.M && message) && window.M.toast({ html: message })
    }, [])
}

declare global {
    interface Window { M: any; }
}
