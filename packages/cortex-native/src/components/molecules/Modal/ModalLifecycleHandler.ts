import React, { ReactElement } from 'react';
import { IBaseModal } from './ui/types';

interface ModalNode {
  id: string;
  visible?: boolean;
  lastVisualization?: Date;
  modal: () => ReactElement<IBaseModal>;
}

export class ModalLifecycleHandler {
  nodeGroup: Map<string, ModalNode>;
  private listeners: Set<() => void> = new Set();
  private _nodes: ReactElement<IBaseModal>[] = [];

  constructor() {
    this.nodeGroup = new Map();
  }

  public subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  public getSnapshot = (): ReactElement<IBaseModal>[] => this._nodes;

  public update = () => {
    this._nodes = Array.from(this.nodeGroup.values())
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

    this.listeners.forEach(listener => listener());
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
    const lastModal = this._nodes[this._nodes.length - 1];
    lastModal?.props?.close?.();
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
}

export const createModalLifecycleHandler = () => {
  return new ModalLifecycleHandler();
};
