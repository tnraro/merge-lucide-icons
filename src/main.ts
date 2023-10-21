import App from "./app.svelte";
import "./styles/_base.scss";

const app = new App({
  target: document.getElementById("app")!,
});

export default app;