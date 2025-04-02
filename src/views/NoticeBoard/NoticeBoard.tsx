import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components";
import { useGetNoticesQuery } from "../../services";
// import { useGetNoticesQuery, usePostNoticeMutation } from "../../services/NoticeService";
// import { useToast } from "../../hooks/use-toast";

const notices = {
  data: [
    {
      id: 1,
      titulo: "Manutenção",
      mensagem: "Manutenção na portaria sábado ás 10:30h",
      dataPublicacao: "2025-04-02T22:22:18.3587325",
      usuario: {
        id: 1,
        userName: "kazeneithan@gmail.com",
      },
    },
  ],
};

const NoticeBoard = () => {
  const [openNoticeModal, setOpenNoticeModal] = useState(false);
  // const { toast } = useToast();
  const { data: notices } = useGetNoticesQuery();
  // const { mutate: postNotice } = usePostNoticeMutation();

  const { register, handleSubmit, reset } = useForm();

  // const onSubmitNotice = (data) => {
  //   postNotice(data, {
  //     onSuccess: () => {
  //       toast({ title: "Sucesso", description: "Aviso publicado com sucesso!" });
  //       setOpenNoticeModal(false);
  //       refetchNotices();
  //       reset();
  //     },
  //   });
  // };

  return (
    <div className="p-6 space-y-6 h-full w-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quadro de Avisos</h1>
          <p className="text-gray-600">Lista de avisos recentes</p>
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
          <ul className="space-y-4">
            {notices.data.map((notice) => (
              <li key={notice.id} className="p-4 bg-white shadow rounded-lg">
                <h2 className="text-lg font-semibold">{notice.titulo}</h2>
                <p className="text-gray-600">{notice.mensagem}</p>
                <p className="text-sm text-gray-400">
                  Publicado em {new Date(notice.dataPublicacao).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">Nenhum aviso encontrado</p>
        )}
      </div>

      <Dialog open={openNoticeModal} onOpenChange={setOpenNoticeModal}>
        <DialogContent className="bg-white p-6 rounded shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Novo Aviso</DialogTitle>
          </DialogHeader>

          {/*handleSubmit(onSubmitNotice)*/}
          <form onSubmit={() => console.log("teste")} className="space-y-4">
            <input
              type="text"
              placeholder="Título"
              {...register("title", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Conteúdo do aviso"
              {...register("content", { required: true })}
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
