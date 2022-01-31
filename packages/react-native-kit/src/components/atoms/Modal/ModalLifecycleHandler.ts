import React, { Dispatch, ReactElement } from "react"
import { IBaseModal } from "./ui/types"

/**
 * It Represents a node (usually a modal component) in the modal's lifecycle handler.
 */
interface ModalNode {
    id: string
    visible?: boolean
    lastVisualization?: Date
    modal: () => ReactElement<IBaseModal>
}

/**
 * Manage all modal's lifecycle.
 */
export class ModalLifecycleHandler {
    
    nodeGroup: Map<string, ModalNode>
    state: [ReactElement<IBaseModal>[], Dispatch<ReactElement<IBaseModal>[]>] | undefined

    constructor() {
        this.nodeGroup = new Map()
        this.state = undefined
    }

    /**
     * Holds the ModalGroupManager state.
     * 
     * @param state 
     */
    public attach = (state: [ReactElement<IBaseModal>[], Dispatch<ReactElement<IBaseModal>[]>]) => {
        this.state = state
    }

    /**
     * Updates all the modal components.
     */
    public update = () => {
        requestAnimationFrame(() => {
            const nodes = Array.from(this.nodeGroup.values())
                .filter(node => node.visible || !!node.lastVisualization)
                .sort((nodeA, nodeB) => (nodeA.lastVisualization?.getTime() || 0) - (nodeB.lastVisualization?.getTime() || 0))
                .map((node, index, filteredNodes) => {
                    let modalElement = node.modal()
                    let { props } = modalElement
                    return React.cloneElement(modalElement, {
                        ...props,
                        key: node.id,
                        visible: node.visible,
                        isLastShown: filteredNodes.length - 1 === index,
                        close: () => this.close(node.id),
                        onClose: () => {
                            this.remove(node.id)
                            props.onClose?.()
                        }
                    })
                })
                
            const [, updateState ] = this.state || []
            updateState?.(nodes)
        })
    }

    /**
     * Renders all selected modals.
     * 
     * @returns 
     */
    public render = (): ReactElement<IBaseModal>[] => {
        const [ modals ] = this.state || []
        return modals || []
    }

    /**
     * Tells to the lifecycle handler that a modal component needs to be handled.
     * 
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
     * Destroy a modal from the lifecycle handler.
     * 
     * @param id 
     */
    public destroy = (id: string) => {
        this.nodeGroup.delete(id)
        this.update()
    }

    /**
     * Removes a modal from the rendering stack. It tells to the lifecycle handler that a modal 
     * component is no longer used by the application.
     * 
     * @param id 
     */
    private remove = (id: string) => {
        const savedNode = this.nodeGroup.get(id)
        savedNode && this.nodeGroup.set(id, { ...savedNode, lastVisualization: undefined })
        this.update()
    }

    /**
     * Makes a modal appears.
     * 
     * @param id 
     */
    public show = (id: string) => {
        const savedNode = this.nodeGroup.get(id)
        savedNode && this.nodeGroup.set(id, { ...savedNode, visible: true, lastVisualization: new Date() })
        this.update()
    }

    /**
     * Makes a modal disappears.
     * 
     * @param id 
     */
    public close = (id: string) => {
        const savedNode = this.nodeGroup.get(id)
        savedNode && this.nodeGroup.set(id, { ...savedNode, visible: false })
        this.update()
    }
}

/**
 * Creates a new ModalLifecycleHandlere instance.
 * 
 * @returns 
 */
export const createModalLifecycleHandler = () => {
    return new ModalLifecycleHandler()
}
