import Swal from "sweetalert2";

export function useConfirmDelete() {
  const confirmDelete = async (
    onConfirm: () => Promise<void>,
    options?: {
      title?: string;
      text?: string;
    }
  ) => {
    const result = await Swal.fire({
      title: options?.title ?? "Xác nhận xóa?",
      text: options?.text ?? "Dữ liệu sẽ bị xóa vĩnh viễn!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
       customClass: {
        container: "swal2-z-99999",
      },
    });

    if (result.isConfirmed) {
      await onConfirm();
      Swal.fire("Đã xóa!", "Thao tác xóa thành công.", "success");
    }
  };

  return { confirmDelete };
}
