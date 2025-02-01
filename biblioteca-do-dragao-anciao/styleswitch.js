document.addEventListener("DOMContentLoaded", function () {
    const styleSwitchButton = document.getElementById("styleSwitch");
    const root = document.documentElement;
    const menuImage = document.querySelector(".menu-lateral img");

    // Tente obter a preferência do usuário do armazenamento local
    const userThemePreference = localStorage.getItem("themePreference");

    // Se não houver preferência no armazenamento local, obtenha a preferência do sistema
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Configure o tema com base na preferência do usuário ou do sistema
    if (userThemePreference) {
        setTheme(userThemePreference);
    } else if (prefersDarkScheme) {
        setTheme("dark");
    } else {
        setTheme("light");
    }

    styleSwitchButton.addEventListener("click", function () {
        const currentTheme = root.style.getPropertyValue('--background-color') === '#eee' ? 'light' : 'dark';

        // Alternar entre os temas
        if (currentTheme === 'light') {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    });

    function setTheme(theme) {
        if (theme === "dark") {
            root.style.setProperty('--background-color', '#333');
            root.style.setProperty('--text-color', '#eee');
            root.style.setProperty('--bar-color', '#00141a');
            styleSwitchButton.classList.remove("fa-sun");
            styleSwitchButton.classList.add("fa-moon");
            menuImage.src = "img/favicon-branco.svg";
        } else {
            root.style.setProperty('--background-color', '#eee');
            root.style.setProperty('--text-color', '#111');
            root.style.setProperty('--bar-color', '#007ba0');
            styleSwitchButton.classList.remove("fa-moon");
            styleSwitchButton.classList.add("fa-sun");
            menuImage.src = "img/favicon-preto.svg";
        }

        // Salve a preferência do usuário no armazenamento local
        localStorage.setItem("themePreference", theme);
    }
});
