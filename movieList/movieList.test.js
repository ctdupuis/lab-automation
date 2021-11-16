const { Builder, Capabilities, By, Key } = require('selenium-webdriver');

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await (await driver).get('http://localhost:5500/movieList/index.html');
})

afterEach(async() => {
    await driver.sleep(2000)
})


afterAll(async () => {
    await (await driver).quit();
})

describe("Movie Page Manipulation", () => {
    
    const movieTitle = "Spider-Man";

    test("Add a movie to the page", async () => {
        const input = await driver.findElement(By.id('new-movie'));
        await input.sendKeys(movieTitle, Key.RETURN);
        const check = await driver.findElement(By.className("Spider-Man"));

        expect(check).toBeTruthy();
    })

    test("Delete a movie from the page", async () => {
        const button = await driver.findElement(By.id(movieTitle));
        await button.click();
        const lis = await driver.findElements(By.css('li'));
        expect(lis.length).toEqual(0);
    })

})
