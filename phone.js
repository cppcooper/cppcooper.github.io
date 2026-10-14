(() => {
    // Obfuscation reduces casual scraping; a public browser script is not secret.
    const encodedMissingDigits = [0x6e, 0x6e];
    const button = document.getElementById('reveal-phone');
    const placeholder = document.getElementById('phone-number');
    if (!button || !placeholder) return;
    const maskedNumber = placeholder.textContent.trim();
    if (!maskedNumber.includes('##')) return;

    let manuallyRevealed = false;
    let printView = false;
    let printing = false;

    function RenderPhone() {
        const showNumber = manuallyRevealed || printView || printing;
        button.hidden = showNumber;
        if (!showNumber) {
            placeholder.textContent = maskedNumber;
            return;
        }
        const missingDigits = encodedMissingDigits.map(value => String.fromCharCode(value ^ 0x5a)).join('');
        const revealedNumber = maskedNumber.replace('##', missingDigits);
        const link = document.createElement('a');
        link.className = 'resume-link';
        link.href = `tel:+${revealedNumber.replace(/\D/g, '')}`;
        link.textContent = revealedNumber;
        placeholder.replaceChildren(link);
    }

    button.addEventListener('click', () => {
        manuallyRevealed = true;
        RenderPhone();
        placeholder.querySelector('a').focus({preventScroll: true});
    });
    window.addEventListener('resumeviewchange', event => {
        printView = event.detail.printFriendly;
        RenderPhone();
    });
    window.addEventListener('beforeprint', () => {
        printing = true;
        RenderPhone();
    });
    window.addEventListener('afterprint', () => {
        printing = false;
        RenderPhone();
    });

    RenderPhone();
})();
