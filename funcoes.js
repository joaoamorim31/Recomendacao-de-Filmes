//Sistema de Avaliação
document.querySelectorAll('.avaliacao').forEach(function(avaliacao) { //Seleciona todos elementos da class avalicação  e percorre sobre cada elemento encontrado
    var stars = avaliacao.querySelectorAll('.star-icon')// Seleciona todas estrelas dos icones dentro de avaliação
    
    avaliacao.addEventListener('click', function(e) { //Evento de cliack para cada avaliação
      var classStar = e.target.classList//Caso click CSS é aplicado 
  
      if (!classStar.contains('ativo')) {// Verifica se a estrela  clicada esta com a classe 'ativo' 
        stars.forEach(function(star) { //Remove a classe ativo de todas as estrelas
          star.classList.remove('ativo')
        })
        
        classStar.add('ativo')// Adiciona a classe 'ativo' à estrela clicada
        // Atualizar o atributo data-rating do card
        e.target.closest('.card').setAttribute('data-rating', e.target.getAttribute('data-avaliacao'))
        
        //console.log(e.target.getAttribute('data-avaliacao'))//Exibe as informações no console , caso queira inserir no banco de dados 
      }
    })
  })
//------------------------------------------------------------------------------------------

// Filtro por estrelas
document.getElementById('ratingFilter').addEventListener('change', function() {//adiciona um elemento de mudança change ao elemento como id ratingfilter
  var rating = this.value //Obtem o valor selecionado no filtro de avaliação
  
  // Percorre sobre todos os cards
  document.querySelectorAll('.card').forEach(function(card) {//Seleciona todos os elementos com a class card e percorre cada um 
      var cardRating = card.getAttribute('data-rating')//Obtem o valor do atributo de cada card que representa a avaliaçao

      
      // Exibe ou oculta o card com base na avaliação selecionada
      if (rating === '0' || cardRating === rating) {
        // Se o valor do filtro de avaliação for '0' (exibi todas as avaliações)
      // ou se a avaliação do card coincidir com o valor selecionado, 
      // o card será exibido
          card.style.display = 'block'// Exibe o card
      } else {//caso contrario
          card.style.display = 'none'//Oculta o card
      }
  });
});
//---------------------------------------------------------------------------------------

//  Sistema de pesquisa 
const searchInput = document.querySelector(".pesquisa-txt")// campo do texto de pesquisa 
const filmCards = document.querySelectorAll(".card") //Seleciona todos elementos com a class card no caso filmes/series 

searchInput.addEventListener("keyup", (e) => {     //caso precione a tecla no campo de pesquisa
  const searchTerm = e.target.value.toLowerCase() //Obtem e converte o valor para letras minuscular 

  filmCards.forEach(card => { //percorre todos os cards filme/series
    const title = card.querySelector("img").alt.toLowerCase()// Obtem e converte o texto digitado em "img" para minusculo

    if (title.includes(searchTerm)) { //Verifica se o titulo do filme contem o termo que foi pesquisado 
      card.style.display = "block"   //exibe o card do titulo pesquisado 
    } else {
      card.style.display = "none" //Oculta os card oposto do titulo pesquisado  
    }
  })
})


//-------------------------------------------------------------------------------------


// Função para exibir os favoritos na aba
function exibirFavoritos() {
  const listaFavoritos = document.getElementById('lista-favoritos') //seleciona o elemento da lista de favoritos onde os intens serão exibidos
  listaFavoritos.innerHTML = '' // Limpa o conteudo da lista de  favoritos antes de atualizar 

  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];// Obtem a lista de favoritos do armazenamento  local

  if (favorites.length === 0) { //Se a lista de favoritos estiver vazia, exibe uma mensagem indicando que nem um filme foi favoritado 
      listaFavoritos.innerHTML = '<li>Nenhum filme favoritado ainda.</li>'
  } else {
      favorites.forEach(film => {//Para cada filme/serie favoritado cria um elemento de lista nao ordenada  
          const li = document.createElement('li')
          li.textContent = film
          listaFavoritos.appendChild(li)
      });
  }
}

// Função para alternar entre favoritar e desfavoritar
function toggleFavorite(button) {
  const filmTitle = button.getAttribute('data-title')//Obtem o titulo do filme/serie  associado so botão, apartir do atributo data-title
  let favorites = JSON.parse(localStorage.getItem('favorites')) || []//Carrega a lista de favoritos do armazenamento local, ou crcia uma lista vazia se nao ouver favoritos

  if (favorites.includes(filmTitle)) {//verifica se o filme ja esta na lista de favoritos 
      
      favorites = favorites.filter(film => film !== filmTitle);// Remove o filme se já estiver favoritado
      button.textContent = 'Favoritar'//Atualiza o texto do botão favoritar quando o filme é removido 
  } else {
      // Adiciona o filme aos favoritos
      favorites.push(filmTitle)//Se o filme não for favorito, ele sera adicionado a lista 
      button.textContent = 'Desfavoritar'//Atualiza o texto do botão para desfavoritar quando o filme é favorito 
  }

  // Atualiza o localStorage
  localStorage.setItem('favorites', JSON.stringify(favorites))

  // Atualiza a exibição da lista de favoritos
  exibirFavoritos()
}

// Limpa os favoritos ao carregar a página e exibe a lista vazia
window.onload = function() {
  
  localStorage.clear()// Limpa todos os favoritos
  
  
  const buttons = document.querySelectorAll('.favorite-btn')// Seleciona todos os botoes de favoritos 
  buttons.forEach(button => {//Atualiza todos os botoes para favoritar ao carregar a  pagina 
      button.textContent = 'Favoritar'
  });

  // Exibe a lista de favoritos (vazia após a limpeza)
  exibirFavoritos()
};



