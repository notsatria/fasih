import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:5174/');
  
  // Wait for React to render
  await new Promise(r => setTimeout(r, 2000));
  
  // Click dismiss if there's a modal
  try {
    await page.click('button:has-text("Save")');
  } catch(e) {}
  
  const rects = await page.evaluate(() => {
    const getRect = (selector) => {
      const el = document.querySelector(selector);
      return el ? el.getBoundingClientRect() : null;
    };
    
    return {
      hero: getRect('h1'),
      btn: getRect('button:has-text("Start Practicing")'),
      grid: getRect('.grid.md\\:grid-cols-3'),
      cards: Array.from(document.querySelectorAll('.grid.md\\:grid-cols-3 > div')).map(el => el.getBoundingClientRect()),
      banner: document.querySelector('.bg-erased.flex-col') ? document.querySelector('.bg-erased.flex-col').getBoundingClientRect() : null,
      pageHeight: document.body.scrollHeight
    };
  });
  
  console.log(JSON.stringify(rects, null, 2));
  await browser.close();
})();
