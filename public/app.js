async function fetchTodos() {
  const res = await fetch('/api/todos');
  const todos = await res.json();
  const list = document.getElementById('todo-list');
  list.innerHTML = '';
  todos.forEach(t => {
    const li = document.createElement('li');
    li.textContent = t.text;
    const btn = document.createElement('button');
    btn.textContent = 'Rimuovi';
    btn.onclick = async () => {
      await fetch('/api/todos/' + t.id, { method: 'DELETE' });
      fetchTodos();
    };
    li.appendChild(btn);
    list.appendChild(li);
  });
}

document.getElementById('todo-form').addEventListener('submit', async e => {
  e.preventDefault();
  const input = document.getElementById('todo-input');
  const text = input.value.trim();
  if (text) {
    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    input.value = '';
    fetchTodos();
  }
});

fetchTodos();
