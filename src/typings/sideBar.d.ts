interface ISubItem {
  subId: string;
  subLabel: string;
  subPath: string;
}

interface INavItem {
  navId: string;
  label: string;
  icon: IconName;
  path: string;
  subItems: ISubItem[];
}
