import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components";
import { useGetUsersListQuery } from "../../services/UsersService";
import { ResidenceResponseDTO, UserResponseDTO } from "../../models";
import { useDebounce } from "use-debounce";
import { MagnifyingGlass } from "@phosphor-icons/react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";

const residences: ResidenceResponseDTO = [
  {
    id: 1,
    endereco: "aaa",
    numero: 10,
    situacao: 1,
    bloco: "2",
    unidade: "rj",
    condominioId: 1,
    condominio: {
      id: 1,
      nome: "Fazenda do ceu",
      endereco: "Rua Alameda dos Anjos, 600",
      tipo: 1,
      ativo: true,
    },
    usuariosIds: [1],
  },
  {
    id: 2,
    endereco: "bbbb",
    numero: 12,
    situacao: 1,
    bloco: "1",
    unidade: "rj",
    condominioId: 1,
    condominio: {
      id: 1,
      nome: "Fazenda do ceu",
      endereco: "Rua Alameda dos Anjos, 600",
      tipo: 1,
      ativo: true,
    },
    usuariosIds: [2],
  },
];

export function Users() {
  const [filterRole, setFilterRole] = useState<string | undefined>(undefined);
  const [searchfilterRole] = useDebounce(filterRole, 1000);

  const { data: users } = useGetUsersListQuery(searchfilterRole || "");

  const { register } = useForm();

  const [openResidenceModal, setOpenResidenceModal] = useState(false);
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserResponseDTO | undefined>(undefined);

  return (
    <div className="p-6 space-y-6 h-full w-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Usuários</h1>
          <p className="text-gray-600">Lista de usuários cadastrados</p>
        </div>
        <input
          type="text"
          placeholder="Buscar por role..."
          {...register("role")}
          onChange={(e) => setFilterRole(e.target.value)}
          className="w-64 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto">
        {users?.data && (
          <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Nome</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Residência
                </th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users?.data?.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100 transition">
                  <td className="px-4 py-2 text-gray-600">{user.id}</td>
                  <td className="px-4 py-2 text-gray-600">{user.name || user.email}</td>
                  <td className="px-4 py-2 text-gray-600">{user.residence || "Não definida"}</td>
                  <td className="px-4 py-2">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setOpenResidenceModal(true);
                        }}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition"
                      >
                        Residência
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setOpenRoleModal(true);
                        }}
                        className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded transition"
                      >
                        Role
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {!users?.data && (
        <div className="flex flex-col items-center justify-center top-1/2 text-center h-full w-full">
          <MagnifyingGlass size={150} weight="duotone" className="text-gray-400" />
          <span className="mt-2 text-gray-600">Nenhum usuário encontrado</span>
        </div>
      )}

      <Dialog open={openResidenceModal} onOpenChange={setOpenResidenceModal}>
        <DialogContent className="bg-white p-6 rounded shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Definir Residência</DialogTitle>
          </DialogHeader>
          <p className="text-gray-700">Definir residência para {selectedUser?.name}</p>
          <Select>
            <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Selecione a residência" />
            </SelectTrigger>

            <SelectContent className="bg-white rounded shadow-lg z-50">
              {residences?.map((residence) => (
                <SelectItem value={residence.id.toString()} key={residence.id}>
                  {residence.numero}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2 mt-2">
            <button className="w-full py-2 bg-gray-300 hover:bg-gray-400 rounded transition">
              Cancelar
            </button>
            <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition">
              Salvar
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openRoleModal} onOpenChange={setOpenRoleModal}>
        <DialogContent className="bg-white p-6 rounded shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Definir Role</DialogTitle>
          </DialogHeader>
          <p className=" text-gray-700">Definir role para {selectedUser?.name}</p>
          <input
            placeholder="Nova role"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2 mt-2">
            <button className="w-full py-2 bg-gray-300 hover:bg-gray-400 rounded transition">
              Cancelar
            </button>
            <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition">
              Salvar
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
