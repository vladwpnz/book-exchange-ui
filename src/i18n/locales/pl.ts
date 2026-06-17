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
  appSidebar: {
    eyebrow: 'Obszar pracy',
    heading: 'Półka wymiany',
    description: 'Katalog, rezerwacje, przekazania, zwroty i operacje.',
    navigationLabel: 'Sekcje aplikacji',
    navigation: {
      myBooks: {
        label: 'Moje książki',
        hint: 'Własna półka',
      },
      held: {
        label: 'Wypożyczone',
        hint: 'Pożyczona półka',
      },
      add: {
        label: 'Dodaj',
        hint: 'Najpierw katalog',
      },
      share: {
        label: 'Udostępnij',
        hint: 'Współpraca',
      },
      give: {
        label: 'Przekaż',
        hint: 'Stałe przekazanie',
      },
      return: {
        label: 'Zwróć',
        hint: 'Zamknij rezerwację',
      },
    },
    account: {
      sectionLabel: 'Ustawienia konta',
      navigationLabel: 'Linki konta',
      signedInAs: 'Zalogowano jako',
      account: 'Konto',
      accountHint: 'Ustawienia profilu',
      admin: 'Admin',
      adminHint: 'Operacje',
      language: 'Język',
      logout: 'Wyloguj',
      logoutLabel: 'Wyloguj i wróć na stronę główną',
    },
  },
} as const

const localizedPl = {
  ...pl,
  common: {
    appName: 'Book Exchange',
    actions: {
      addBook: 'Dodaj książkę',
      addManually: 'Dodaj ręcznie',
      backToHome: 'Wróć do strony głównej',
      browseAll: 'Przeglądaj wszystko',
      checkOwnedShelf: 'Sprawdź własną półkę',
      closeNotification: 'Zamknij powiadomienie',
      confirmReturn: 'Potwierdź zwrot',
      continue: 'Kontynuuj',
      createAccount: 'Utwórz konto',
      filtered: 'Filtrowane',
      give: 'Przekaż',
      giveBook: 'Przekaż książkę',
      login: 'Zaloguj',
      openHeldBooks: 'Otwórz wypożyczone',
      openMyBooks: 'Otwórz moje książki',
      openReturnFlow: 'Otwórz zwrot',
      openShare: 'Otwórz udostępnianie',
      openWorkflow: 'Otwórz',
      previewShareFlow: 'Podgląd udostępniania',
      returnBook: 'Zwróć książkę',
      returnThisTitle: 'Zwróć ten tytuł',
      saveProfile: 'Zapisz profil',
      saving: 'Zapisywanie...',
      searchCatalog: 'Szukaj w katalogu',
      share: 'Udostępnij',
      shareBook: 'Udostępnij książkę',
      showMore: 'Pokaż więcej',
      tryAgain: 'Spróbuj ponownie',
      viewInApp: 'Otwórz w aplikacji',
      viewMyBooks: 'Zobacz moje książki',
    },
    status: {
      active: 'Aktywne',
      available: 'Dostępna',
      borrowed: 'Wypożyczona',
      error: 'Błąd',
      held: 'Wypożyczona',
      info: 'Informacja',
      pending: 'Oczekuje',
      shared: 'Udostępniona',
      success: 'Sukces',
      warning: 'Uwaga',
      withOwner: 'U właściciela',
    },
    bookMeta: {
      action: 'Działanie',
      author: 'Autor',
      book: 'Książka',
      genre: 'Gatunek',
      holderId: 'ID posiadacza',
      id: 'ID',
      owner: 'Właściciel',
      ownerId: 'ID właściciela',
      role: 'Rola',
      status: 'Status',
      title: 'Tytuł',
    },
    placeholders: {
      authorName: 'Imię autora',
      bookTitle: 'Tytuł książki',
      effectiveJava: 'Effective Java',
      giveTestBook: 'Give Test Book',
      password: 'Hasło',
      readerEmail: 'reader@example.com',
      readerName: 'Imię czytelnika',
      yourName: 'Twoje imię',
    },
    values: {
      dash: '-',
    },
  },
  navbar: {
    home: 'Start',
    openApp: 'Otwórz aplikację',
    login: 'Zaloguj',
    register: 'Rejestracja',
    admin: 'Admin',
    account: 'Konto',
    logout: 'Wyloguj',
    readerNetwork: 'Wymiana książek',
    exchangeWorkspace: 'Moja biblioteka',
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
    triggerLabel: 'Zmień język. Obecny język: {{language}}',
    optionLabel: 'Przełącz język na {{language}}',
    selectedLabel: 'Wybrany język',
  },
  authShell: {
    backHomeLabel: 'Wróć do strony głównej Book Exchange',
    readerAccess: 'Dostęp czytelnika',
    exchangeDesk: 'Biurko wymiany',
    editorialTitle:
      'Zaloguj się, aby zarządzać książkami, rezerwacjami i przekazaniami.',
    editorialFooter:
      'Jedno logowanie łączy półki, rezerwacje i wymiany z kontem czytelnika.',
    covers: {
      ownedShelf: 'Własna półka',
      sharedCopy: 'Udostępniony egzemplarz',
      catalog: 'Katalog',
      exchange: 'Wymiana',
      reader: 'Czytelnik',
    },
  },
  appSidebar: {
    eyebrow: 'Przestrzeń pracy',
    heading: 'Półka wymiany',
    description: 'Katalog, rezerwacje, przekazania, zwroty i operacje.',
    navigationLabel: 'Sekcje aplikacji',
    navigation: {
      myBooks: {
        label: 'Moje książki',
        hint: 'Własna półka',
      },
      held: {
        label: 'Wypożyczone',
        hint: 'Półka pożyczona',
      },
      add: {
        label: 'Dodaj',
        hint: 'Najpierw katalog',
      },
      share: {
        label: 'Udostępnij',
        hint: 'Współpraca',
      },
      give: {
        label: 'Przekaż',
        hint: 'Przekazanie finalne',
      },
      return: {
        label: 'Zwróć',
        hint: 'Zamknij rezerwację',
      },
    },
    settings: {
      heading: 'Ustawienia',
      label: 'Ustawienia',
      hint: 'Język i sesja',
      navigationLabel: 'Ustawienia',
      account: {
        label: 'Konto',
        hint: 'Ustawienia profilu',
      },
    },
  },
  settings: {
    header: {
      eyebrow: 'Ustawienia',
      title: 'Ustawienia',
      description:
        'Zmieniaj język, otwieraj narzędzia admina i zarządzaj bieżącą sesją.',
    },
    signedInAs: {
      label: 'Zalogowano jako',
    },
    admin: {
      title: 'Admin',
      subtitle: 'Operacje',
      description: 'Otwórz narzędzia odzyskiwania operacyjnego katalogu.',
      open: 'Otwórz panel admina',
    },
    language: {
      title: 'Język',
      description: 'Zmień język interfejsu od razu, bez przeładowania.',
    },
    logout: {
      title: 'Wyloguj',
      description: 'Zakończ sesję i wróć na stronę główną.',
      action: 'Wyloguj',
    },
    loadingProfile: 'Ładowanie uprawnień konta.',
    errors: {
      loadProfile: 'Nie udało się wczytać uprawnień konta. Spróbuj ponownie.',
      profileStatusTitle: 'Nie udało się wczytać uprawnień konta',
    },
    toasts: {
      profileLoadError: {
        title: 'Nie udało się wczytać uprawnień konta',
      },
    },
  },
  landing: {
    hero: {
      eyebrow: 'Wymieniaj się książkami z innymi osobami',
      title: 'Book Exchange',
      description:
        'Dodawaj swoje książki, udostępniaj je, przekazuj innym użytkownikom i śledź zwroty.',
      openShelf: 'Otwórz moje książki',
      addBook: 'Dodaj książkę',
      stats: {
        catalog: {
          label: 'Wyszukiwanie w katalogu',
          value: 'Najpierw znajdź książkę, a potem ją dodaj.',
        },
        flows: {
          label: 'Proste działania',
          value: 'Udostępnij, przekaż albo zwróć książkę.',
        },
        admin: {
          label: 'Narzędzia admina',
          value: 'Kontrola książek i aktywnych wymian.',
        },
      },
    },
    preview: {
      ariaLabel: 'Podgląd katalogu Book Exchange',
      eyebrow: 'Przykład biblioteki',
      title: 'Wszystkie książki w jednym miejscu',
      badge: 'Podgląd',
      requestTitle: 'Prośba o udostępnienie',
      requestDescription:
        'Książka „Maps of Quiet Cities” jest u innego użytkownika do niedzieli.',
    },
    story: {
      eyebrow: 'Wymiana w ruchu',
      title: 'Książka pamięta swoją drogę.',
      description:
        'Śledź jeden fizyczny egzemplarz: od katalogu przez tymczasowe udostępnienie, stałe przekazanie i zwrot.',
      visualLabel: 'Wizualizacja wymiany proceduralnej książki',
      stagesLabel: 'Etapy historii przewijania',
      assistiveListLabel: 'Etapy historii Book Exchange',
      progressLabel: 'Aktualny etap',
      fallbackTitle: 'Historia wymiany pozostaje czytelna.',
      fallbackDescription:
        'Statyczna wersja zachowuje te same cztery ruchy książki, gdy animacja jest niedostępna.',
      fallbackReasons: {
        reducedMotion:
          'Redukcja ruchu jest włączona, więc historia jest pokazana statycznie.',
        webgl:
          'WebGL jest niedostępny w tej przeglądarce, więc pokazano statyczną scenę książki.',
        weakDevice:
          'Dla stabilności to urządzenie używa lżejszej statycznej historii.',
        loading: 'Ładowanie proceduralnej sceny książki.',
        error:
          'Nie udało się wczytać animowanej sceny, więc pokazano statyczną historię.',
        notMounted: 'Animowana scena wczyta się, gdy sekcja wejdzie w obszar widoku.',
      },
      stages: {
        add: {
          title: 'Dodaj',
          description:
            'Książka podnosi się z katalogu i otwiera, gdy właściciel dodaje egzemplarz na półkę.',
        },
        share: {
          title: 'Udostępnij',
          description:
            'Tymczasowa kopia przesuwa się do innego czytelnika, a oryginalny zapis zostaje u właściciela.',
        },
        give: {
          title: 'Przekaż',
          description:
            'Fizyczna książka trafia do właściciela B, gdy wymiana staje się stała.',
        },
        return: {
          title: 'Zwróć',
          description:
            'Książka wraca do właściciela A, zamyka się, a wymiana zostaje rozwiązana.',
        },
      },
    },
    workflow: {
      eyebrow: 'Jak to działa',
      title: 'Wszystkie działania z książkami w jednym miejscu.',
      description:
        'Dodawaj książki, udostępniaj je, przekazuj innym użytkownikom i oznaczaj zwroty.',
      items: {
        add: {
          title: 'Znajdź lub dodaj książkę',
          description:
            'Znajdź książkę w katalogu albo dodaj ją ręcznie.',
        },
        share: {
          title: 'Udostępnij książkę',
          description:
            'Daj książkę innemu użytkownikowi na jakiś czas.',
        },
        give: {
          title: 'Przekaż książkę',
          description:
            'Przekaż książkę innemu użytkownikowi na stałe.',
        },
        return: {
          title: 'Zwróć książkę',
          description:
            'Zamknij wymianę, gdy książka wróciła do właściciela.',
        },
      },
    },
    catalog: {
      eyebrow: 'Katalog',
      title: 'Ważne informacje widać od razu.',
      description:
        'Karta książki pokazuje tytuł, autora, właściciela i aktualny status.',
      benefits: {
        cards:
          'Karty książek z tytułem, autorem, właścicielem, statusem i notatkami.',
        flows:
          'Oddzielne procesy udostępniania, przekazania, zwrotu i odzyskiwania admina.',
        shell:
          'Zwarta powłoka aplikacji dla telefonu, tabletu i desktopu.',
      },
      contextLabel: 'Katalog',
    },
    featuredBooks: {
      'bk-aurora': {
        genre: 'Literatura piękna',
        note: 'Można udostępnić w tym tygodniu',
      },
      'bk-map': {
        genre: 'Podróże',
        note: 'U innego użytkownika do niedzieli',
      },
      'bk-craft': {
        genre: 'Technologie',
        note: 'Przekazana innemu użytkownikowi',
      },
    },
    footer: {
      description:
        'Wygodna usługa do wymiany książek między użytkownikami.',
      serviceRepo: 'Repozytorium',
      qualityChecks: 'Kontrole',
    },
  },
  login: {
    title: 'Zaloguj',
    description:
      'Użyj emaila i hasła, aby przejść do przestrzeni wymiany.',
    email: 'Email',
    password: 'Hasło',
    errorTitle: 'Nie udało się zalogować',
    signingIn: 'Logowanie...',
    newHere: 'Jesteś tu pierwszy raz?',
  },
  register: {
    title: 'Utwórz konto',
    description:
      'Utwórz konto czytelnika, aby katalogować i wymieniać książki.',
    name: 'Imię',
    email: 'Email',
    password: 'Hasło',
    errorTitle: 'Nie udało się utworzyć konta',
    creating: 'Tworzenie konta...',
    alreadyRegistered: 'Masz już konto?',
    success: 'Konto utworzone. Możesz się teraz zalogować.',
    fallbackError: 'Nie udało się utworzyć konta. Spróbuj ponownie.',
  },
  dashboard: {
    actionsLabel: 'Procesy książek',
    cards: {
      add: {
        title: 'Dodaj książkę',
        description: 'Najpierw szukaj w katalogu albo dodaj brakujący tytuł ręcznie.',
      },
      share: {
        title: 'Udostępnij książkę',
        description: 'Wyślij własną książkę innemu czytelnikowi przez email.',
      },
      give: {
        title: 'Przekaż książkę',
        description: 'Przenieś własność, gdy egzemplarz ma zostać przekazany na stałe.',
      },
      return: {
        title: 'Zwróć książkę',
        description: 'Zamknij aktywną rezerwację i oddaj książkę właścicielowi.',
      },
    },
  },
  myBooks: {
    header: {
      eyebrow: 'Moje biurko biblioteczne',
      title: 'Moje książki',
      description:
        'Twoja własna półka jest centrum pracy dla udostępniania, przekazywania i katalogu.',
      ownedBooks: '{{count}} moich książek',
      ownedBooksLabel: 'moich książek',
    },
    metrics: {
      total: 'Cała półka',
      available: 'Dostępne',
      inMotion: 'W ruchu',
    },
    loading: 'Ładowanie moich książek',
    error: {
      fallback: 'Nie udało się wczytać twoich książek. Spróbuj ponownie.',
      toastTitle: 'Nie udało się wczytać twoich książek',
      eyebrow: 'Książki niedostępne',
      title: 'Nie udało się wczytać książek',
    },
    empty: {
      eyebrow: 'Pusta półka',
      title: 'Dodaj pierwszy egzemplarz do wymiany',
      description:
        'Zacznij od wyszukania w katalogu, aby książka otrzymała najbogatsze dostępne dane.',
    },
    catalog: {
      eyebrow: 'Własny katalog',
      title: 'Aktualna półka',
      contextLabel: 'Własny egzemplarz',
      loaded: 'Moje książki wczytane.',
    },
  },
  heldBooks: {
    header: {
      eyebrow: 'Pożyczona półka',
      title: 'Wypożyczone książki',
      description:
        'Śledź książki, które są teraz u ciebie, i zamykaj rezerwację, gdy egzemplarz wraca do właściciela.',
      heldBooks: '{{count}} wypożyczonych książek',
      heldBooksLabel: 'wypożyczonych książek',
    },
    loading: 'Ładowanie wypożyczonych książek',
    error: {
      fallback: 'Nie udało się wczytać wypożyczonych książek. Spróbuj ponownie.',
      toastTitle: 'Nie udało się wczytać wypożyczonych książek',
      eyebrow: 'Wypożyczone książki niedostępne',
      title: 'Nie udało się wczytać wypożyczonych książek',
    },
    empty: {
      eyebrow: 'Brak aktywnych rezerwacji',
      title: 'Twoja pożyczona półka jest pusta',
      description:
        'Książki udostępnione lub przekazane na twoje konto pojawią się tutaj z właścicielem i statusem.',
    },
    catalog: {
      eyebrow: 'Pożyczony katalog',
      title: 'Aktywne rezerwacje',
      contextLabel: 'Pożyczony egzemplarz',
      loaded: 'Wypożyczone książki wczytane.',
    },
    aside: {
      eyebrow: 'Rytm zwrotów',
      title: 'Zamykaj rezerwacje terminowo',
      description:
        'Użyj procesu zwrotu, gdy pożyczony egzemplarz wraca do właściciela. Zwrot jest sprawdzany względem pożyczonej półki.',
    },
  },
  addBook: {
    errors: {
      fallback: 'Nie udało się dodać tej książki. Spróbuj ponownie.',
      required: 'Tytuł i autor są wymagani.',
    },
    toasts: {
      achievement: {
        title: 'Osiągnięcie odblokowane',
        message: 'Pierwsza książka dodana',
      },
      searchError: 'Nie udało się przeszukać katalogu',
      detailsNeeded: 'Dodaj tytuł i autora',
      added: 'Książka dodana',
      addError: 'Nie udało się dodać książki',
      catalogAddError: 'Nie udało się dodać książki z katalogu',
    },
    messages: {
      addedToShelf: '{{title}} — {{author}} jest teraz na twojej półce.',
      catalogAddedToShelf: '{{title}} — {{author}} jest na twojej półce.',
    },
    header: {
      eyebrow: 'Wpis katalogu',
      title: 'Dodaj książkę',
      description:
        'Najpierw przeszukaj wspólny katalog. Ręczne dodawanie pozostaje dostępne, gdy tytułu brakuje w indeksie.',
    },
    catalog: {
      eyebrow: 'Główna ścieżka',
      title: 'Szukaj w katalogu wymiany',
      description:
        'Wyniki aktualizują się po krótkiej pauzie podczas pisania. Dodawaj stąd, aby zachować metadane katalogu.',
      behaviorTitle: 'Zachowanie katalogu',
      behaviorDescription:
        'Wyszukiwanie czeka chwilę podczas pisania. Użyj "Pokaż więcej", aby przeglądać resztę katalogu.',
      searchLabel: 'Szukaj według tytułu lub autora',
      help: 'Wpisz co najmniej dwa znaki, aby filtrować katalog.',
      addedTitle: 'Książka z katalogu dodana',
      loading: 'Ładowanie książek katalogu.',
      noMatchesTitle: 'Brak dopasowań',
      noMatchesDescription:
        'Żadne książki z katalogu nie pasują do tego wyszukiwania. Ręczne dodawanie jest dostępne niżej.',
      resultsTitle: 'Książki katalogu',
      matchingTitle: 'Pasujące książki katalogu',
      showing: 'Pokazano {{shown}} z {{total}}',
      isbn: 'ISBN {{isbn}}',
      alreadyOwned: 'Już w moich książkach',
      adding: 'Dodawanie...',
      addToMine: 'Dodaj do moich książek',
    },
    manual: {
      eyebrow: 'Ścieżka awaryjna',
      title: 'Dodaj ręcznie',
      description:
        'Nie możesz znaleźć książki? Dodaj prawdziwy tytuł, którego brakuje we wspólnym katalogu.',
      successTitle: 'Książka dodana pomyślnie',
    },
  },
  shareBook: {
    steps: {
      name: {
        title: 'Nazwij własny egzemplarz',
        description: 'Użyj tytułu dokładnie tak, jak widnieje na półce.',
      },
      reader: {
        title: 'Wybierz czytelnika',
        description: 'Wpisz email odbiorcy, aby wymiana utworzyła rezerwację.',
      },
      collaborative: {
        title: 'Zachowaj współdzielenie',
        description: 'Książka pozostaje częścią wymiany, gdy jest udostępniona.',
      },
    },
    errors: {
      fallback: 'Nie udało się udostępnić tej książki. Spróbuj ponownie.',
      required: 'Tytuł i email odbiorcy są wymagane.',
    },
    toasts: {
      detailsNeeded: 'Potrzebne szczegóły udostępnienia',
      shared: 'Książka udostępniona',
      shareError: 'Nie udało się udostępnić książki',
    },
    messages: {
      sharedWith: '{{title}} udostępniono użytkownikowi {{username}}.',
      lastShared: 'Ostatnio udostępniono: {{title}} dla {{username}}.',
    },
    header: {
      eyebrow: 'Proces udostępniania',
      title: 'Udostępnij książkę',
      description:
        'Utwórz współdzielone przekazanie, łącząc własny tytuł z kontem innego czytelnika.',
    },
    form: {
      eyebrow: 'Wspólna wymiana',
      title: 'Wyślij czytelny egzemplarz',
      description:
        'Udostępnianie jest stanem tymczasowym, a nie finalnym przekazaniem własności.',
      note: 'Email odbiorcy łączy to działanie z realnym kontem.',
      bookTitle: 'Tytuł książki',
      targetEmail: 'Email odbiorcy',
      successTitle: 'Książka udostępniona pomyślnie',
      submitting: 'Udostępnianie...',
    },
    aside: {
      eyebrow: 'Proces',
      title: 'Jak działa udostępnianie',
    },
  },
  giveBook: {
    steps: {
      verify: {
        title: 'Sprawdź tytuł',
        description: 'Użyj dokładnego tytułu, który ma opuścić twoją półkę.',
      },
      recipient: {
        title: 'Potwierdź odbiorcę',
        description:
          'Docelowy email otrzyma własność po potwierdzeniu przekazania.',
      },
      submit: {
        title: 'Wyślij finalne przekazanie',
        description: 'To celowo poważniejsze niż wspólna rezerwacja.',
      },
    },
    errors: {
      fallback: 'Nie udało się przekazać tej książki. Spróbuj ponownie.',
      required: 'Tytuł i email odbiorcy są wymagane.',
    },
    toasts: {
      detailsNeeded: 'Potrzebne szczegóły przekazania',
      given: 'Książka przekazana',
      giveError: 'Nie udało się przekazać książki',
    },
    messages: {
      givenTo: '{{title}} przekazano użytkownikowi {{username}}.',
      lastGiven: 'Ostatnio przekazano: {{title}} dla {{username}}.',
    },
    header: {
      eyebrow: 'Przekazanie własności',
      title: 'Przekaż książkę',
      description:
        'Przenieś egzemplarz z własnej półki do innego czytelnika jako finalne przekazanie.',
    },
    form: {
      eyebrow: 'Finalne przekazanie',
      title: 'Potwierdź zmianę właściciela',
      description: 'Przekazanie zmienia właściciela po potwierdzeniu.',
      warningTitle: 'Własność się zmieni',
      warning: 'Sprawdź tytuł i email odbiorcy przed wysłaniem przekazania.',
      bookTitle: 'Tytuł książki',
      targetEmail: 'Email odbiorcy',
      successTitle: 'Książka przekazana pomyślnie',
      submitting: 'Przekazywanie...',
    },
    aside: {
      eyebrow: 'Kontrole przekazania',
      title: 'Zanim przekażesz',
    },
  },
  returnBook: {
    steps: {
      choose: {
        title: 'Wybierz z wypożyczonych',
        description: 'Wybierz jedną pożyczoną książkę z obecnej półki.',
      },
      review: {
        title: 'Sprawdź egzemplarz',
        description: 'Sprawdź tytuł i autora przed zamknięciem rezerwacji.',
      },
      confirm: {
        title: 'Potwierdź zwrot',
        description: 'Potwierdź, że książka wróciła do właściciela.',
      },
    },
    errors: {
      fallback: 'Nie udało się zwrócić tej książki. Spróbuj ponownie.',
      choose: 'Wybierz pożyczoną książkę do zwrotu.',
      confirm: 'Potwierdź, że książka wróciła do właściciela.',
    },
    toasts: {
      loadError: 'Nie udało się wczytać wypożyczonych książek',
      chooseBook: 'Wybierz książkę',
      confirmReturn: 'Potwierdź zwrot',
      returned: 'Książka zwrócona',
      returnError: 'Nie udało się zwrócić książki',
    },
    messages: {
      returnedToOwner: '{{title}} — {{author}} wróciła do właściciela.',
      selected: '{{title}} — {{author}} zostanie zwrócona właścicielowi.',
      lastReturned: 'Ostatni zwrot: {{title}} — {{author}}.',
    },
    header: {
      eyebrow: 'Proces zwrotu',
      title: 'Zwróć książkę',
      description:
        'Zamknij aktywną rezerwację, gdy pożyczony egzemplarz wraca do właściciela.',
    },
    form: {
      eyebrow: 'Zamknij rezerwację',
      title: 'Wybierz pożyczoną książkę',
      description:
        'Wybierz książkę z pożyczonej półki, sprawdź szczegóły i potwierdź zwrot.',
      loading: 'Ładowanie pożyczonych książek',
      noBooksTitle: 'Brak pożyczonych książek',
      noBooksDescription:
        'Twoja pożyczona półka jest pusta. Nie ma teraz nic do zwrotu.',
      chooseLegend: 'Wybierz pożyczoną książkę',
      ownerLine: 'Właściciel: {{owner}}',
      selectedTitle: 'Wybrany zwrot',
      confirmLabel:
        'Potwierdzam, że książka wróciła do właściciela i rezerwację można zamknąć.',
      submitting: 'Zwracanie...',
    },
    aside: {
      eyebrow: 'Zamknięcie rezerwacji',
      title: 'Sekwencja zwrotu',
    },
  },
  profile: {
    header: {
      eyebrow: 'Konto',
      title: 'Profil',
      description:
        'Zarządzaj tożsamością czytelnika używaną w książkach, rezerwacjach i działaniach wymiany.',
    },
    errors: {
      loadFallback: 'Nie udało się wczytać profilu. Spróbuj ponownie.',
      updateFallback: 'Nie udało się zaktualizować profilu. Spróbuj ponownie.',
      emptyName: 'Imię nie może być puste.',
      unavailable: 'Profil niedostępny',
      loadTitle: 'Nie udało się wczytać profilu',
      saveTitle: 'Nie udało się zapisać profilu',
      nameRequired: 'Imię jest wymagane',
    },
    toasts: {
      savedTitle: 'Profil zapisany',
      savedMessage: 'Imię czytelnika zostało zaktualizowane.',
    },
    loading: 'Ładowanie profilu.',
    details: {
      signedInReader: 'Zalogowany czytelnik',
      avatarAlt: 'Awatar {{name}}',
      ownedBooks: 'Moje książki',
      heldBooks: 'Wypożyczone książki',
      achievements: 'Osiągnięcia',
      editIdentity: 'Edytuj tożsamość',
      readerName: 'Imię czytelnika',
      nameAppears: 'To imię pojawia się w powierzchniach konta.',
      name: 'Imię',
      saving: 'Zapisywanie...',
      savedMessage: 'Profil zaktualizowany pomyślnie.',
    },
    achievements: {
      profileReady: 'Profil gotowy',
      firstBookAdded: 'Pierwsza książka dodana',
      addFirstBook: 'Dodaj pierwszą książkę',
      exchangeReady: 'Wymiana gotowa',
    },
  },
  admin: {
    status: {
      withOwner: 'U właściciela',
      borrowed: 'Wypożyczona',
    },
    errors: {
      loadFallback: 'Nie udało się wczytać książek admina. Spróbuj ponownie.',
      forceFallback: 'Nie udało się wymusić zwrotu tej książki. Spróbuj ponownie.',
      loadTitle: 'Nie udało się wczytać książek admina',
      actionTitle: 'Nie udało się wymusić zwrotu książki',
    },
    toasts: {
      noActionTitle: 'Działanie nie jest potrzebne',
      forceCompleteTitle: 'Wymuszony zwrot zakończony',
    },
    messages: {
      alreadyWithOwner: '{{title}} jest już u właściciela.',
      returnedToOwner: '{{title}} wróciła do właściciela.',
      forceReturnLabel: 'Wymuś zwrot {{title}}',
    },
    header: {
      eyebrow: 'Operacje admina',
      title: 'Panel admina',
      description:
        'Monitoruj inwentarz i wymuszaj zwrot wypożyczonych egzemplarzy do właścicieli, gdy potrzebne jest odzyskiwanie operacyjne.',
    },
    metrics: {
      totalBooks: 'Łącznie książek',
      inventoryReady: 'Inwentarz gotowy',
      borrowed: 'Wypożyczone',
      onLoan: 'Na wypożyczeniu',
      withOwner: 'U właściciela',
      atHome: 'Na miejscu',
    },
    loading: 'Ładowanie książek admina.',
    empty: {
      eyebrow: 'Pusty katalog',
      title: 'Nie znaleziono książek',
      description: 'Książki pojawią się tutaj, gdy katalog wymiany będzie miał pozycje.',
    },
    table: {
      eyebrow: 'Inwentarz',
      title: 'Tabela operacji książek',
      caption:
        'Inwentarz książek admina z właścicielem, posiadaczem, statusem i działaniami wymuszonego zwrotu.',
      noAction: 'Działanie nie jest potrzebne',
      forceReturn: 'Wymuś zwrot',
      returning: 'Zwracanie...',
    },
    unavailable: 'Książki admina niedostępne',
  },
  components: {
    stateMessage: {
      labels: {
        success: 'Sukces',
        warning: 'Uwaga',
        error: 'Błąd',
        info: 'Informacja',
      },
    },
    bookCard: {
      context: {
        owner: 'Właściciel',
        genre: 'Gatunek',
      },
    },
    dashboardCard: {
      openWorkflow: 'Otwórz',
    },
    bookCover: {
      fallbackInitials: 'BE',
    },
  },
  api: {
    auth: {
      invalidCredentials: 'Email lub hasło jest nieprawidłowe. Spróbuj ponownie.',
      backendUnavailable:
        'Usługa książek jest teraz niedostępna. Spróbuj ponownie za chwilę.',
      unknown: 'Nie udało się zalogować. Spróbuj ponownie.',
    },
    profile: {
      missingCredentials: 'Brakuje zapisanych danych logowania. Zaloguj się ponownie.',
      requiredName: 'Imię profilu jest wymagane.',
      readField: 'Nie udało się odczytać pola profilu {{field}}. Spróbuj ponownie.',
      avatar: 'Nie udało się odczytać awatara profilu. Spróbuj ponownie.',
      details: 'Nie udało się wczytać szczegółów profilu. Spróbuj ponownie.',
    },
    register: {
      success: 'Rejestracja udana, twój email jest teraz twoją nazwą użytkownika',
      generic:
        'Nie udało się utworzyć konta. Sprawdź dane i spróbuj ponownie.',
      backendUnavailable:
        'Usługa książek jest teraz niedostępna. Spróbuj ponownie za chwilę.',
    },
    books: {
      missingCredentials: 'Brakuje zapisanych danych logowania. Zaloguj się ponownie.',
      addedBookUnread: 'Nie udało się odczytać dodanej książki. Spróbuj ponownie.',
      signInAgainAction: 'Zaloguj się ponownie, aby kontynuować: {{action}}.',
      actionIncomplete: '{{action}} nie mogło zostać ukończone. Spróbuj ponownie.',
      loadResponse: 'Nie udało się wczytać {{name}}. Spróbuj ponownie.',
      loadAdminBooks: 'Nie udało się wczytać książek admina. Spróbuj ponownie.',
      readAdminBook:
        'Nie udało się odczytać książki admina {{index}}. Odśwież stronę i spróbuj ponownie.',
      untitled: 'Książka bez tytułu',
      unknownAuthor: 'Nieznany autor',
      general: 'Ogólne',
      noDescription: 'Opis nie został jeszcze dodany',
      readAdminField:
        'Nie udało się odczytać {{field}} dla książki admina {{index}}. Odśwież stronę i spróbuj ponownie.',
      signInAgain: 'Zaloguj się ponownie, aby kontynuować.',
      adminRequired:
        'Do tego działania wymagany jest dostęp administratora. Zaloguj się na konto administratora.',
      chooseForceReturn: 'Wybierz książkę przed wymuszeniem zwrotu.',
      forceReturnConfirm:
        'Nie udało się potwierdzić wymuszonego zwrotu. Odśwież stronę i spróbuj ponownie.',
    },
    catalog: {
      duplicate: 'Ta książka z katalogu została już dodana',
      readField: 'Nie udało się odczytać {{field}} dla {{name}}. Spróbuj ponownie.',
      load: 'Nie udało się wczytać książek katalogu. Spróbuj ponownie.',
      readBook:
        'Nie udało się odczytać książki katalogu {{index}}. Odśwież stronę i spróbuj ponownie.',
      general: 'Ogólne',
      noDescription: 'Opis nie został dodany.',
      readAdded: 'Nie udało się odczytać dodanej książki z katalogu. Spróbuj ponownie.',
      idRequired: 'ID książki katalogu jest wymagane.',
      addFallback: 'Nie udało się dodać tej książki z katalogu. Spróbuj ponownie.',
    },
  },
} as const

export default localizedPl
