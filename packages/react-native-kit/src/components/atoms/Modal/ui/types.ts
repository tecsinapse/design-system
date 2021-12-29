
/**
 * Defines a modal interface and allows you implement your own modal component.
 */
export interface IBaseModal {
    visible?: boolean
    BoxComponent?: React.FC
    close?: () => void
    onClose?: () => void
}
