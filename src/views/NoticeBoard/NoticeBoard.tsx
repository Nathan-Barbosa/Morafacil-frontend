import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components";
import {
  CreateNoticesRequestDTO,
  useGetNoticeQuery,
  useGetNoticesListQuery,
  usePostCreateNoticeMutation,
} from "../../services";
import { useToast } from "../../hooks/use-toast";
import { MagnifyingGlass, DotsThreeVertical } from "@phosphor-icons/react";
import { NoticeCardOptions } from "./components";
import { useDebounce } from "use-debounce";
import { NoticeResponseDTO } from "../../models";
import { useAuth } from "../../providers";
import Loading from "../../components/ui/loading";
import Pagination from "../../components/ui/pagination";


const NoticeBoard = () => {
  const { user } = useAuth();
  const isAdmin = user?.roles?.includes("Admin");
  const isAdminCond = user?.roles?.includes("AdminCond");
  const podeGerenciar = isAdmin || isAdminCond;
  const [openNoticeModal, setOpenNoticeModal] = useState(false);
  const [noticeFilter, setNoticeFilter] = useState<string>("");
  const [debouncedNoticeFilter] = useDebounce(noticeFilter, 1000);
  const [allNotices, setAllNotices] = useState<NoticeResponseDTO[] | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { toast } = useToast();
  const { data: notices,
    refetch: refetchNotices,
    isLoading: isLoadingNotices,
    isFetching: isFetchingNotices,
  } = useGetNoticesListQuery({
    pageNumber: currentPage,
    pageSize,
  });
  const { mutate: postNotice } = usePostCreateNoticeMutation();
  const { data: notice } = useGetNoticeQuery(Number(debouncedNoticeFilter));

  useEffect(() => {
    if (debouncedNoticeFilter && !isNaN(Number(debouncedNoticeFilter))) {
      if (notice && notice.data) {
        setAllNotices([notice.data]);
      } else {
        setAllNotices([]);
      }
    } else if (notices?.data) {
      setAllNotices(notices.data);
    }
  }, [debouncedNoticeFilter, notice, notices]);

  const { register, handleSubmit, reset } = useForm<CreateNoticesRequestDTO>();

  const onSubmitNotice = (data: CreateNoticesRequestDTO) => {
    console.log(user);
    if (!user?.condominioId) {
      toast({
        title: "Erro",
        description: "Usuário não está vinculado a um condomínio.",
        variant: "destructive",
      });
      return;
    }
  
    const payload: CreateNoticesRequestDTO = {
      ...data,
      condominioId: Number(user.condominioId),
    };
  
    postNotice(payload, {
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

  // const { data: condosData } = useGetCondosListQuery({ pageNumber: 1, pageSize: 100 });
  // const condominios = condosData?.data || [];

  useEffect(() => {
    refetchNotices();
  }, []);

  if (isLoadingNotices || isFetchingNotices) {
    return <Loading />;
  }
  

  return (
    <div className="space-y-6 w-full flex flex-col overflow-auto h-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quadro de Avisos</h1>
          <p className="text-gray-600 font-semibold">Lista de avisos recentes</p>
        </div>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            value={noticeFilter}
            onChange={(e) => setNoticeFilter(e.target.value)}
            placeholder="Buscar por residência por id"
            className="px-3 py-2 border border-gray-300 rounded w-64"
          />
          {podeGerenciar && (
          <button
            className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition"
            onClick={() => setOpenNoticeModal(true)}
          >
            Novo Aviso
          </button>
          )}
        </div>
      </div>

      <div className="flex h-full flex-col gap-y-4 overflow-auto">
        {allNotices && allNotices.length > 0 ? (
          <section className="flex flex-row flex-wrap gap-2 w-full">
            {allNotices.map((notice) => (
              <li
                key={notice.id}
                className="hover:bg-blue-100 relative flex max-w-96 w-full flex-col justify-between rounded-xl border border-gray4 p-3 bg-blue-50"
              >
                {podeGerenciar && (
                  <div className="ml-auto absolute self-end">
                    <NoticeCardOptions notice={notice}>
                      <button className="right-4 flex rounded bg-transparent outline-none hover:bg-blue-400">
                        <DotsThreeVertical className="size-6" weight="bold" />
                      </button>
                    </NoticeCardOptions>
                  </div>
                )}
                <h2 className="text-sm font-semibold">{notice.titulo}</h2>
                <p className="text-gray-600">{notice.mensagem}</p>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-400">
                    Publicado em {new Date(notice.dataPublicacao).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-400">{notice.usuario?.userName}</p>
                </div>
              </li>
            ))}
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center top-1/2 text-center h-full w-full">
            <MagnifyingGlass size={150} weight="duotone" className="text-gray-400" />
            <span className="mt-2 text-gray-600">Nenhum usuário encontrado</span>
          </div>
        )}
      </div>

      {!debouncedNoticeFilter && notices && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil((notices.totalCount ?? 0) / pageSize)}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

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
            <div className="flex justify-end gap-2 text-xs font-semibold">
              <button
                type="button"
                className="button-cancel"
                onClick={() => setOpenNoticeModal(false)}
              >
                Cancelar
              </button>
              <button className="button-confirm" type="submit">
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
