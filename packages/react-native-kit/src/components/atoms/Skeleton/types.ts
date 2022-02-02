export type ChildrenLayout = {
  width: number;
  height: number;
  x: number;
  y: number;
};

export interface IAnimationComponent {
  width?: number;
  height?: number;
  active?: boolean;
  childrenLayout: ChildrenLayout;
}
