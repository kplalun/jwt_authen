import Swal from "sweetalert2";

export const alert = {
  error: (text) =>
    Swal.fire({
      title: "Warning!",
      text: text,
      icon: "warning",
      showConfirmButton: false,
      timer: 1500,
    }),
  success: (text) =>
    Swal.fire({
      text: text,
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    }),
};
