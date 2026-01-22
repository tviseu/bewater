// Autenticação para staff.html
const StaffAuth = {
    isAuthenticated() {
        return sessionStorage.getItem('staff_authenticated') === 'true' && 
               !!sessionStorage.getItem('staff_token');
    },

    getToken() {
        return sessionStorage.getItem('staff_token');
    },

    async login(password) {
        try {
            const response = await fetch('/.netlify/functions/staff-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });

            const data = await response.json();

            if (data.success) {
                sessionStorage.setItem('staff_authenticated', 'true');
                sessionStorage.setItem('staff_token', password); // Usamos a password como token simples
                return { success: true };
            } else {
                return { success: false, message: data.message || 'Password incorreta' };
            }
        } catch (error) {
            console.error('Erro no login:', error);
            return { success: false, message: 'Erro de conexão com o servidor' };
        }
    },

    logout() {
        sessionStorage.removeItem('staff_authenticated');
        sessionStorage.removeItem('staff_token');
        window.location.reload();
    },

    // Helper para adicionar headers de auth em fetch
    getAuthHeader() {
        return { 'Authorization': `Bearer ${this.getToken()}` };
    }
};

// Verificar auth imediatamente
(function() {
    if (!StaffAuth.isAuthenticated() && !window.location.pathname.includes('login')) {
        // O modal de login será mostrado pelo staff.html se isAuthenticated() for false
        console.log('Utilizador não autenticado');
    }
})();
