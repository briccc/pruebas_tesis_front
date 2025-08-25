(function () {
  // Obtener ID del widget desde el <script>
  // const scriptTag = document.currentScript;
  // const widgetId = scriptTag.id || "default-widget";
  const widgetId = "default-widget";

// Botón flotante
const button = document.createElement("button")
button.innerText = "Chat"
button.style.position = "fixed"
button.style.bottom = "20px"
button.style.right = "20px"
button.style.zIndex = "2147483647"
button.style.padding = "12px 18px"
button.style.borderRadius = "50px"
button.style.background = "#B91C1C" // FACENA red color
button.style.color = "#fff"
button.style.border = "none"
button.style.cursor = "pointer"
button.style.fontFamily = "Arial, sans-serif"
button.style.fontWeight = "600"
button.style.fontSize = "14px"
button.style.boxShadow = "0 4px 12px rgba(185, 28, 28, 0.3)"
button.style.transition = "all 0.3s ease"

button.addEventListener("mouseenter", () => {
  button.style.background = "#991B1B"
  button.style.transform = "translateY(-2px)"
  button.style.boxShadow = "0 6px 16px rgba(185, 28, 28, 0.4)"
})

button.addEventListener("mouseleave", () => {
  button.style.background = "#B91C1C"
  button.style.transform = "translateY(0)"
  button.style.boxShadow = "0 4px 12px rgba(185, 28, 28, 0.3)"
})

// Panel de chat
const chatBox = document.createElement("div")
chatBox.style.position = "fixed"
chatBox.style.bottom = "80px"
chatBox.style.right = "20px"
chatBox.style.width = "320px"
chatBox.style.height = "450px"
chatBox.style.background = "#fff"
chatBox.style.border = "1px solid #E5E7EB"
chatBox.style.borderRadius = "12px"
chatBox.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)"
chatBox.style.display = "none"
chatBox.style.zIndex = "9999"
chatBox.style.flexDirection = "column"
chatBox.style.fontFamily = "Arial, sans-serif"

const header = document.createElement("div")
header.innerText = "Chat FACENA"
header.style.background = "#B91C1C" // FACENA red
header.style.color = "#fff"
header.style.padding = "15px"
header.style.textAlign = "center"
header.style.fontWeight = "600"
header.style.fontSize = "16px"
header.style.borderRadius = "12px 12px 0 0"
header.style.letterSpacing = "0.5px"
chatBox.appendChild(header)

// Área de mensajes
const messages = document.createElement("div")
messages.style.flex = "1"
messages.style.padding = "15px"
messages.style.overflowY = "auto"
messages.style.backgroundColor = "#F9FAFB"
chatBox.appendChild(messages)

const inputContainer = document.createElement("div")
inputContainer.style.display = "flex"
inputContainer.style.padding = "15px"
inputContainer.style.borderTop = "1px solid #E5E7EB"
inputContainer.style.backgroundColor = "#fff"
inputContainer.style.borderRadius = "0 0 12px 12px"

const input = document.createElement("input")
input.type = "text"
input.placeholder = "Escribe un mensaje..."
input.style.flex = "1"
input.style.padding = "10px 12px"
input.style.border = "1px solid #D1D5DB"
input.style.borderRadius = "8px"
input.style.fontSize = "14px"
input.style.outline = "none"
input.style.fontFamily = "Arial, sans-serif"

input.addEventListener("focus", () => {
  input.style.borderColor = "#B91C1C"
  input.style.boxShadow = "0 0 0 3px rgba(185, 28, 28, 0.1)"
})

input.addEventListener("blur", () => {
  input.style.borderColor = "#D1D5DB"
  input.style.boxShadow = "none"
})

inputContainer.appendChild(input)

const sendBtn = document.createElement("button")
sendBtn.innerText = "Enviar"
sendBtn.style.marginLeft = "8px"
sendBtn.style.background = "#B91C1C"
sendBtn.style.color = "#fff"
sendBtn.style.border = "none"
sendBtn.style.padding = "10px 16px"
sendBtn.style.borderRadius = "8px"
sendBtn.style.cursor = "pointer"
sendBtn.style.fontWeight = "600"
sendBtn.style.fontSize = "14px"
sendBtn.style.fontFamily = "Arial, sans-serif"
sendBtn.style.transition = "background-color 0.2s ease"

sendBtn.addEventListener("mouseenter", () => {
  sendBtn.style.background = "#991B1B"
})

sendBtn.addEventListener("mouseleave", () => {
  sendBtn.style.background = "#B91C1C"
})

inputContainer.appendChild(sendBtn)
chatBox.appendChild(inputContainer)

document.body.appendChild(button)
document.body.appendChild(chatBox)

// Toggle abrir/cerrar
button.addEventListener("click", () => {
  chatBox.style.display = chatBox.style.display === "none" ? "flex" : "none"
})

function mostrarMensajeBot(msg) {
  const m = document.createElement("div")
  m.innerText = "FACENA Bot: " + msg
  m.style.background = "#FEF2F2" // Light red background
  m.style.border = "1px solid #FECACA"
  m.style.margin = "8px 0"
  m.style.padding = "10px 12px"
  m.style.borderRadius = "12px 12px 12px 4px"
  m.style.fontSize = "14px"
  m.style.lineHeight = "1.4"
  m.style.color = "#374151"
  m.style.fontFamily = "Arial, sans-serif"
  messages.appendChild(m)
  messages.scrollTop = messages.scrollHeight
}

function enviarMensaje() {
  const msg = input.value.trim()
  if (!msg) return

  // Mostrar mensaje del usuario
  const userMsg = document.createElement("div")
  userMsg.innerText = "Tú: " + msg
  userMsg.style.textAlign = "right"
  userMsg.style.margin = "8px 0"
  userMsg.style.padding = "10px 12px"
  userMsg.style.backgroundColor = "#B91C1C"
  userMsg.style.color = "#fff"
  userMsg.style.borderRadius = "12px 12px 4px 12px"
  userMsg.style.fontSize = "14px"
  userMsg.style.lineHeight = "1.4"
  userMsg.style.fontFamily = "Arial, sans-serif"
  userMsg.style.maxWidth = "80%"
  userMsg.style.marginLeft = "auto"
  messages.appendChild(userMsg)

  input.value = ""
  messages.scrollTop = messages.scrollHeight

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
