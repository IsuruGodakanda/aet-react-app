interface IEmployeeObj {
  name: string;
  email: string;
  role: 'manager' | 'worker' | undefined;
  password?: string;
}
