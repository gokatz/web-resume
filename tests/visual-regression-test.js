const Differencify = require('differencify');
const differencify = new Differencify({
  mismatchThreshold: 0.00001
});

(async () => {
  console.log('Starting test');
  const target = differencify.init({ testName: 'desktop', chain: false });
  await target.launch();
  const page = await target.newPage();
  await page.setViewport({ width: 1200, height: 600 });
  
  console.log('Opening profile page');
  await page.goto('http://localhost:1234');
  await page.waitFor(2000);
  
  console.log('Taking screenshots');
  const image = await page.screenshot({ fullPage: true });
  
  console.log('Comparing results');
  const result = await target.toMatchSnapshot(image)
  
  console.log('Terminating tests');
  await page.close();
  await target.close();
 
  if (result) {
    console.log('Test Passed'); 
  } else {
    console.log('Test failed'); 
    process.exit(1); 
  }
})();
