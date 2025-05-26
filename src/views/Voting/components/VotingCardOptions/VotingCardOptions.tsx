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

  const menuItems: MenuItem[] = [
    { label: "Votar", callback: onVote },
    voting.encerrada ? null : { label: "Encerrar", callback: onCloseVoting },
  ].filter(Boolean) as MenuItem[];

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
            <DialogTitle className="text-lg font-semibold">{votingData?.data.titulo}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmitVote(onSubmitVote)} className="space-y-4">
            <Controller
              control={voteControl}
              name="opcaoId"
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  onValueChange={(val) => field.onChange(Number(val))}
                  value={field.value?.toString()}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma opção para votar" />
                  </SelectTrigger>
                  <SelectContent>
                    {votingData?.data.opcoes.map((opcao) => (
                      <SelectItem key={opcao.id} value={opcao.id.toString()}>
                        {opcao.descricao}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export { VotingCardOptions };
