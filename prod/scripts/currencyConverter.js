export let currencyConverter = async () => {
    return await fetch("https://wise.com/rates/history+live?source=GBP&target=EUR&length=1")
}
