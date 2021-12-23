import { ReactElement, useCallback, useEffect } from "react"
import { modalLifecycle } from "./ModalGroupManager"
import { IBaseModal } from "./ui/types"

/**
 * TODO:
 * @param id 
 * @param modal 
 * @returns 
 */
export const useModalManager = (id: string, modal: () => ReactElement<IBaseModal>) => {

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