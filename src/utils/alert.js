import Swal from 'sweetalert2'

export function successAlert(message = "Data has been updated!") {
  Swal.fire({
    position: "top",
    type: "success",
    title: message,
    width: 600,
    padding: "3em"
  });
}

export function errorAlert(message = "Update data failed!") {
  Swal.fire({
    position: "top",
    type: "error",
    title: message,
    width: 600,
    padding: "3em"
  });
}