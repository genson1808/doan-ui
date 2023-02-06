import { onBeforeUnmount, onMounted } from "vue";

/**
 * composable thực hiệc cho việc muốn xử lý logic khi user click bên ngoài một element
 * @param {*} el element ref
 * @param {*} cbFunc callback function muốn gọi khi click outside el
 * @author SONTB
 */
export function useClickOutside(el, pr, cbFunc) {
  if (!el) return;

  let listener = (e) => {
    // click bên trong element
    if (e.target == el.value || e.composedPath().includes(el.value)) {
      return;
    }

    if (pr) {
      // click bên trong element
      if (e.target == pr.value || e.composedPath().includes(pr.value)) {
        return;
      }
    }

    // click bên ngoài element
    if (typeof cbFunc == "function") {
      cbFunc();
    }
  };

  // khi element mounted thì add even listener
  onMounted(() => {
    window.addEventListener("click", listener);
  });

  // remove even listener trước khi element unmount
  onBeforeUnmount(() => {
    window.removeEventListener("click", listener);
  });
}
