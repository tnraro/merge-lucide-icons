import { mount } from "svelte";
import App from "./app.svelte";
import "./styles/_base.scss";

const app = mount(App, {
  target: document.getElementById("app")!,
});

export default app;
