if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      let reg;
      reg = await navigator.serviceWorker.register("/sw.js", {
        type: "module",
      });
      console.log("Service worker registrado com sucesso!😎", reg);
    } catch (err) {
      console.log("😢Service worker registro falhou:", err);
    }
  });
}

let posicaoInicial; // Variável para capturar a posição
const capturarLocalizacao = document.getElementById("localizacao");
const latitude = document.getElementById("latitude");
const longitude = document.getElementById("longitude");

const sucesso = (posicao) => {
  // Callback de sucesso para captura da posição
  posicaoInicial = posicao;
  latitude.innerHTML = posicaoInicial.coords.latitude;
  longitude.innerHTML = posicaoInicial.coords.longitude;
};

const erro = (error) => {
  // Callback de erro (falha para captura de localização)
  let errorMessage;
  switch (error.code) {
    case 0:
      errorMessage = "Erro desconhecido";
      break;
    case 1:
      errorMessage = "Permissão negada!";
      break;
    case 2:
      errorMessage = "Captura de posição indisponível!";
      break;
    case 3:
      errorMessage = "Tempo de solicitação excedido!";
      break;
    default:
      errorMessage = "Erro não categorizado!";
  }
  console.log("Ocorreu um erro: " + errorMessage);
};

capturarLocalizacao.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(sucesso, erro);
});
