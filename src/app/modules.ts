export interface Module {
  title: string;
  icon: string;
  id: string;
  opened: boolean;
  submodules: Array<Submodule>;
}

export interface Submodule {
  name: string,
  id: string,
  uri: string,
  icon: string,
  default: boolean,
  active: boolean
}

export interface Permission {
  id: string;
  name: string;
  submodules: Array<Action>;
}

export interface Action {
  id: string;
  name: string;
  access: boolean;
  write: boolean;
}

export const MODULES: Array<Module> = [
  {
    title: 'Casos',
    icon: 'gavel',
    id: 'cases',
    submodules: [
      {
        name: 'Nuevo',
        id: 'new-case',
        uri: '/modules/cases/new',
        icon: 'create_new_folder',
        default: true,
        active: false
      }
    ],
    opened: false
  },
  {
    title: 'Administración',
    icon: 'settings',
    id: 'administration',
    submodules: [
      {
        name: 'Clientes',
        id: 'customers',
        uri: '/modules/customers',
        icon: 'recent_actors',
        default: true,
        active: false
      },
      {
        name: 'Usuarios',
        id: 'users',
        uri: '/modules/users',
        icon: 'supervisor_account',
        default: true,
        active: false
      }
    ],
    opened: false
  }

];
