const newFormHandler = async (event) => {
    event.preventDefault();
  
    const billName = document.querySelector('#bill-name').value.trim();
    const amount = document.querySelector('#bill-amount').value.trim();
    const dueDate = document.querySelector('#bill-due-date').value.trim();
    const Recurring = document.querySelector('#isRecurring').value.trim();
    const billType = document.querySelector('#bill-type').value.trim();
  
    if (billName && amount && dueDate && Recurring && billType) {
      const response = await fetch(`/api/projects`, {
        method: 'POST',
        body: JSON.stringify({ billName, amount, Recurring, dueDate, billType }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create bill');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  document
    .querySelector('.new-project-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.project-list')
    .addEventListener('click', delButtonHandler);
  