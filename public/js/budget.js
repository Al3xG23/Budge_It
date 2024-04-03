const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#bill-name').value.trim();
  const needed_funding = document.querySelector('#bill-funding').value.trim();
  const description = document.querySelector('#bill-desc').value.trim();

  if (name && needed_funding && description) {
    const response = await fetch(`/api/bills`, {
      method: 'POST',
      body: JSON.stringify({ name, needed_funding, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create bill');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/bills/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete bill');
    }
  }
};

document
  .querySelector('.new-bill-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.bill-list')
  .addEventListener('click', delButtonHandler);
