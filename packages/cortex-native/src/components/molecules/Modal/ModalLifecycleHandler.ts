import React, { Dispatch, ReactElement } from 'react';
import { IBaseModal } from './ui/types';

interface ModalNode {
  id: string;
  visible?: boolean;
  lastVisualization?: Date;
  modal: () => ReactElement<IBaseModal>;
}

export class ModalLifecycleHandler {
  nodeGroup: Map<string, ModalNode>;
  state:
    | [ReactElement<IBaseModal>[], Dispatch<ReactElement<IBaseModal>[]>]
    | undefined;

  constructor() {
    this.nodeGroup = new Map();
    this.state = undefined;
  }

  public attach = (
    state: [ReactElement<IBaseModal>[], Dispatch<ReactElement<IBaseModal>[]>]
  ) => {
    this.state = state;
  };

  public update = () => {
    requestAnimationFrame(() => {
      const nodes = Array.from(this.nodeGroup.values())
        .filter(node => node.visible || !!node.lastVisualization)
        .sort(
          (nodeA, nodeB) =>
            (nodeA.lastVisualization?.getTime() || 0) -
            (nodeB.lastVisualization?.getTime() || 0)
        )
        .map((node, index, filteredNodes) => {
          const modalElement = node.modal();
          const { props } = modalElement;
          return React.cloneElement(modalElement, {
            ...props,
            key: node.id,
            visible: node.visible,
            isLastShown: filteredNodes.length - 1 === index,
            close: () => this.close(node.id),
            onClose: () => {
              this.remove(node.id);
              props.onClose?.();
            },
          });
        });

      const [, updateState] = this.state || [];
      updateState?.(nodes);
    });
  };

  public render = (): ReactElement<IBaseModal>[] => {
    const [modals] = this.state || [];
    return modals || [];
  };

  public sync = (id: string, modal: () => ReactElement<IBaseModal>) => {
    if (this.nodeGroup.has(id)) {
      const savedNode = this.findNode(id);
      if (savedNode) this.nodeGroup.set(id, { ...savedNode, modal });
      return;
    }
    this.nodeGroup.set(id, { id, modal });
  };

  public destroy = (id: string) => {
    this.nodeGroup.delete(id);
    this.update();
  };

  private remove = (id: string) => {
    const savedNode = this.findNode(id);
    if (savedNode)
      this.nodeGroup.set(id, { ...savedNode, lastVisualization: undefined });
    this.update();
  };

  private findNode = (id: string) => {
    const node = this.nodeGroup.get(id);
    if (!node) console.warn(`No modal was found with the id "${id}"`);
    return node;
  };

  public show = (id: string) => {
    const savedNode = this.findNode(id);
    if (savedNode)
      this.nodeGroup.set(id, {
        ...savedNode,
        visible: true,
        lastVisualization: new Date(),
      });
    this.update();
  };

  public close = (id: string) => {
    const savedNode = this.findNode(id);
    if (savedNode) this.nodeGroup.set(id, { ...savedNode, visible: false });
    this.update();
  };

  public closeLastOpenedModal = (): void => {
    const [modals] = this.state || [];
    const lastModal = modals?.pop();
    lastModal?.props?.close?.();
  };
}

export const createModalLifecycleHandler = () => {
  return new ModalLifecycleHandler();
};
