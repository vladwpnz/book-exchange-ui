const ru = {
  navbar: {
    home: 'Главная',
    openApp: 'Открыть приложение',
    login: 'Войти',
    register: 'Регистрация',
    admin: 'Админ',
    account: 'Аккаунт',
    logout: 'Выйти',
    readerNetwork: 'Сеть читателей',
    exchangeWorkspace: 'Рабочее пространство обмена',
    bookExchangeHome: 'Главная Book Exchange',
    themeSwitchLabel: 'Сменить тему: {{theme}}',
    themeNames: {
      light: 'светлая',
      dark: 'темная',
    },
  },
  languageSelector: {
    label: 'Язык',
    menuLabel: 'Выберите язык',
    triggerLabel: 'Сменить язык. Текущий язык: {{language}}',
    optionLabel: 'Переключить язык на {{language}}',
    selectedLabel: 'Выбранный язык',
  },
} as const

export default ru
