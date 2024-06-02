//Why do you put the interface in the lib folder?
// I think lib folder should contain the common functions, constants, or utilities that can be used in multiple places in the project.
export interface IUser {
  id?: number;
  name: string;
  email: string;
  role: {
    id?: number;
    name: string;
  };
  created_at?: string;
  updated_at?: string;
}
