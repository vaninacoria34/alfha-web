export default async function run(page, ui) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1200);
  return await page.evaluate(() => ({
    barWidth: document.getElementById('scroll-progress-bar').style.width,
    backToTopVisible: document.getElementById('back-to-top').classList.contains('show'),
    revealed: document.querySelectorAll('.reveal.visible').length,
    totalReveal: document.querySelectorAll('.reveal').length,
    activeNav: [...document.querySelectorAll('.nav-link.active-scroll')].map(a => a.textContent.trim())
  }));
}
