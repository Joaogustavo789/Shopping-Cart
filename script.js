const classeItems = document.getElementsByClassName('items')[0];
const classeCartItems = document.getElementsByClassName('cart__items')[0];
const classeTotalPrice = document.getElementsByClassName('total-price')[0];
const classeCart = document.getElementsByClassName('cart')[0];

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ id: sku, title: name, thumbnail: image, price: price }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${price}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

function listaProdutos() {
  fetchProducts('computador').then((resposta) => 
  resposta.results.forEach((item) => 
  classeItems.appendChild(createProductItemElement(item))));
}
listaProdutos();

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const subTotal = async (pay) => {
  const product = await fetchItem(pay);
  const valor = Number(classeTotalPrice.innerText) + Number(product.price);
  classeTotalPrice.innerText = valor;
};

const cartItemClickListener = (event) => {
  localStorage.setItem('totalPrice', classeTotalPrice.innerText);
  event.target.parentNode.remove();
  saveCartItems(classeCartItems.innerHTML);
};

const createCartItemElement = ({ thumbnail: image, title: name, price: salePrice }) => {
  const div = document.createElement('div');
  div.className = 'cart__item';
  div.appendChild(createProductImageElement(image));
  div.appendChild(createCustomElement('div', 'name__cart', `${name}`))
  div.appendChild(createCustomElement('div', 'price__cart', `R$ ${salePrice}`))
  return div;
};

function fixaProduto() {
  classeCartItems.addEventListener('click', cartItemClickListener);
 } 
 fixaProduto();

function adicionaProdutos(produto) {
  fetchItem(produto).then((response) => {
  classeCartItems.appendChild(createCartItemElement(response));
  saveCartItems(classeCartItems.innerHTML);
  subTotal(produto);
  localStorage.setItem('totalPrice', classeTotalPrice.innerText);
  });
}

const adicionaCarregando = async () => {
  const p = document.createElement('p');
  p.className = 'loading';
  p.innerText = 'carregando...';
  classeCart.appendChild(p);
  await fetchProducts('computador');
  p.remove();
}

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('item__add')) {
    const acessaProduto = event.target.parentNode.firstChild.innerText;
    adicionaProdutos(acessaProduto);
  }
  if (event.target.classList.contains('empty-cart')) {
    classeCartItems.innerHTML = '';
    classeTotalPrice.innerHTML = '';
    localStorage.clear();
  }
});

classeCartItems.innerHTML = getSavedCartItems();

window.onload = () => { adicionaCarregando() };
