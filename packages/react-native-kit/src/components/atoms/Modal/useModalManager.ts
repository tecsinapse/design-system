import { useCallback, useEffect } from "react"
import { opa } from "."

export const useModalManager = (id: string, el: () => any) => {

    opa.sync(id, el)

    const show = useCallback(() => {
        opa.show(id)
    }, [id])

    const close = useCallback(() => {
        opa.close(id)
    }, [id])
    
    useEffect(() => {
        return () => {
            console.log("Destroy ", id)
            opa.destroy(id)
        }
    }, [])

    return {
        show,
        close
    }
}