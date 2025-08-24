(function () {
  // Obtener ID del widget desde el <script>
  const scriptTag = document.currentScript;
  const widgetId = scriptTag.id || "default-widget";

  // Botón flotante
  const button = document.createElement("button");
  button.innerText = "💬 Chat";
  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.zIndex = "9999";
  button.style.padding = "10px 15px";
  button.style.borderRadius = "50px";
  button.style.background = "#007bff";
  button.style.color = "#fff";
  button.style.border = "none";
  button.style.cursor = "pointer";

  // Panel de chat
  const chatBox = document.createElement("div");
  chatBox.style.position = "fixed";
  chatBox.style.bottom = "70px";
  chatBox.style.right = "20px";
  chatBox.style.width = "300px";
  chatBox.style.height = "400px";
  chatBox.style.background = "#fff";
  chatBox.style.border = "1px solid #ccc";
  chatBox.style.borderRadius = "10px";
  chatBox.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
  chatBox.style.display = "none";
  chatBox.style.zIndex = "9999";
  chatBox.style.flexDirection = "column";

  // Header
  const header = document.createElement("div");
  header.innerText = "Chat Widget";
  header.style.background = "#007bff";
  header.style.color = "#fff";
  header.style.padding = "10px";
  header.style.textAlign = "center";
  header.style.fontWeight = "bold";
  chatBox.appendChild(header);

  // Área de mensajes
  const messages = document.createElement("div");
  messages.style.flex = "1";
  messages.style.padding = "10px";
  messages.style.overflowY = "auto";
  chatBox.appendChild(messages);

  // Input + botón enviar
  const inputContainer = document.createElement("div");
  inputContainer.style.display = "flex";
  inputContainer.style.padding = "10px";
  inputContainer.style.borderTop = "1px solid #ccc";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Escribe un mensaje...";
  input.style.flex = "1";
  input.style.padding = "5px";
  input.style.border = "1px solid #ccc";
  input.style.borderRadius = "5px";
  inputContainer.appendChild(input);

  const sendBtn = document.createElement("button");
  sendBtn.innerText = "Enviar";
  sendBtn.style.marginLeft = "5px";
  sendBtn.style.background = "#007bff";
  sendBtn.style.color = "#fff";
  sendBtn.style.border = "none";
  sendBtn.style.padding = "5px 10px";
  sendBtn.style.borderRadius = "5px";
  sendBtn.style.cursor = "pointer";
  inputContainer.appendChild(sendBtn);

  chatBox.appendChild(inputContainer);

  document.body.appendChild(button);
  document.body.appendChild(chatBox);

  // Toggle abrir/cerrar
  button.addEventListener("click", () => {
    chatBox.style.display = chatBox.style.display === "none" ? "flex" : "none";
  });

  // Función para mostrar mensaje del bot
  function mostrarMensajeBot(msg) {
    const m = document.createElement("div");
    m.innerText = "Bot: " + msg;
    m.style.background = "#e6f0ff";
    m.style.margin = "5px 0";
    m.style.padding = "5px 8px";
    m.style.borderRadius = "8px";
    messages.appendChild(m);
    messages.scrollTop = messages.scrollHeight;
  }

  // Función para enviar mensaje
  function enviarMensaje() {
    const msg = input.value.trim();
    if (!msg) return;

    // Mostrar mensaje del usuario
    const userMsg = document.createElement("div");
    userMsg.innerText = "Tú: " + msg;
    userMsg.style.textAlign = "right";
    userMsg.style.margin = "5px 0";
    messages.appendChild(userMsg);

    // Enviar al backend con fetch
    fetch("https://pruebastesisback-production.up.railway.app/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg, id: widgetId })
    })
      .then(res => res.json())
      .then(data => mostrarMensajeBot(data.reply))
      .catch(err => mostrarMensajeBot("Error al enviar el mensaje"));

    input.value = "";
    messages.scrollTop = messages.scrollHeight;
  }

  sendBtn.addEventListener("click", enviarMensaje);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") enviarMensaje();
  });
})();
