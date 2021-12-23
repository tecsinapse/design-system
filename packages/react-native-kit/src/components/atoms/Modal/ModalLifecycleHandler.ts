import React, { Dispatch, ReactElement } from "react"
import { IBaseModal } from "./ui/types"

/**
 * TODO:
 */
interface ModalNode {
    id: string
    visible?: boolean
    lastVisualization?: Date
    modal: () => ReactElement<IBaseModal>
}

/**
 * TODO:
 */
class ModalLifecycleHandler {
    
    nodeGroup: Map<string, ModalNode>
    state: [ReactElement<IBaseModal>[], Dispatch<ReactElement<IBaseModal>[]>] | undefined

    constructor() {
        this.nodeGroup = new Map()
        this.state = undefined
    }

    /**
     * TODO:
     * @param state 
     */
    public attach = (state: [ReactElement<IBaseModal>[], Dispatch<ReactElement<IBaseModal>[]>]) => {
        this.state = state
    }

    /**
     * TODO:
     */
    public update = () => {
        const nodes = Array.from(this.nodeGroup.values())
            .filter(node => node.visible || !!node.lastVisualization)
            .sort((nodeA, nodeB) => (nodeA.lastVisualization?.getTime() || 0) - (nodeB.lastVisualization?.getTime() || 0))
            .map(node => {
                let modalElement = node.modal()
                let { props } = modalElement
                return React.cloneElement(modalElement, {
                    key: node.id,
                    visible: node.visible,
                    close: () => this.close(node.id),
                    onClose: () => {
                        this.remove(node.id)
                        props.onClose?.()
                    }
                })
            })
            
        const [, updateState ] = this.state || []
        updateState?.(nodes)
    }

    /**
     * TODO:
     * @returns 
     */
    public render = (): ReactElement<IBaseModal>[] => {
        const [ modals ] = this.state || []
        return modals || []
    }

    /**
     * TODO:
     * @param id 
     * @param modal 
     * @returns 
     */
    public sync = (id: string, modal: () => ReactElement<IBaseModal>) => {
        if (this.nodeGroup.has(id)) {
            const savedNode = this.nodeGroup.get(id)
            savedNode && this.nodeGroup.set(id, { ...savedNode, modal })
            return
        }
        this.nodeGroup.set(id, { id, modal })
    }

    /**
     * TODO:
     * @param id 
     */
    public destroy = (id: string) => {
        this.nodeGroup.delete(id)
        this.update()
    }

    /**
     * TODO:
     * @param id 
     */
    private remove = (id: string) => {
        const savedNode = this.nodeGroup.get(id)
        savedNode && this.nodeGroup.set(id, { ...savedNode, lastVisualization: undefined })
        this.update()
    }

    /**
     * TODO:
     * @param id 
     */
    public show = (id: string) => {
        const savedNode = this.nodeGroup.get(id)
        savedNode && this.nodeGroup.set(id, { ...savedNode, visible: true, lastVisualization: new Date() })
        this.update()
    }

    /**
     * TODO:
     * @param id 
     */
    public close = (id: string) => {
        const savedNode = this.nodeGroup.get(id)
        savedNode && this.nodeGroup.set(id, { ...savedNode, visible: false })
        this.update()
    }
}

export const createModalLifecycleHandler = () => {
    return new ModalLifecycleHandler()
}
