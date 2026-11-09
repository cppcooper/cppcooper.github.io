(() => {
    const styles = document.getElementById('resume-print-styles');
    const controls = document.querySelector('.resume-actions');
    const toggle = document.getElementById('toggle-print-view');
    const printButton = document.getElementById('print-resume');
    const main = document.querySelector('.resume-main');
    const aside = document.querySelector('.resume-aside');
    const row = main.parentElement;
    let printFriendly = false;

    function PositionSidebar(forPrint) {
        if (forPrint) row.insertBefore(aside, main);
        else row.append(aside);
    }

    function SetPrintView(enabled) {
        printFriendly = enabled;
        styles.media = enabled ? 'all' : 'print';
        document.body.classList.toggle('print-friendly', enabled);
        PositionSidebar(enabled);
        toggle.setAttribute('aria-pressed', String(enabled));
        toggle.textContent = enabled ? 'Return to regular view' : 'Print-friendly view';
        window.dispatchEvent(new CustomEvent('resumeviewchange', {detail: {printFriendly: enabled}}));
    }

    toggle.addEventListener('click', () => {
        // Keep the clicked control in view when the layout changes.
        const topBefore = toggle.getBoundingClientRect().top;
        SetPrintView(!printFriendly);
        const topAfter = toggle.getBoundingClientRect().top;
        window.scrollBy(0, topAfter - topBefore);
    });

    // Printing preserves the selected cumulative profile and its skill filter.
    printButton.addEventListener('click', () => window.print());
    window.addEventListener('beforeprint', () => {
        PositionSidebar(true);
    });
    window.addEventListener('afterprint', () => {
        PositionSidebar(printFriendly);
    });

    controls.hidden = false;
})();
