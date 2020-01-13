import Swal from 'sweetalert2'

export function successAlert(message = "Dữ liệu đã được cập nhật!") {
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

export function deleteSuccess(message) {
  Swal.fire(
    "Deleted!",
    message,
    "success"
  );
}

export function deleteFailed(message) {
  Swal.fire(
    "Failed!",
    message,
    "error"
  )
}