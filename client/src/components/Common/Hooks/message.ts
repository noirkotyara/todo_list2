import { useCallback } from "react"
import { message } from 'antd';

export const useMessage = () => {
    return useCallback( messageError => {
        // (window.M && message) && window.M.toast({ html: message })
        (messageError !== null) && message.info(messageError)
    }, [])
}
