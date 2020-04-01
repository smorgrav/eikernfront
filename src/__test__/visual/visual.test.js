import Differencify from 'differencify';
import 'isomorphic-fetch';

const differencify = new Differencify({ debug: true });
const site = 'http://localhost:3000';

/**
 * Create sitemap entry
 *
 * @param url The view to render
 * @param options Map of optional options:
 *    waitms The time to give the renderer engine to render the final result. Defaults to something sane
 *    selector Waits for this selector to appear before continuing. Changes default wait to something small
 *    user Nickname of the logged in user, null for not logged in
 *    operator Boolean
 *    public Boolean, true for public, false for on-prem
 * @returns {*[]}
 */
const siteMapEntry = (url, options = {}) => {
  let name = url.replace(/\/|\?|<|>|%[0-9][A-Z]/g, '-');
  if (name === '-') name = 'root';
  if (options.user) name += '-' + options.user;
  const { selector, waitms, ...userOptions } = options;
  return [name, url, selector, waitms || selector ? 50 : 1000, userOptions];
};

/**
 * Array with one array pr test like this: [[name, url, <selector>, <timeout>], [...],...]
 * Variables in '<>' are optional and defaulted
 *
 * @type {string[]}
 */
const sitemap = [
  siteMapEntry('/')
];

describe('visual-sitemap', () => {
  let page;
  let target;

  beforeAll(async () => {
    await differencify.launchBrowser({
      executablePath: 'google-chrome-unstable',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  });

  afterAll(async () => {
    await differencify.cleanup();
  });

  test.each(sitemap)(
    '%s',
    async (name, url, selector, waitms, userOptions) => {
      target = differencify.init({ chain: false });
      page = await target.newPage();
      console.log("Page created");
      await page.setViewport({ width: 1600, height: 1200 });
      console.log("Viewport ok");
      await page.goto(site + '/' + url, {
        waitUntil: 'load',
      });
      console.log("Url loaded");
      if (selector) {
        console.log("Wait for selector");
        await page.waitFor(selector, { timeout: 2000 });
      }
      console.log("Wait %o", waitms);
      await page.waitFor(waitms);
      console.log("Screenshot");
      const image = await page.screenshot();
      await page.close();
      console.log("Compare");
      const result = await target.toMatchSnapshot(image);
      expect(result).toEqual(true);
    },
    30000
  );
});