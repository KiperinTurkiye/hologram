document.addEventListener('DOMContentLoaded', function () {
    const verificationForm = document.getElementById('verification-form');
    const resultDiv = document.getElementById('result');
    const validResult = document.getElementById('valid-result');
    const invalidResult = document.getElementById('invalid-result');
    const productCodeDisplay = document.getElementById('product-code-display');
    const customerNameDisplay = document.getElementById('customer-name');
    const orderDateDisplay = document.getElementById('order-date');
    const loadingIndicator = document.getElementById('loading-indicator');
    const productCodeInput = document.getElementById('product-code');

    // Customer database with product codes
    const customers = [
        { code: 'KCA00001', name: 'TO.... PE....', date: '12.04.2025' },
        { code: 'KCA00005', name: 'AY.... OZ....', date: '09.07.2025' },
        { code: 'KPCA00024', name: 'ME.... KA....', date: '23.05.2025' },
        { code: 'KPCA00415', name: 'AL.... YI....', date: '01.03.2025' },
        { code: 'KPCA00748', name: 'AH.... CE....', date: '17.06.2025' }
    ];

    // Check for URL parameter verification
    function checkUrlForVerificationCode() {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('verifycode');

        if (code) {
            productCodeInput.value = code.toUpperCase();
            verifyProductCode(code);
        }
    }

    // Verify product code
    function verifyProductCode(code) {
        // Reset previous results
        resultDiv.classList.add('hidden');
        validResult.classList.add('hidden');
        invalidResult.classList.add('hidden');

        // Show loading indicator
        loadingIndicator.classList.remove('hidden');

        // Simulate verification process with delay
        setTimeout(function () {
            // Hide loading indicator
            loadingIndicator.classList.add('hidden');

            // Find customer by product code (case-insensitive)
            const customer = customers.find(c => c.code.toLowerCase() === code.toLowerCase());

            if (customer) {
                // Display valid result with customer info
                productCodeDisplay.textContent = customer.code;
                customerNameDisplay.textContent = customer.name;
                orderDateDisplay.textContent = customer.date;
                validResult.classList.remove('hidden');
                resultDiv.classList.remove('hidden');

                // Update URL without reloading the page
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.set('verifycode', customer.code);
                window.history.pushState({}, '', newUrl);

                // Trigger confetti animation
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#4d7c0f', '#65a30d', '#84cc16', '#bef264']
                });
            } else {
                // Display invalid result
                invalidResult.classList.remove('hidden');
                resultDiv.classList.remove('hidden');
            }
        }, 1000); // 1 second delay
    }

    // Handle form submission
    verificationForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const productCode = productCodeInput.value.trim();
        verifyProductCode(productCode);
    });

    // Check URL for verification code when page loads
    checkUrlForVerificationCode();
});
