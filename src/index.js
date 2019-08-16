'use strict';

//checkbox

function toggleCheckbox() {
	const checkbox = document.querySelectorAll('.filter-check_checkbox');

	checkbox.forEach(function (element) {
		element.addEventListener('change', function () {
			if (this.checked) {
				this.nextElementSibling.classList.add('checked');
			} else {
				this.nextElementSibling.classList.remove('checked');
			}
		});
	});
}

//end checkbox

//cart
function toggleCart() {
	const btnCart = document.getElementById('cart');
	const modalCart = document.querySelector('.cart');
	const closeBtn = document.querySelector('.cart-close');

	btnCart.addEventListener('click', () => {
		modalCart.style.display = 'flex';
		document.body.style.overflow = 'hidden';
		// modalCart.style.cssText = 'display: flex; font-size:30px;';
	});
	closeBtn.addEventListener('click', () => {
		modalCart.style.display = 'none';
		document.body.style.overflow = '';
	});
}

//end cart

//add and remove to/from cart
function addCart() {
	const cards = document.querySelectorAll('.goods .card'),
		cartWrapper = document.querySelector('.cart-wrapper'),
		cartEmpty = document.getElementById('cart-empty'),
		countGoods = document.querySelector('.counter');

	cards.forEach((card) => {
		const btn = card.querySelector('button');

		btn.addEventListener('click', () => {
			const cardClone = card.cloneNode(true);
			cartWrapper.appendChild(cardClone);
			showData();

			const removeBtn = cardClone.querySelector('.btn');
			removeBtn.textContent = 'Delete';
			removeBtn.addEventListener('click', () => {
				cardClone.remove();
				showData();
			});
		});

	});

	function showData() {
		const cardsCart = cartWrapper.querySelectorAll('.card'),
			cardsPrice = cartWrapper.querySelectorAll('.card-price'),
			cardTotal = document.querySelector('.cart-total span');

		countGoods.textContent = cardsCart.length;

		let sum = 0;
		cardsPrice.forEach((cardPrice) => {
			let price = parseFloat(cardPrice.textContent);
			sum += price;
		});
		cardTotal.textContent = sum;

		if (cardsCart.length === 0) {
			cartWrapper.appendChild(cartEmpty);
		} else {
			cartEmpty.remove();
		}
	}
}
//end and remove to/from cart

//filter /sales

function actionPage() {
	const cards = document.querySelectorAll('.goods .card'),
		discountCheckbox = document.getElementById('discount-checkbox'),
		// goods = document.querySelector('.good'),
		min = document.getElementById('min'),
		max = document.getElementById('max'),
		search = document.querySelector('.search-wrapper_input'),
		searchBtn = document.querySelector('.search-btn');

	// console.dir(cards[0]);

	//filter by discount

	discountCheckbox.addEventListener('click', filter);

	// discountCheckbox.addEventListener('click', () => {
	//     cards.forEach((card) => {
	//         if (discountCheckbox.checked) {
	//             if (!card.querySelector('.card-sale')) {
	//                 card.parentNode.remove();
	//                 // card.parentNode.style.display = 'none';
	//             }
	//         } else {
	//             goods.appendChild(card.parentNode);
	//             // card.parentNode.style.display = '';
	//         }
	//     });
	// });

	//filter by price
	min.addEventListener('change', filter);
	max.addEventListener('change', filter);

	// function filterPrice() {
	//     cards.forEach((card) => {
	//         const cardPrice = card.querySelector('.card-price');
	//         const price = parseFloat(cardPrice.textContent);

	//         if ((min.value && price < min.value) || (max.value && price > max.value)) {
	//             card.parentNode.remove();
	//             // card.parentNode.style.display = 'none';
	//         } else {
	//             goods.appendChild(card.parentNode);
	//             // card.parentNode.style.display = '';
	//         }
	//     });
	// }

	function filter() {
		cards.forEach((card) => {
			const cardPrice = card.querySelector('.card-price');
			const price = parseFloat(cardPrice.textContent);
			const discount = card.querySelector('.card-sale');

			if ((min.value && price < min.value) || (max.value && price > max.value)) {
				card.parentNode.style.display = 'none';
			} else if (discountCheckbox.checked && !discount) {
				card.parentNode.style.display = "none";
			} else {
				card.parentNode.style.display = '';
			}
		});
	}


	//search
	searchBtn.addEventListener('click', () => {
		const searchText = new RegExp(search.value.trim(), 'i');
		cards.forEach((card) => {
			const title = card.querySelector('.card-title');
			if (!searchText.test(title.textContent)) {
				card.parentNode.style.display = 'none';
			} else {
				card.parentNode.style.display = '';
			}
		});
		search.value = '';
		// console.log('searchText:' ,searchText);
	});
}
//end filter /sales

//get data from server
function getData() {
	const goodsWrapper = document.querySelector('.goods');
	return fetch('../db/db.json')
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error('Data was not found, Error: ' + response.status);
			}
		})
		.then((data) => {
			return data;
		})
		.catch(err => {
			console.warn(err);
			goodsWrapper.innerHTML = '<div style="color:red; font-size:30px;">Oops, something was going wrong! :/</div>';
		});
}

//render card data
function renderCards(data) {
	const goodsWrapper = document.querySelector('.goods');
	data.goods.forEach((good) => {
		const card = document.createElement('div');
		card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
		card.innerHTML = `
			<div class="card" data-category="${good.category}">
				${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>': ''}
				  <div class="card-img-wrapper">
				  	<span class="card-img-top"
				  	<style="background-image: url('${good.img}')"></span>
					</div>
					<div class="card-body justify-content-between">
				  	<div class="card-price" style="${good.sale ? 'color:red' : ''}">${good.price} ₽</div>
				  	<h5 class="card-title">${good.title}</h5>
				  	<button class="btn btn-primary">В корзину</button>
					</div>
			</div>	
		`;
		goodsWrapper.appendChild(card);
	});

}
//end get data from server

//render catalog
function renderCatalog() {
	const cards = document.querySelectorAll('.goods .card');
	const catalogList = document.querySelector('.catalog-list');
	const catalogWrapper = document.querySelector('.catalog');
	const catalogBtn = document.querySelector('.catalog-button');
	const categories = new Set();

	cards.forEach((card) => {
		categories.add(card.dataset.category);
	});

	categories.forEach((item) => {
		const li = document.createElement('li');
		li.textContent = item;
		catalogList.appendChild(li);
	});

	catalogBtn.addEventListener('click', (event) => {
		if (catalogWrapper.style.display) {
			catalogWrapper.style.display = '';
		} else {
			catalogWrapper.style.display = 'block';
		}

		if (event.target.tagName === 'LI') {
			cards.forEach((card) => {
				if (card.dataset.category === event.target.textContent) {
					card.parentNode.style.display = '';
				} else {
					card.parentNode.style.display = 'none';
				}
			});
		}
	});
}
//end render catalog

getData().then((data) => {
	renderCards(data);
	toggleCheckbox();
	toggleCart();
	addCart();
	actionPage();
	renderCatalog();
});