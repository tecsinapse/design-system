import React from "react"
import { ModalProps } from "./ModalView"

interface ModalNode {
    id: string
    visible?: boolean
    lastVisualization?: Date
    node: () => React.FC<ModalProps>
}

class Handler {
    
    nodeMap: Map<string, ModalNode>
    manager: any | undefined

    constructor() {
        this.nodeMap = new Map()
        this.manager = undefined
    }

    public init = (a: any) => {
        this.manager = a
    }

    public update = () => {
        const nodes = Array.from(this.nodeMap.values())
            .filter(e => e.visible)
            // .sort((a, b) => {
            //     // FIXME 
            //     return 1
            // })
            .map(e => {
                let nod = e.node()
                let { props } = nod as any
                // console.log("UPDATE---", e.id)
                return React.cloneElement(nod as any, {
                    key: e.id,
                    visible: !!e.lastVisualization,
                    close: () => {
                        // console.log("close....")
                        this.close(e.id)
                    },
                    onClose: () => {
                        this.hide(e.id)
                        props.onClose?.()
                        console.log("onclose....")
                    }
                })
            })
            
        const [, set ] = this.manager
        set(nodes)
    }

    public render = (): JSX.Element[] => {
        const [ itens ] = this.manager
        return itens || []
    }

    public sync = (id: string, el: any) => {
        if (this.nodeMap.has(id)) {
            // throw Error(`Modal with duplicated id: ${id}`)
            const oo = this.nodeMap.get(id)
            oo && this.nodeMap.set(id, { ...oo, node: el })
            return
        }
        this.nodeMap.set(id, { id, node: el })
    }

    public destroy = (id: string) => {
        this.nodeMap.delete(id)
        // this.update()
    }

    private hide = (id: string) => {
        const n = this.nodeMap.get(id)
        n && this.nodeMap.set(id, { ...n, visible: false })
        this.update()
    }

    public show = (id: string) => {
        const n = this.nodeMap.get(id)
        n && this.nodeMap.set(id, { ...n, visible: true, lastVisualization: new Date() })
        console.log("------------------", n)
        console.log("SHOW", this.nodeMap)
        this.update()
    }

    public close = (id: string) => {
        const n = this.nodeMap.get(id)
        n && this.nodeMap.set(id, { ...n, lastVisualization: undefined })
        console.log("------------------", n)
        console.log("CLOSE", this.nodeMap)
        this.update()
    }
}

export const createHandler = () => {
    return new Handler()
}
