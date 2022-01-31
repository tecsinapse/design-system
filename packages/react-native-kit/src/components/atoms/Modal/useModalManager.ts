import { ReactElement, useCallback, useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import { modalLifecycle } from "./ModalGroupManager"
import { IBaseModal } from "./ui/types"

/**
 * Use this hook to tell the modal lifecycle handler that you want to add
 * a new modal component. 
 * 
 * @param id 
 * @param modal 
 * @returns
 */
export const useModalManager = (modal: () => ReactElement<IBaseModal>) => {

    const [id] = useState(uuidv4())
    modalLifecycle.sync(id, modal)

    const show = useCallback(() => {
        modalLifecycle.show(id)
    }, [id])

    const close = useCallback(() => {
        modalLifecycle.close(id)
    }, [id])
    
    useEffect(() => {
        return () => modalLifecycle.destroy(id)
    }, [])

    return {
        show,
        close
    }
}