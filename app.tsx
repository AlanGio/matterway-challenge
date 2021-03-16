const puppeteer = require('puppeteer');
const promptClient = require('prompt');

(async () => {

  let browser = await puppeteer.launch({ headless: true });
  let page = await browser.newPage();
  await page.goto('https://www.goodreads.com/choiceawards/best-books-2020');

  const categories = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.category h4')).map((item: Element, index: number) => (index+1 + " - " + (item as HTMLElement).innerText));
  });

  let genreInt = -1;
  while (!categories[genreInt]) {
    console.log('Please select the number of your option: ', categories);
    const { genre } = await promptClient.get(['genre']);
    genreInt = parseInt(genre) - 1;
  }
 
  const categoryLinks = await page.$$('.category > a');

  const categoryUrl = await (await categoryLinks[genreInt].getProperty('href')).jsonValue();
  console.log('Category URL:', categoryUrl);

  await page.goto(categoryUrl);

  const booksLink = await page.$$('.pollAnswer__bookLink');
  const booksLinkUrl = await (await booksLink[Math.floor(Math.random() * booksLink.length)].getProperty('href')).jsonValue();
  console.log('Book URL:', booksLinkUrl);
  await page.goto(booksLinkUrl);

  const amazonButton = await page.$('#buyButton');
  const productUrlAmazon = await (await amazonButton.getProperty('href')).jsonValue();
  console.log('Amazon url:', productUrlAmazon);
  await browser.close();

  browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  page = await browser.newPage();

  await page.goto(productUrlAmazon);

  await page.click('#add-to-cart-button');
  await page.waitForNavigation();
  await page.click('#hlb-ptc-btn-native');

})();