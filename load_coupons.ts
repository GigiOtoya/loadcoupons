type Coupon = {
    p: HTMLParagraphElement
    a: HTMLAnchorElement
};

const loadCoupons = function() {
    const showAllSelector = 'button.btn.btn-default.btn-sm';
    const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(showAllSelector);
    const pageSelector = 'div.page-number';
    const page = document.querySelector(pageSelector);

    let clicked = false;

    if (buttons.length > 0) {
        buttons.forEach((button: HTMLButtonElement) => {
            if (button.innerText.includes("Show All")) {
                button.click();
                clicked = true;
            }
        });
    }

    const loadCoupons = function() {
        const couponSelector = 'div.coupon-item';
        const pSelector = 'p.coupon-brand-name';
        const anchorSelector = 'a.available-to-clip';
        const coupons: Coupon[] = Array
            .from(document.querySelectorAll(couponSelector))
            .map((item): Coupon | null => {
                const p: HTMLParagraphElement | null = item.querySelector(pSelector);
                const a: HTMLAnchorElement | null = item.querySelector(anchorSelector);
                return p && a ? { p: p, a: a } : null;
            })
            .filter((item) => item !== null);

        let notLoaded = coupons.length;

        if (coupons.length > 0) {
            coupons.forEach((coupon) => {
                coupon.a.click();
                console.log(`${coupon.p.innerText} loaded`);
                notLoaded--;
            })
        }

        if (notLoaded === 0) {
            alert('all coupons loaded');
        }
    };

    if (page) {
        const mutationObserver = new MutationObserver((mutations, observer) => {
            const text = page.textContent?.trim().replace(' ', '');
            if (text === '1/1') {
                observer.disconnect()
                loadCoupons();
            }
        });
        mutationObserver.observe(page, { childList: true, subtree: true });
    } else {
        alert('page element not found');
    }

    return
};

(function() {
    let script = document.createElement('script');
    script.src = 'load_coupons.ts';
    document.body.appendChild(script);
})();
