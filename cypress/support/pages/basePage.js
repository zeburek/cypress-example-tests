const BasePage = {
    fillField: (element, text) => {
        if (text !== undefined) {
            element.clear()
            if (text !== "") {
                element.type(text)
            }
        }
    }
}

export default BasePage