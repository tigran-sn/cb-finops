export interface IMenu {
  key: string;
  path: string;
  name: string;
  menuItems?: Array<IMenu>;
}
