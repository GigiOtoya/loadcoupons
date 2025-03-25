type Coupon = {
  p: HTMLParagraphElement;
  a: HTMLAnchorElement;
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const loadCoupons = (): void => {
  const load = async function () {
    const couponSelector = "div.coupon-item";
    const pSelector = "p.coupon-brand-name";
    const anchorSelector = "a.available-to-clip";
    const coupons: Coupon[] = Array.from(document.querySelectorAll(couponSelector))
      .map((item): Coupon | null => {
        const p: HTMLParagraphElement | null = item.querySelector(pSelector);
        const a: HTMLAnchorElement | null = item.querySelector(anchorSelector);
        return p && a ? { p: p, a: a } : null;
      })
      .filter((item) => item !== null);

    let notLoaded = coupons.length;

    if (coupons.length > 0) {
      for (const coupon of coupons) {
        coupon.a.click();
        console.log(`${coupon.p.innerText} loaded`);
        notLoaded--;
        await delay(500);
      }
    }

    if (notLoaded === 0) {
      alert("All coupons loaded");
    }
  };

  const showAllSelector = "button.btn.btn-default.btn-sm";
  const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(showAllSelector);
  const pageSelector = "div.page-number";
  const page = document.querySelector(pageSelector);

  if (buttons.length > 0) {
    buttons.forEach((button: HTMLButtonElement) => {
      if (button.innerText.includes("Show All")) {
        button.click();
      }
    });
  }

  if (page) {
    const mutationObserver = new MutationObserver((mutations, observer) => {
      const text = page.textContent?.trim().replace(" ", "");
      if (text === "1/1") {
        observer.disconnect();
        load();
      }
    });
    mutationObserver.observe(page, { childList: true, subtree: true });
  } else {
    alert("page element not found");
  }

  return;
};

loadCoupons();
