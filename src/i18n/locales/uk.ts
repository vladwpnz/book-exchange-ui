const uk = {
  navbar: {
    home: 'Головна',
    openApp: 'Відкрити застосунок',
    login: 'Увійти',
    register: 'Реєстрація',
    admin: 'Адмін',
    account: 'Обліковий запис',
    logout: 'Вийти',
    readerNetwork: 'Мережа читачів',
    exchangeWorkspace: 'Простір обміну',
    bookExchangeHome: 'Головна Book Exchange',
    themeSwitchLabel: 'Змінити тему: {{theme}}',
    themeNames: {
      light: 'світла',
      dark: 'темна',
    },
  },
  languageSelector: {
    label: 'Мова',
    menuLabel: 'Виберіть мову',
    triggerLabel: 'Змінити мову. Поточна мова: {{language}}',
    optionLabel: 'Перемкнути мову на {{language}}',
    selectedLabel: 'Вибрана мова',
  },
} as const

export default uk
