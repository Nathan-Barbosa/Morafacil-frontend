import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components";
import { useGetUsersListQuery, usePostBlockUserMutation } from "../../services/UsersService";
import { UserResponseDTO } from "../../models";
import { useDebounce } from "use-debounce";
import { MagnifyingGlass, XCircle } from "@phosphor-icons/react";
import {
  useGetResidencesListQuery,
  useGetRolesListQuery,
  usePatchAssociateUserMutation,
  usePatchRemoveUserMutation,
  usePostAssignRoleMutation,
} from "../../services";
import { useToast } from "../../hooks/use-toast";

export function Users() {
  const [filterField, setFilterField] = useState("name");
  const [filterValue, setFilterValue] = useState("");
  const [debouncedFilterValue] = useDebounce(filterValue, 300);
  const [allUsers, setAllUsers] = useState<UserResponseDTO[]>([]);
  const [openResidenceModal, setOpenResidenceModal] = useState(false);
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserResponseDTO | undefined>(undefined);

  const { toast } = useToast();

  const { data: usersResponse, refetch: refetchUsers } = useGetUsersListQuery();

  const { data: roles } = useGetRolesListQuery();

  const { data: residences } = useGetResidencesListQuery({
    pageNumber: 1,
    pageSize: 10,
  });

  useEffect(() => {
    if (usersResponse?.data) {
      setAllUsers(usersResponse.data);
    }
  }, [usersResponse]);

  const { mutate: associateUser } = usePatchAssociateUserMutation();
  const { mutate: assignRole } = usePostAssignRoleMutation();
  const { mutate: removeUser } = usePatchRemoveUserMutation();
  const { mutate: blockUser } = usePostBlockUserMutation();

  const filteredUsers = allUsers.filter((user) => {
    const value = debouncedFilterValue.toLowerCase();
    switch (filterField) {
      case "name":
        return user.name?.toLowerCase().includes(value);
      case "email":
        return user.email?.toLowerCase().includes(value);
      case "cpf":
        return user.cpf?.toLowerCase().includes(value);
      case "id":
        return user.id.toString().includes(value);
      default:
        return true;
    }
  });

  const {
    register: registerResidence,
    handleSubmit: handleSubmitResidence,
    setValue: setValueResidence,
  } = useForm();

  const {
    register: registerRole,
    handleSubmit: handleSubmitRole,
    setValue: setValueRole,
  } = useForm();

  const onSubmitResidence = (data: any) => {
    if (selectedUser && data.residence) {
      const residenceId = Number(data.residence);

      associateUser(
        {
          residenciaId: residenceId,
          usuarioId: selectedUser.id,
        },
        {
          onSuccess: () => {
            toast({
              title: "Sucesso",
              description: "Residência atribuída com sucesso!",
              variant: "default",
            });
            setOpenResidenceModal(false);
          },
        },
      );
    }
  };

  const handleRemoveResidence = (residenceId: number) => {
    if (selectedUser?.id) {
      removeUser(
        {
          residenciaId: residenceId,
          usuarioId: selectedUser.id,
        },
        {
          onSuccess: () => {
            toast({
              title: "Residência removida",
              description: "Residência desvinculada com sucesso!",
              variant: "default",
            });
          },
        },
      );
    }
  };

  const onSubmitRole = (data: any) => {
    if (selectedUser && selectedUser.email && selectedUser.id) {
      assignRole(
        {
          userEmail: selectedUser.email,
          roleName: data.role,
          action: "add",
        },
        {
          onSuccess: () => {
            toast({
              title: "Sucesso",
              description: "Perfil atribuído com sucesso!",
              variant: "default",
            });
            setOpenRoleModal(false);
            refetchUsers();
          },
        },
      );
    }
  };

  const handleRemoveRole = (role: string) => {
    if (selectedUser?.email) {
      assignRole(
        {
          userEmail: selectedUser.email,
          roleName: role,
          action: "remove",
        },
        {
          onSuccess: () => {
            toast({
              title: "Removido",
              description: `Role "${role}" removida com sucesso!`,
              variant: "default",
            });
            refetchUsers();
          },
        },
      );
    }
  };

  const handleBlockuser = (id: number) => {
    console.log("Botão clicado - ID do usuário:", id);

    blockUser(
      {
        userBlock: id.toString(),
        isPermanent: false,
        lockoutDurationMinutes: 5,
      },
      {
        onSuccess: () => {
          console.log("Usuário bloqueado com sucesso!");
          toast({
            title: "Bloqueado",
            description: `Usuário bloqueado com sucesso!`,
            variant: "default",
          });
        },
      },
    );
  };

  return (
    <div className="p-6 space-y-6 h-full w-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Usuários</h1>
          <p className="text-gray-600">Lista de usuários cadastrados</p>
        </div>
        <div className="flex gap-4 items-center">
          <Select value={filterField} onValueChange={setFilterField}>
            <SelectTrigger className="w-40 border border-gray-300 rounded px-3 py-2">
              <SelectValue placeholder="Campo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="id">ID</SelectItem>
              <SelectItem value="name">Nome</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="cpf">CPF</SelectItem>
            </SelectContent>
          </Select>

          <input
            type="text"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            placeholder={`Buscar por ${filterField}`}
            className="px-3 py-2 border border-gray-300 rounded w-64"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        {filteredUsers && (
          <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Nome</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Cpf</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers?.map((user) => {
                return (
                  <tr key={user.id} className="hover:bg-gray-100 transition">
                    <td className="px-4 py-2 text-gray-600">{user.id}</td>
                    <td className="px-4 py-2 text-gray-600">{user.name}</td>
                    <td className="px-4 py-2 text-gray-600">{user.email}</td>
                    <td className="px-4 py-2 text-gray-600">{user.cpf}</td>

                    <td className="px-4 py-2">
                      <div className="flex flex-wrap justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setOpenResidenceModal(true);
                          }}
                          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition"
                        >
                          Residências
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setOpenRoleModal(true);
                          }}
                          className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded transition"
                        >
                          Perfis
                        </button>
                        <button
                          onClick={() => {
                            // abrir modal ou lógica de edição
                            console.log("Editar usuário", user);
                          }}
                          className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded transition"
                        >
                          Editar
                        </button>

                        <button
                          onClick={() => {
                            handleBlockuser(user.id);
                          }}
                          className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded transition"
                        >
                          Bloquear
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      {!filteredUsers && (
        <div className="flex flex-col items-center justify-center top-1/2 text-center h-full w-full">
          <MagnifyingGlass size={150} weight="duotone" className="text-gray-400" />
          <span className="mt-2 text-gray-600">Nenhum usuário encontrado</span>
        </div>
      )}

      <Dialog open={openResidenceModal} onOpenChange={setOpenResidenceModal}>
        <DialogContent className="bg-white p-6 rounded shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Gerenciar Residências</DialogTitle>
          </DialogHeader>

          <div className="mb-4">
            <p className="text-gray-700 mb-2">
              Residências atuais de <strong>{selectedUser?.name}</strong>:
            </p>

            <div className="flex flex-wrap gap-2">
              {residences?.data
                ?.filter((res) => res.usuariosIds.includes(selectedUser?.id || -1))
                .map((res) => (
                  <div
                    key={res.id}
                    className="flex items-center gap-2 bg-gray-200 px-2 py-1 rounded text-sm text-gray-800"
                  >
                    Nº {res.numero} - Bloco {res.bloco} - Unidade {res.unidade}
                    <button
                      onClick={() => handleRemoveResidence(res.id)}
                      className="text-red-500 hover:text-red-700 ml-1"
                      title="Remover residência"
                    >
                      <XCircle size={18} />
                    </button>
                  </div>
                ))}
              {residences?.data?.filter((res) => res.usuariosIds.includes(selectedUser?.id || -1))
                .length === 0 && (
                <span className="text-sm text-gray-500">Sem residências associadas</span>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmitResidence(onSubmitResidence)} className="space-y-4">
            <Select
              {...registerResidence("residence")}
              onValueChange={(value) => setValueResidence("residence", value)}
            >
              <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded">
                <SelectValue placeholder="Adicionar nova residência" />
              </SelectTrigger>

              <SelectContent className="bg-white rounded shadow-lg">
                {residences?.data
                  ?.filter((res) => !res.usuariosIds.includes(selectedUser?.id || -1))
                  .map((residence) => (
                    <SelectItem value={residence.id.toString()} key={residence.id}>
                      Nº {residence.numero} - Bloco {residence.bloco} - Unidade {residence.unidade}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <div className="flex justify-end gap-2 text-xs font-semibold">
              <button
                type="button"
                className="button-cancel"
                onClick={() => setOpenResidenceModal(false)}
              >
                Cancelar
              </button>
              <button type="submit" className="button-confirm">
                Adicionar
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={openRoleModal} onOpenChange={setOpenRoleModal}>
        <DialogContent className="bg-white p-6 rounded shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Gerenciar Perfis</DialogTitle>
          </DialogHeader>

          <div className="text-gray-700 mb-4">
            <p className="mb-2">
              Perfis atuais de <strong>{selectedUser?.name}</strong>:
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedUser?.roles.map((role) => (
                <div
                  key={role}
                  className="flex items-center gap-2 bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm"
                >
                  {role}
                  <button
                    type="button"
                    onClick={() => handleRemoveRole(role)}
                    className="text-red-500 hover:text-red-700"
                    title="Remover perfil"
                  >
                    <XCircle size={18} />
                  </button>
                </div>
              ))}
              {selectedUser?.roles.length === 0 && (
                <span className="text-sm text-gray-500">Sem perfis atribuídos</span>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmitRole(onSubmitRole)} className="space-y-4">
            <Select
              {...registerRole("role")}
              onValueChange={(value) => setValueRole("role", value)}
            >
              <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded">
                <SelectValue placeholder="Adicionar novo perfil" />
              </SelectTrigger>

              <SelectContent className="bg-white rounded shadow-lg z-50">
                {roles?.data
                  ?.filter((role) => !selectedUser?.roles.includes(role))
                  .map((role, index) => (
                    <SelectItem value={role} key={index}>
                      {role}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <div className="flex justify-end gap-2 text-xs font-semibold">
              <button
                type="button"
                className="button-cancel"
                onClick={() => setOpenRoleModal(false)}
              >
                Cancelar
              </button>
              <button type="submit" className="button-confirm">
                Adicionar
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
