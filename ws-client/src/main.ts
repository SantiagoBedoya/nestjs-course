import { connectToServer } from "./socket-client";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1> Websocket - Client</h1>
    <input id="jwt" placeholder="JWT" />
    <button id="btn-connect">Connect</button>

    <br />
    <span id="server-status">Offline</span>
    <ul id="clients-ul"></ul>

    <form id="message-form">
      <input placeholder="message" id="message-input" />
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>
  </div>
`;

// connectToServer();
const inputJwt = document.querySelector<HTMLInputElement>("#jwt")!;
const btnConnect = document.querySelector<HTMLButtonElement>("#btn-connect")!;
btnConnect.addEventListener("click", () => {
  if (inputJwt.value.trim().length <= 0) return alert("enter valid jwt");
  connectToServer(inputJwt.value.trim());
});
