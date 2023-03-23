import { render } from "inferno";

export default function toast(message: string, timeout: number, container: HTMLElement) {
  container.style.display = "block";
  render(<p $HasTextChildren>{message}</p>, container);
  setTimeout(() => {
    container.style.display = "none";
  }, timeout);
};
