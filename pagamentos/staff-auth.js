// Autenticação client-side para staff.html
(function() {
    'use strict';
    
    // Verificar se já está autenticado
    if (sessionStorage.getItem('staff_authenticated') === 'true') {
        return; // Já autenticado
    }
    
    // Pedir credenciais
    const username = prompt('Username:');
    const password = prompt('Password:');
    
    // Verificar credenciais
    if (username === 'admin' && password === 'staff2025') {
        sessionStorage.setItem('staff_authenticated', 'true');
        // Continuar a carregar a página
    } else {
        alert('Credenciais inválidas!');
        window.location.href = '/pagamentos/'; // Redirecionar para página principal
    }
})(); 