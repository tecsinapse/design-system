
/**
 * TODO:
 */
export interface IBaseModal {
    visible?: boolean
    BoxComponent?: React.FC
    close?: () => void
    onClose?: () => void
}
