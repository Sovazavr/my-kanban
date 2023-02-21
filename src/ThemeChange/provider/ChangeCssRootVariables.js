export function changeCssRootVariables(theme) {
    const root = document.querySelector(':root')

    const components = [
        'body-background',
        'components-background',
        'card-background',
        'card-shadow',
        'text-color',
        'body-background-img',
    ]

    components.forEach(component => {
        root.style.setProperty(`--${component}-default`,
            `var(--${component}-${theme})`)
    })
}