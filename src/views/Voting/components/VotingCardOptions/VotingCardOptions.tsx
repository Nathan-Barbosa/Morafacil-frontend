import { useEffect, useState } from "react";
import { MenuItem, VotingCardOptionsProps } from "./VotingCardOptions.types";
import { useToast } from "../../../../hooks/use-toast";
import {
  useCloseVotingMutation,
  useGetVotingByIDQuery,
  usePostVoteMutation,
} from "../../../../services";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components";

import { ConfirmDialog } from "../ConfirmDialog";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useAuth } from "../../../../providers";

type VoteFormData = {
  opcaoId: number;
};

const VotingCardOptions = ({ children, voting }: VotingCardOptionsProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openVotingModal, setOpenVotingModal] = useState<boolean>(false);
  

  const { user } = useAuth();
  const userRole = user?.roles;
  const { control: voteControl, handleSubmit: handleSubmitVote } = useForm<VoteFormData>({
    defaultValues: {
      opcaoId: undefined,
    },
  });

  const userId = user?.id;

  const { toast } = useToast();
  const { mutate: closeVoting } = useCloseVotingMutation();
  const { mutate: toVote } = usePostVoteMutation();

  const votingId = voting.id?.toString() ?? "";
  const { data: votingData, refetch: fetchVotingData } = useGetVotingByIDQuery(votingId, false);

  useEffect(() => {
    if (votingData) {
      console.log("Dados da votação carregados:", votingData);
    }
  }, [votingData]);

  const onVote = async () => {
    await fetchVotingData();
    setOpenVotingModal(true);
  };

  const onCloseVoting = () => setOpenDialog(true);

  const onCloseSuccess = () => {
    toast({
      title: "Sucesso",
      description: `Votação encerrado com sucesso!`,
      variant: "default",
    });
    setOpenDialog(false);
  };
  const onVoteSuccess = () => {
    toast({
      title: "Sucesso",
      description: `Voto realizado com sucesso!`,
      variant: "default",
    });
    setOpenDialog(false);
  };

  const handleConfirmCloseVoting = async () => {
    closeVoting(Number(voting?.id), { onSuccess: onCloseSuccess });
  };

  const onSubmitVote = (data: VoteFormData) => {
    const payload = {
      usuarioId: userId,
      opcaoVotacaoId: data.opcaoId,
    };
    toVote(payload, { onSuccess: onVoteSuccess });
  };

  const menuItems: MenuItem[] = [];

  const isAdminCond = userRole?.includes("AdminCond") || userRole?.includes("Admin");

  if (!voting.encerrada) {
    menuItems.push({ label: "Votar", callback: onVote });

    if (isAdminCond) {
      menuItems.push({ label: "Encerrar", callback: onCloseVoting });
    }
  } else {
    menuItems.push({ label: "Visualizar resultado", callback: onVote });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" side="bottom" align="end">
          {menuItems.map((item, index) => (
            <DropdownMenuItem
              key={index}
              className="border-gray4 bg-blue-100 hover:bg-blue-200"
              onClick={item.callback}
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        voting={voting}
        open={openDialog}
        setOpen={setOpenDialog}
        onConfirm={handleConfirmCloseVoting}
      />

      {/*VOTAÇÃO*/}
      <Dialog open={openVotingModal} onOpenChange={setOpenVotingModal}>
        <DialogContent className="bg-white p-6 rounded shadow-lg">
  <DialogHeader>
    <DialogTitle className="text-lg font-semibold">
      {votingData?.data.titulo}
    </DialogTitle>
  </DialogHeader>

  {/* Se estiver encerrada, exibe resultados */}
  {votingData?.data.encerrada ? (
    <div className="space-y-4 mt-4">
      {votingData?.data.opcoes.map((opcao) => {
        const totalVotos = votingData.data.opcoes.reduce(
          (acc, o) => acc + o.quantidadeVotos,
          0
        );
        const percentual =
          totalVotos > 0
            ? ((opcao.quantidadeVotos / totalVotos) * 100).toFixed(1)
            : "0";

        return (
          <div key={opcao.id}>
            <div className="flex justify-between text-sm font-medium">
              <span>{opcao.descricao}</span>
              <span>{percentual}%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded">
              <div
                className="bg-blue-600 h-2 rounded"
                style={{ width: `${percentual}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    // Se não estiver encerrada, exibe o formulário de voto
    <form onSubmit={handleSubmitVote(onSubmitVote)} className="space-y-4 mt-4">
      <Controller
        control={voteControl}
        name="opcaoId"
        rules={{ required: true }}
        render={({ field }) => (
          <div className="space-y-2">
            {votingData?.data.opcoes.map((opcao) => {
              const isSelected = field.value === opcao.id;
              return (
                <button
                  key={opcao.id}
                  type="button"
                  onClick={() => field.onChange(opcao.id)}
                  className={`w-full border rounded px-4 py-2 text-left transition-all
                    ${isSelected ? "border-blue-600 bg-blue-100" : "border-gray-300 hover:bg-gray-100"}
                  `}
                >
                  {opcao.descricao}
                </button>
              );
            })}
          </div>
        )}
      />


      <div className="flex justify-end gap-2 text-xs font-semibold">
        <button
          type="button"
          className="button-cancel"
          onClick={() => setOpenVotingModal(false)}
        >
          Cancelar
        </button>
        <button className="button-confirm" type="submit">
          Votar
        </button>
      </div>
    </form>
  )}
</DialogContent>

      </Dialog>
    </>
  );
};

export { VotingCardOptions };
