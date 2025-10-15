let users = JSON.parse(localStorage.getItem('users')) || [];

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const panel = document.getElementById('panel');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const user = users.find(u => u.email === email && u.password === password);

      if (user && !user.blocked) {
        localStorage.setItem('loggedUser', JSON.stringify(user));
        window.location.href = 'dashboard.html';
      } else {
        alert('Credenciales inválidas o cuenta bloqueada');
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const role = document.getElementById('role').value;

      users.push({ id: Date.now(), name, email, password, role, blocked: false });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Cuenta creada');
      window.location.href = 'index.html';
    });
  }

  if (panel) {
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    if (!user) return window.location.href = 'index.html';

    panel.innerHTML = `<h2>Bienvenido, ${user.name}</h2><p>Rol: ${user.role}</p>`;

    if (user.role === 'admin') {
      panel.innerHTML += `<h3>Usuarios activos</h3><ul>${users.map(u => `
        <li>${u.name} (${u.role}) - ${u.blocked ? 'Bloqueado' : 'Activo'}
        <button onclick="toggleBlock(${u.id})">Bloquear/Desbloquear</button>
        <button onclick="resetPassword(${u.id})">Resetear clave</button></li>`).join('')}</ul>`;
    } else {
      panel.innerHTML += `<p>Acceso limitado según tu rol.</p>`;
    }
  }
});

function toggleBlock(id) {
  const users = JSON.parse(localStorage.getItem('users'));
  const index = users.findIndex(u => u.id === id);
  users[index].blocked = !users[index].blocked;
  localStorage.setItem('users', JSON.stringify(users));
  location.reload();
}

function resetPassword(id) {
  const nueva = prompt('Nueva clave:');
  if (nueva) {
    const users = JSON.parse(localStorage.getItem('users'));
    const index = users.findIndex(u => u.id === id);
    users[index].password = nueva;
    localStorage.setItem('users', JSON.stringify(users));
    alert('Clave actualizada');
    location.reload();
  }
}
