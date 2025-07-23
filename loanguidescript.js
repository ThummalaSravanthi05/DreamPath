// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Eligibility Calculator
const eligibilityForm = document.getElementById('eligibility-form');
const eligibilityResult = document.getElementById('eligibility-result');

eligibilityForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const age = parseInt(document.getElementById('age').value);
    const score = parseInt(document.getElementById('score').value);
    const courseType = document.getElementById('course-type').value;
    
    let eligible = true;
    let message = '';
    
    // Basic eligibility checks
    if (age < 18 || age > 35) {
        eligible = false;
        message = 'Age should be between 18 and 35 years.';
    } else if (score < 60) {
        eligible = false;
        message = 'Minimum academic score required is 60%.';
    } else if (!courseType) {
        eligible = false;
        message = 'Please select a course type.';
    }
    
    // Display result
    eligibilityResult.innerHTML = `
        <div class="${eligible ? 'success' : 'error'}" style="margin-top: 1rem; padding: 1rem; border-radius: 5px; background: ${eligible ? '#d4edda' : '#f8d7da'}; color: ${eligible ? '#155724' : '#721c24'}">
            ${eligible ? 'Congratulations! You are eligible for the education loan.' : `Sorry! You are not eligible. ${message}`}
        </div>
    `;
});

// Contact Form
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show success message (in real application, this would send data to a server)
    const button = contactForm.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Message Sent!';
    button.style.backgroundColor = '#27ae60';
    
    // Reset form and button
    setTimeout(() => {
        contactForm.reset();
        button.textContent = originalText;
        button.style.backgroundColor = '';
    }, 3000);
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .loan-card, .timeline-item').forEach(el => {
    observer.observe(el);
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Add CSS classes for scroll animations
const style = document.createElement('style');
style.textContent = `
    .feature-card, .loan-card, .timeline-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .feature-card.animate, .loan-card.animate, .timeline-item.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .navbar.scroll-down {
        transform: translateY(-100%);
    }
    
    .navbar.scroll-up {
        transform: translateY(0);
    }
    
    .navbar {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);

// Add Chart.js script to the head
const chartScript = document.createElement('script');
chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.js';
document.head.appendChild(chartScript);

// Loan Calculator
const loanCalculatorForm = document.getElementById('loan-calculator-form');
const monthlyEmiElement = document.getElementById('monthly-emi');
const totalInterestElement = document.getElementById('total-interest');
const totalAmountElement = document.getElementById('total-amount');
let loanChart = null;

function calculateLoan(amount, interestRate, years) {
    const monthlyRate = interestRate / 1200; // Convert annual rate to monthly decimal
    const numberOfPayments = years * 12;
    
    // Calculate EMI using the formula: EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
    const emi = amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) 
              / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalAmount = emi * numberOfPayments;
    const totalInterest = totalAmount - amount;
    
    return {
        emi: emi,
        totalInterest: totalInterest,
        totalAmount: totalAmount
    };
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

function updateChart(loanAmount, totalInterest) {
    const ctx = document.getElementById('loan-chart').getContext('2d');
    
    if (loanChart) {
        loanChart.destroy();
    }
    
    loanChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Principal Amount', 'Total Interest'],
            datasets: [{
                data: [loanAmount, totalInterest],
                backgroundColor: [
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(46, 204, 113, 0.8)'
                ],
                borderColor: [
                    'rgba(52, 152, 219, 1)',
                    'rgba(46, 204, 113, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

loanCalculatorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const loanAmount = parseFloat(document.getElementById('loan-amount').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value);
    const loanTerm = parseFloat(document.getElementById('loan-term').value);
    
    const result = calculateLoan(loanAmount, interestRate, loanTerm);
    
    // Update result elements with animation
    const elements = [
        { element: monthlyEmiElement, value: result.emi },
        { element: totalInterestElement, value: result.totalInterest },
        { element: totalAmountElement, value: result.totalAmount }
    ];
    
    elements.forEach(({ element, value }) => {
        const startValue = parseFloat(element.textContent.replace(/[^0-9.-]+/g, '')) || 0;
        const endValue = value;
        const duration = 1000; // 1 second animation
        const startTime = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = startValue + (endValue - startValue) * progress;
            element.textContent = formatCurrency(currentValue);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    });
    
    // Update chart
    updateChart(loanAmount, result.totalInterest);
    
    // Add success animation to calculator form
    loanCalculatorForm.classList.add('success');
    setTimeout(() => {
        loanCalculatorForm.classList.remove('success');
    }, 1000);
});

// Add CSS animation for calculator form
const calculatorStyle = document.createElement('style');
calculatorStyle.textContent = `
    @keyframes successPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
    
    .calculator-form.success {
        animation: successPulse 1s ease;
    }
`;
document.head.appendChild(calculatorStyle); 