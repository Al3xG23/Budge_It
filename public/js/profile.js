const newFormHandler = async (event) => {
  event.preventDefault();

  const billName = document.querySelector('#bill-name').value.trim();
  const amount = document.querySelector('#bill-amount').value.trim();
  const dueDate = document.querySelector('#bill-due-date').value.trim();
  const Recurring = document.querySelector('#isRecurring').value.trim();
  const billType = document.querySelector('#bill-type').value.trim();

  if (billName && amount && dueDate && Recurring && billType) {
    const response = await fetch(`/api/bills`, {
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

    const response = await fetch(`/api/bills/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to delete bill');
    }
  }
};


document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');
  console.log("helloworld");

  fetch(`/api/bills/calendar`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  .then(response => {
    console.log(response);
    return response.json()
  })
    .then(billData => {
      console.log('events', billData)
      var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: billData,
      });
      calendar.render();

    });
});


document
  .querySelector('.new-bill-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.bill-list')
  .addEventListener('click', delButtonHandler);
