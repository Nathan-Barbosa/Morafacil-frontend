import { useState } from "react";
import { MenuItem, NoticeCardOptionsProps } from "./NoticeCardOptions.types";
import { useToast } from "../../../../hooks/use-toast";
import { useDeleteNoticeMutation } from "../../../../services";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components";
import { ConfirmDialog } from "../ConfirmDialog";

const NoticeCardOptions = ({ children, notice }: NoticeCardOptionsProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { toast } = useToast();
  const { mutate: deleteNotice } = useDeleteNoticeMutation();

  const onEdit = () => console.log("Abrir modal Edit");
  const onRemove = () => setOpenDialog(true);

  const onSuccess = () => {
    toast({
      title: "Sucesso",
      description: `Aviso removido com sucesso!`,
      variant: "default",
    });
    setOpenDialog(false);
  };

  const handleConfirmRemoveNotice = async () => {
    deleteNotice(notice.id, { onSuccess });
  };

  const menuItems: MenuItem[] = [
    { label: "Editar", callback: onEdit },
    { label: "Remover", callback: onRemove },
  ];

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
        notice={notice}
        open={openDialog}
        setOpen={setOpenDialog}
        onConfirm={handleConfirmRemoveNotice}
      />
    </>
  );
};

export { NoticeCardOptions };
