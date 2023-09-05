import React from "react";
import ReactDOMClient from "react-dom/client";
import { IphonePro } from "./screens/IphonePro";

const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);
root.render(<IphonePro />);
