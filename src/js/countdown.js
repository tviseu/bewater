// Countdown Timer for July 14, 2025 gym opening
class CountdownTimer {
    constructor() {
        // Target date: July 14, 2025 at 00:00:00
        this.targetDate = new Date('2025-07-14T00:00:00').getTime();
        
        // Get countdown elements
        this.daysElement = document.getElementById('countdown-days');
        this.hoursElement = document.getElementById('countdown-hours');
        this.minutesElement = document.getElementById('countdown-minutes');
        this.secondsElement = document.getElementById('countdown-seconds');
        
        // Check if elements exist before starting
        if (this.daysElement && this.hoursElement && this.minutesElement && this.secondsElement) {
            this.startCountdown();
        }
    }
    
    startCountdown() {
        // Update immediately
        this.updateCountdown();
        
        // Update every second
        this.interval = setInterval(() => {
            this.updateCountdown();
        }, 1000);
    }
    
    updateCountdown() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;
        
        if (distance < 0) {
            // Target date has passed
            this.showExpiredMessage();
            clearInterval(this.interval);
            return;
        }
        
        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Format numbers with leading zeros (except days)
        this.daysElement.textContent = days.toString(); // No padding for days
        this.hoursElement.textContent = this.formatNumber(hours, 2);
        this.minutesElement.textContent = this.formatNumber(minutes, 2);
        this.secondsElement.textContent = this.formatNumber(seconds, 2);
    }
    
    formatNumber(num, minDigits) {
        return num.toString().padStart(minDigits, '0');
    }
    
    showExpiredMessage() {
        // Show that the gym is now open
        this.daysElement.textContent = '0';
        this.hoursElement.textContent = '00';
        this.minutesElement.textContent = '00';
        this.secondsElement.textContent = '00';
        
        // Update title to show it's open
        const titleElement = document.querySelector('.countdown-title');
        if (titleElement) {
            titleElement.textContent = 'JÁ ESTAMOS ABERTOS!';
        }
    }
    
    destroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}

// Initialize countdown when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CountdownTimer();
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (window.countdownTimer) {
        window.countdownTimer.destroy();
    }
}); 