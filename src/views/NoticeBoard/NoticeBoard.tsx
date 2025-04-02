import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components";
import {
  CreateNoticesRequestDTO,
  useGetNoticesQuery,
  usePostCreateNoticeMutation,
} from "../../services";
import { useToast } from "../../hooks/use-toast";
import { MagnifyingGlass } from "@phosphor-icons/react";

const NoticeBoard = () => {
  const [openNoticeModal, setOpenNoticeModal] = useState(false);
  const { toast } = useToast();
  const { data: notices } = useGetNoticesQuery();
  const { mutate: postNotice } = usePostCreateNoticeMutation();

  const { register, handleSubmit, reset } = useForm<CreateNoticesRequestDTO>();

  const onSubmitNotice = (data: CreateNoticesRequestDTO) => {
    postNotice(data, {
      onSuccess: () => {
        toast({
          title: "Sucesso",
          description: "Aviso publicado com sucesso!",
          variant: "default",
        });
        setOpenNoticeModal(false);
        reset();
      },
    });
  };

  return (
    <div className="space-y-6 w-full flex flex-col overflow-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quadro de Avisos</h1>
          <p className="text-gray-600 font-semibold">Lista de avisos recentes</p>
        </div>
        <button
          className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition"
          onClick={() => setOpenNoticeModal(true)}
        >
          Novo Aviso
        </button>
      </div>

      <div className="overflow-x-auto">
        {notices?.data && notices.data.length > 0 ? (
          <ul className="grid grid-cols-3 gap-4">
            {notices.data.map((notice) => (
              <li key={notice.id} className="p-4 bg-white shadow-tooltipShadow rounded">
                <h2 className="text-sm font-semibold">{notice.titulo}</h2>
                <p className="text-gray-600">{notice.mensagem}</p>
                <p className="text-sm text-gray-400">
                  Publicado em {new Date(notice.dataPublicacao).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center top-1/2 text-center h-full w-full">
            <MagnifyingGlass size={150} weight="duotone" className="text-gray-400" />
            <span className="mt-2 text-gray-600">Nenhum usuário encontrado</span>
          </div>
        )}
      </div>

      <Dialog open={openNoticeModal} onOpenChange={setOpenNoticeModal}>
        <DialogContent className="bg-white p-6 rounded shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Novo Aviso</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmitNotice)} className="space-y-4">
            <input
              type="text"
              placeholder="Título"
              {...register("titulo", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Conteúdo do aviso"
              {...register("mensagem", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded max-h-[30vh] outline-none"
            ></textarea>
            <div className="flex gap-2 mt-4">
              <button
                type="button"
                className="w-full py-2 bg-gray-300 hover:bg-gray-400 rounded transition"
                onClick={() => setOpenNoticeModal(false)}
              >
                Cancelar
              </button>
              <button
                className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition disabled:bg-gray-400"
                type="submit"
              >
                Publicar
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export { NoticeBoard };
