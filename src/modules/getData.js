export default function getData() {
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
