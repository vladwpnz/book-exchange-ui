const pl = {
  navbar: {
    home: 'Start',
    openApp: 'Otwórz aplikację',
    login: 'Zaloguj',
    register: 'Rejestracja',
    admin: 'Admin',
    account: 'Konto',
    logout: 'Wyloguj',
    readerNetwork: 'Sieć czytelników',
    exchangeWorkspace: 'Przestrzeń wymiany',
    bookExchangeHome: 'Strona główna Book Exchange',
    themeSwitchLabel: 'Zmień motyw: {{theme}}',
    themeNames: {
      light: 'jasny',
      dark: 'ciemny',
    },
  },
  languageSelector: {
    label: 'Język',
    menuLabel: 'Wybierz język',
    triggerLabel: 'Zmień język. Aktualny język: {{language}}',
    optionLabel: 'Przełącz język na {{language}}',
    selectedLabel: 'Wybrany język',
  },
} as const

export default pl
