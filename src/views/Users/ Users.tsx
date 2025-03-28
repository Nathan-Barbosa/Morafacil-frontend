import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components';

type User = {
  id: number;
  name: string;
  role: string;
  residence: number;
};

const users: User[] = [
  {
    id: 1,
    name: 'Nathan Barbosa',
    role: 'Admin',
    residence: 1,
  },
  {
    id: 2,
    name: 'Pedro Souza',
    role: 'Admin',
    residence: 2,
  },
];

export function Users() {
  const { register } = useForm();

  const [openResidenceModal, setOpenResidenceModal] = useState(false);
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Usuários</h1>
          <p className="text-gray-600">Lista de usuários cadastrados</p>
        </div>
        <input placeholder="Buscar por role..." {...register('role')} className="w-64" />
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Nome</th>
            <th className="border p-2">Residência</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id} className="border">
              <td className="p-2">{user.id}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.residence || 'Não definida'}</td>
              <td className="p-2 flex space-x-2 w-full">
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setOpenResidenceModal(true);
                  }}
                  className=" bg-blue-300 rounded p-2"
                >
                  Residência
                </button>
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setOpenRoleModal(true);
                  }}
                  className=" bg-blue-300 rounded p-2"
                >
                  Role
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={openResidenceModal} onOpenChange={setOpenResidenceModal}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Definir Residência</DialogTitle>
          </DialogHeader>
          <p>Definir residência para {selectedUser?.name}</p>
          <input
            placeholder="Nova residência"
            className="mt-2 border border-gray-600 rounded px-2"
          />
          <div className="flex gap-2">
            <button className="mt-4 w-full bg-blue-500 rounded py-1">Cancelar</button>
            <button className="mt-4 w-full bg-blue-500 rounded py-1">Salvar</button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openRoleModal} onOpenChange={setOpenRoleModal}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Definir Role</DialogTitle>
          </DialogHeader>
          <p>Definir role para {selectedUser?.name}</p>
          <input placeholder="Nova role" className="mt-2 border border-gray-600 rounded px-2" />
          <div className="flex gap-2">
            <button className="mt-4 w-full bg-blue-500 rounded py-1">Cancelar</button>
            <button className="mt-4 w-full bg-blue-500 rounded py-1">Salvar</button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
