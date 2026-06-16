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
  appSidebar: {
    eyebrow: 'Рабочая область',
    heading: 'Полка обмена',
    description: 'Каталог, удержания, передачи, возвраты и операции.',
    navigationLabel: 'Разделы приложения',
    navigation: {
      myBooks: {
        label: 'Мои книги',
        hint: 'Моя полка',
      },
      held: {
        label: 'На руках',
        hint: 'Взятые книги',
      },
      add: {
        label: 'Добавить',
        hint: 'Сначала каталог',
      },
      share: {
        label: 'Поделиться',
        hint: 'Совместный доступ',
      },
      give: {
        label: 'Передать',
        hint: 'Окончательная передача',
      },
      return: {
        label: 'Вернуть',
        hint: 'Закрыть удержание',
      },
    },
    account: {
      sectionLabel: 'Управление аккаунтом',
      navigationLabel: 'Ссылки аккаунта',
      signedInAs: 'Выполнен вход как',
      account: 'Аккаунт',
      accountHint: 'Настройки профиля',
      admin: 'Админ',
      adminHint: 'Операции',
      language: 'Язык',
      logout: 'Выйти',
      logoutLabel: 'Выйти и вернуться на главную',
    },
  },
} as const

const localizedRu = {
  ...ru,
  common: {
    appName: 'Book Exchange',
    actions: {
      addBook: 'Добавить книгу',
      addManually: 'Добавить вручную',
      backToHome: 'На главную',
      browseAll: 'Все книги',
      checkOwnedShelf: 'Проверить мою полку',
      closeNotification: 'Закрыть уведомление',
      confirmReturn: 'Подтвердить возврат',
      continue: 'Продолжить',
      createAccount: 'Создать аккаунт',
      filtered: 'Фильтр',
      give: 'Передать',
      giveBook: 'Передать книгу',
      login: 'Войти',
      openHeldBooks: 'Открыть взятые книги',
      openMyBooks: 'Открыть мои книги',
      openReturnFlow: 'Открыть возврат',
      openShare: 'Открыть обмен',
      openWorkflow: 'Открыть',
      previewShareFlow: 'Предпросмотр обмена',
      returnBook: 'Вернуть книгу',
      returnThisTitle: 'Вернуть эту книгу',
      saveProfile: 'Сохранить профиль',
      saving: 'Сохранение...',
      searchCatalog: 'Искать в каталоге',
      share: 'Поделиться',
      shareBook: 'Поделиться книгой',
      showMore: 'Показать ещё',
      tryAgain: 'Повторить',
      viewInApp: 'Открыть в приложении',
      viewMyBooks: 'Смотреть мои книги',
    },
    status: {
      active: 'Активен',
      available: 'Доступна',
      borrowed: 'Взята',
      error: 'Ошибка',
      held: 'На руках',
      info: 'Уведомление',
      pending: 'Ожидает',
      shared: 'Передана',
      success: 'Успешно',
      warning: 'Внимание',
      withOwner: 'У владельца',
    },
    bookMeta: {
      action: 'Действие',
      author: 'Автор',
      book: 'Книга',
      genre: 'Жанр',
      holderId: 'ID держателя',
      id: 'ID',
      owner: 'Владелец',
      ownerId: 'ID владельца',
      role: 'Роль',
      status: 'Статус',
      title: 'Название',
    },
    placeholders: {
      authorName: 'Имя автора',
      bookTitle: 'Название книги',
      effectiveJava: 'Effective Java',
      giveTestBook: 'Give Test Book',
      password: 'Пароль',
      readerEmail: 'reader@example.com',
      readerName: 'Имя читателя',
      yourName: 'Ваше имя',
    },
    values: {
      dash: '-',
    },
  },
  navbar: {
    home: 'Главная',
    openApp: 'Открыть приложение',
    login: 'Войти',
    register: 'Регистрация',
    admin: 'Админ',
    account: 'Аккаунт',
    logout: 'Выйти',
    readerNetwork: 'Обмен книгами',
    exchangeWorkspace: 'Моя библиотека',
    bookExchangeHome: 'Главная Book Exchange',
    themeSwitchLabel: 'Сменить тему: {{theme}}',
    themeNames: {
      light: 'светлая',
      dark: 'тёмная',
    },
  },
  languageSelector: {
    label: 'Язык',
    menuLabel: 'Выберите язык',
    triggerLabel: 'Сменить язык. Текущий язык: {{language}}',
    optionLabel: 'Переключить язык на {{language}}',
    selectedLabel: 'Выбранный язык',
  },
  authShell: {
    backHomeLabel: 'Вернуться на главную Book Exchange',
    readerAccess: 'Доступ читателя',
    exchangeDesk: 'Стол обмена',
    editorialTitle: 'Войдите, чтобы управлять книгами, удержаниями и передачами.',
    editorialFooter:
      'Один вход связывает ваши полки, удержания и обмены с аккаунтом читателя.',
    covers: {
      ownedShelf: 'Моя полка',
      sharedCopy: 'Переданная книга',
      catalog: 'Каталог',
      exchange: 'Обмен',
      reader: 'Читатель',
    },
  },
  appSidebar: {
    eyebrow: 'Рабочая область',
    heading: 'Полка обмена',
    description: 'Каталог, удержания, передачи, возвраты и операции.',
    navigationLabel: 'Разделы приложения',
    navigation: {
      myBooks: {
        label: 'Мои книги',
        hint: 'Моя полка',
      },
      held: {
        label: 'На руках',
        hint: 'Взятые книги',
      },
      add: {
        label: 'Добавить',
        hint: 'Сначала каталог',
      },
      share: {
        label: 'Поделиться',
        hint: 'Совместно',
      },
      give: {
        label: 'Передать',
        hint: 'Финальная передача',
      },
      return: {
        label: 'Вернуть',
        hint: 'Закрыть удержание',
      },
    },
    settings: {
      heading: 'Настройки',
      label: 'Настройки',
      hint: 'Язык и сеанс',
      navigationLabel: 'Настройки',
      account: {
        label: 'Аккаунт',
        hint: 'Настройки профиля',
      },
    },
  },
  settings: {
    header: {
      eyebrow: 'Настройки',
      title: 'Настройки',
      description:
        'Здесь можно изменить язык, открыть админ-панель и выйти из аккаунта.',
    },
    signedInAs: {
      label: 'Вход выполнен как',
    },
    admin: {
      title: 'Админ',
      subtitle: 'Операции',
      description: 'Открыть инструменты операционного восстановления каталога.',
      open: 'Открыть админ-панель',
    },
    language: {
      title: 'Язык',
      description: 'Смените язык интерфейса сразу, без перезагрузки.',
    },
    logout: {
      title: 'Выйти',
      description: 'Завершить сеанс и вернуться на главную страницу.',
      action: 'Выйти',
    },
    loadingProfile: 'Загрузка прав аккаунта.',
    errors: {
      loadProfile: 'Не удалось загрузить права аккаунта. Попробуйте ещё раз.',
      profileStatusTitle: 'Не удалось загрузить права аккаунта',
    },
    toasts: {
      profileLoadError: {
        title: 'Не удалось загрузить права аккаунта',
      },
    },
  },
  landing: {
    hero: {
      eyebrow: 'Обменивайтесь книгами с другими людьми',
      title: 'Book Exchange',
      description:
        'Добавляйте свои книги, делитесь ими, передавайте другим пользователям и следите за возвратами.',
      openShelf: 'Открыть мои книги',
      addBook: 'Добавить книгу',
      stats: {
        catalog: {
          label: 'Поиск в каталоге',
          value: 'Сначала найдите книгу, а затем добавьте её.',
        },
        flows: {
          label: 'Понятные действия',
          value: 'Поделиться, передать или вернуть книгу.',
        },
        admin: {
          label: 'Инструменты администратора',
          value: 'Контроль книг и активных обменов.',
        },
      },
    },
    preview: {
      ariaLabel: 'Предпросмотр каталога Book Exchange',
      eyebrow: 'Пример библиотеки',
      title: 'Все книги в одном месте',
      badge: 'Предпросмотр',
      requestTitle: 'Запрос на обмен',
      requestDescription:
        'Книга «Maps of Quiet Cities» находится у другого пользователя до воскресенья.',
    },
    workflow: {
      eyebrow: 'Как это работает',
      title: 'Все действия с книгами — в одном месте.',
      description:
        'Добавляйте книги, делитесь ими, передавайте другим пользователям и отмечайте возвраты.',
      items: {
        add: {
          title: 'Найдите или добавьте книгу',
          description:
            'Найдите книгу в каталоге или добавьте её вручную.',
        },
        share: {
          title: 'Поделитесь книгой',
          description:
            'Дайте книгу другому пользователю на время.',
        },
        give: {
          title: 'Передайте книгу',
          description:
            'Передайте книгу другому пользователю навсегда.',
        },
        return: {
          title: 'Верните книгу',
          description:
            'Закройте обмен, когда книга вернулась владельцу.',
        },
      },
    },
    catalog: {
      eyebrow: 'Каталог',
      title: 'Вся важная информация сразу видна.',
      description:
        'В карточке книги отображаются название, автор, владелец и текущий статус.',
      benefits: {
        cards:
          'Карточки книг с названием, автором, владельцем, статусом и заметками.',
        flows:
          'Отдельные процессы для обмена, передачи, возврата и админ-восстановления.',
        shell:
          'Компактная оболочка приложения для телефона, планшета и desktop.',
      },
      contextLabel: 'Каталог',
    },
    featuredBooks: {
      'bk-aurora': {
        genre: 'Художественная литература',
        note: 'Можно поделиться на этой неделе',
      },
      'bk-map': {
        genre: 'Путешествия',
        note: 'У другого пользователя до воскресенья',
      },
      'bk-craft': {
        genre: 'Технологии',
        note: 'Передана другому пользователю',
      },
    },
    footer: {
      description:
        'Удобный сервис для обмена книгами между пользователями.',
      serviceRepo: 'Репозиторий',
      qualityChecks: 'Проверки',
    },
  },
  login: {
    title: 'Войти',
    description:
      'Используйте email и пароль, чтобы продолжить в рабочее пространство обмена.',
    email: 'Email',
    password: 'Пароль',
    errorTitle: 'Не удалось войти',
    signingIn: 'Вход...',
    newHere: 'Вы здесь впервые?',
  },
  register: {
    title: 'Создать аккаунт',
    description:
      'Создайте аккаунт читателя, чтобы каталогизировать и обменивать книги.',
    name: 'Имя',
    email: 'Email',
    password: 'Пароль',
    errorTitle: 'Не удалось создать аккаунт',
    creating: 'Создание аккаунта...',
    alreadyRegistered: 'Уже зарегистрированы?',
    success: 'Аккаунт создан. Теперь можно войти.',
    fallbackError: 'Не удалось создать аккаунт. Попробуйте ещё раз.',
  },
  dashboard: {
    actionsLabel: 'Книжные процессы',
    cards: {
      add: {
        title: 'Добавить книгу',
        description: 'Сначала ищите в каталоге или добавьте отсутствующую книгу вручную.',
      },
      share: {
        title: 'Поделиться книгой',
        description: 'Отправьте свою книгу другому читателю по email.',
      },
      give: {
        title: 'Передать книгу',
        description: 'Переместите владение, когда экземпляр передаётся навсегда.',
      },
      return: {
        title: 'Вернуть книгу',
        description: 'Закройте активное удержание и верните книгу владельцу.',
      },
    },
  },
  myBooks: {
    header: {
      eyebrow: 'Мой библиотечный стол',
      title: 'Мои книги',
      description:
        'Ваша полка — рабочий центр для обмена, передачи и ведения каталога.',
      ownedBooks: '{{count}} моих книг',
      ownedBooksLabel: 'моих книг',
    },
    metrics: {
      total: 'Всего на полке',
      available: 'Доступны',
      inMotion: 'В движении',
    },
    loading: 'Загрузка моих книг',
    error: {
      fallback: 'Не удалось загрузить ваши книги. Попробуйте ещё раз.',
      toastTitle: 'Не удалось загрузить ваши книги',
      eyebrow: 'Книги недоступны',
      title: 'Не удалось загрузить книги',
    },
    empty: {
      eyebrow: 'Пустая полка',
      title: 'Добавьте первый экземпляр для обмена',
      description:
        'Начните с поиска в каталоге, чтобы книга получила максимум доступных деталей.',
    },
    catalog: {
      eyebrow: 'Мой каталог',
      title: 'Текущая полка',
      contextLabel: 'Мой экземпляр',
      loaded: 'Мои книги загружены.',
    },
  },
  heldBooks: {
    header: {
      eyebrow: 'Взятая полка',
      title: 'Книги на руках',
      description:
        'Следите за книгами у вас и закрывайте удержание, когда экземпляр вернулся владельцу.',
      heldBooks: '{{count}} книг на руках',
      heldBooksLabel: 'книг на руках',
    },
    loading: 'Загрузка книг на руках',
    error: {
      fallback: 'Не удалось загрузить книги на руках. Попробуйте ещё раз.',
      toastTitle: 'Не удалось загрузить книги на руках',
      eyebrow: 'Книги на руках недоступны',
      title: 'Не удалось загрузить книги на руках',
    },
    empty: {
      eyebrow: 'Нет активных удержаний',
      title: 'Ваша заёмная полка пуста',
      description:
        'Книги, переданные вашему аккаунту, появятся здесь с владельцем и статусом.',
    },
    catalog: {
      eyebrow: 'Заёмный каталог',
      title: 'Активные удержания',
      contextLabel: 'Взятый экземпляр',
      loaded: 'Книги на руках загружены.',
    },
    aside: {
      eyebrow: 'Ритм возврата',
      title: 'Закрывайте удержания вовремя',
      description:
        'Используйте возврат, когда взятый экземпляр вернулся владельцу. Возврат сверяется с вашей заёмной полкой.',
    },
  },
  addBook: {
    errors: {
      fallback: 'Не удалось добавить эту книгу. Попробуйте ещё раз.',
      required: 'Название и автор обязательны.',
    },
    toasts: {
      achievement: {
        title: 'Достижение открыто',
        message: 'Первая книга добавлена',
      },
      searchError: 'Не удалось выполнить поиск в каталоге',
      detailsNeeded: 'Укажите название и автора',
      added: 'Книга добавлена',
      addError: 'Не удалось добавить книгу',
      catalogAddError: 'Не удалось добавить книгу из каталога',
    },
    messages: {
      addedToShelf: '{{title}} — {{author}} теперь на вашей полке.',
      catalogAddedToShelf: '{{title}} — {{author}} на вашей полке.',
    },
    header: {
      eyebrow: 'Запись каталога',
      title: 'Добавить книгу',
      description:
        'Сначала ищите в общем каталоге. Ручной ввод остаётся доступным, если книги нет в индексе.',
    },
    catalog: {
      eyebrow: 'Основной путь',
      title: 'Поиск в каталоге обмена',
      description:
        'Результаты обновляются после короткой паузы при вводе. Добавляйте отсюда, чтобы сохранить метаданные каталога.',
      behaviorTitle: 'Поведение каталога',
      behaviorDescription:
        'Поиск ждёт немного, пока вы печатаете. Используйте "Показать ещё", чтобы просмотреть остальной каталог.',
      searchLabel: 'Искать по названию или автору',
      help: 'Введите минимум два символа, чтобы фильтровать каталог.',
      addedTitle: 'Книга из каталога добавлена',
      loading: 'Загрузка книг каталога.',
      noMatchesTitle: 'Совпадений нет',
      noMatchesDescription:
        'В каталоге нет книг по этому запросу. Ниже доступно ручное добавление.',
      resultsTitle: 'Книги каталога',
      matchingTitle: 'Подходящие книги каталога',
      showing: 'Показано {{shown}} из {{total}}',
      isbn: 'ISBN {{isbn}}',
      alreadyOwned: 'Уже в моих книгах',
      adding: 'Добавление...',
      addToMine: 'Добавить в мои книги',
    },
    manual: {
      eyebrow: 'Запасной путь',
      title: 'Добавить вручную',
      description:
        'Не нашли книгу? Добавьте реальное название, которого ещё нет в общем каталоге.',
      successTitle: 'Книга успешно добавлена',
    },
  },
  shareBook: {
    steps: {
      name: {
        title: 'Назовите свой экземпляр',
        description: 'Используйте название точно как на вашей полке.',
      },
      reader: {
        title: 'Выберите читателя',
        description:
          'Введите email получателя, чтобы обмен создал удержание.',
      },
      collaborative: {
        title: 'Сохраняйте совместность',
        description: 'Книга остаётся частью обмена, пока ей делятся.',
      },
    },
    errors: {
      fallback: 'Не удалось поделиться этой книгой. Попробуйте ещё раз.',
      required: 'Название и email получателя обязательны.',
    },
    toasts: {
      detailsNeeded: 'Нужны детали обмена',
      shared: 'Книгой поделились',
      shareError: 'Не удалось поделиться книгой',
    },
    messages: {
      sharedWith: '{{title}} передана пользователю {{username}}.',
      lastShared: 'Последний обмен: {{title}} для {{username}}.',
    },
    header: {
      eyebrow: 'Процесс обмена',
      title: 'Поделиться книгой',
      description:
        'Создайте совместную передачу, связав одну вашу книгу с аккаунтом другого читателя.',
    },
    form: {
      eyebrow: 'Совместный обмен',
      title: 'Отправить читаемый экземпляр',
      description:
        'Обмен — временное состояние, а не окончательная передача владения.',
      note: 'Email получателя связывает действие с реальным аккаунтом.',
      bookTitle: 'Название книги',
      targetEmail: 'Email получателя',
      successTitle: 'Книгой успешно поделились',
      submitting: 'Передача...',
    },
    aside: {
      eyebrow: 'Процесс',
      title: 'Как работает обмен',
    },
  },
  giveBook: {
    steps: {
      verify: {
        title: 'Проверьте название',
        description: 'Используйте точное название книги, которая уйдёт с вашей полки.',
      },
      recipient: {
        title: 'Подтвердите получателя',
        description:
          'Email получателя получит владение после подтверждения передачи.',
      },
      submit: {
        title: 'Отправьте финальную передачу',
        description: 'Это намеренно серьёзнее, чем совместное удержание.',
      },
    },
    errors: {
      fallback: 'Не удалось передать эту книгу. Попробуйте ещё раз.',
      required: 'Название и email получателя обязательны.',
    },
    toasts: {
      detailsNeeded: 'Нужны детали передачи',
      given: 'Книга передана',
      giveError: 'Не удалось передать книгу',
    },
    messages: {
      givenTo: '{{title}} передана пользователю {{username}}.',
      lastGiven: 'Последняя передача: {{title}} для {{username}}.',
    },
    header: {
      eyebrow: 'Передача владения',
      title: 'Передать книгу',
      description:
        'Переместите экземпляр с вашей полки другому читателю окончательной передачей.',
    },
    form: {
      eyebrow: 'Финальная передача',
      title: 'Подтвердите смену владельца',
      description: 'Передача меняет владельца после подтверждения.',
      warningTitle: 'Владение перейдёт',
      warning: 'Проверьте название и email получателя перед отправкой.',
      bookTitle: 'Название книги',
      targetEmail: 'Email получателя',
      successTitle: 'Книга успешно передана',
      submitting: 'Передача...',
    },
    aside: {
      eyebrow: 'Проверки передачи',
      title: 'Перед передачей',
    },
  },
  returnBook: {
    steps: {
      choose: {
        title: 'Выберите из книг на руках',
        description: 'Выберите одну взятую книгу с вашей текущей полки.',
      },
      review: {
        title: 'Проверьте экземпляр',
        description: 'Проверьте название и автора перед закрытием удержания.',
      },
      confirm: {
        title: 'Подтвердите возврат',
        description: 'Подтвердите, что книга вернулась владельцу.',
      },
    },
    errors: {
      fallback: 'Не удалось вернуть эту книгу. Попробуйте ещё раз.',
      choose: 'Выберите взятую книгу для возврата.',
      confirm: 'Подтвердите, что книга вернулась владельцу.',
    },
    toasts: {
      loadError: 'Не удалось загрузить книги на руках',
      chooseBook: 'Выберите книгу',
      confirmReturn: 'Подтвердите возврат',
      returned: 'Книга возвращена',
      returnError: 'Не удалось вернуть книгу',
    },
    messages: {
      returnedToOwner:
        '{{title}} — {{author}} возвращена владельцу.',
      selected: '{{title}} — {{author}} будет возвращена владельцу.',
      lastReturned: 'Последний возврат: {{title}} — {{author}}.',
    },
    header: {
      eyebrow: 'Процесс возврата',
      title: 'Вернуть книгу',
      description:
        'Закройте активное удержание, когда взятый экземпляр возвращается владельцу.',
    },
    form: {
      eyebrow: 'Закрыть удержание',
      title: 'Выберите взятую книгу',
      description:
        'Выберите книгу с заёмной полки, проверьте детали и подтвердите возврат.',
      loading: 'Загрузка взятых книг',
      noBooksTitle: 'Нет взятых книг',
      noBooksDescription:
        'Ваша заёмная полка пуста. Сейчас нечего возвращать.',
      chooseLegend: 'Выберите взятую книгу',
      ownerLine: 'Владелец: {{owner}}',
      selectedTitle: 'Выбранный возврат',
      confirmLabel:
        'Я подтверждаю, что книга вернулась владельцу и удержание можно закрыть.',
      submitting: 'Возврат...',
    },
    aside: {
      eyebrow: 'Закрытие удержания',
      title: 'Последовательность возврата',
    },
  },
  profile: {
    header: {
      eyebrow: 'Аккаунт',
      title: 'Профиль',
      description:
        'Управляйте именем читателя, которое используется в книгах, удержаниях и действиях обмена.',
    },
    errors: {
      loadFallback: 'Не удалось загрузить профиль. Попробуйте ещё раз.',
      updateFallback: 'Не удалось обновить профиль. Попробуйте ещё раз.',
      emptyName: 'Имя не может быть пустым.',
      unavailable: 'Профиль недоступен',
      loadTitle: 'Не удалось загрузить профиль',
      saveTitle: 'Не удалось сохранить профиль',
      nameRequired: 'Укажите имя',
    },
    toasts: {
      savedTitle: 'Профиль сохранён',
      savedMessage: 'Имя читателя обновлено.',
    },
    loading: 'Загрузка профиля.',
    details: {
      signedInReader: 'Вошедший читатель',
      avatarAlt: 'Аватар {{name}}',
      ownedBooks: 'Мои книги',
      heldBooks: 'Книги на руках',
      achievements: 'Достижения',
      editIdentity: 'Редактировать личность',
      readerName: 'Имя читателя',
      nameAppears: 'Это имя показывается в интерфейсе аккаунта.',
      name: 'Имя',
      saving: 'Сохранение...',
      savedMessage: 'Профиль успешно обновлён.',
    },
    achievements: {
      profileReady: 'Профиль готов',
      firstBookAdded: 'Первая книга добавлена',
      addFirstBook: 'Добавьте первую книгу',
      exchangeReady: 'Обмен готов',
    },
  },
  admin: {
    status: {
      withOwner: 'У владельца',
      borrowed: 'Взята',
    },
    errors: {
      loadFallback: 'Не удалось загрузить админ-книги. Попробуйте ещё раз.',
      forceFallback: 'Не удалось принудительно вернуть книгу. Попробуйте ещё раз.',
      loadTitle: 'Не удалось загрузить админ-книги',
      actionTitle: 'Не удалось принудительно вернуть книгу',
    },
    toasts: {
      noActionTitle: 'Действие не требуется',
      forceCompleteTitle: 'Принудительный возврат выполнен',
    },
    messages: {
      alreadyWithOwner: '{{title}} уже у владельца.',
      returnedToOwner: '{{title}} возвращена владельцу.',
      forceReturnLabel: 'Принудительно вернуть {{title}}',
    },
    header: {
      eyebrow: 'Админ-операции',
      title: 'Админ-панель',
      description:
        'Следите за инвентарём и принудительно возвращайте взятые экземпляры владельцам при операционном восстановлении.',
    },
    metrics: {
      totalBooks: 'Всего книг',
      inventoryReady: 'Инвентарь готов',
      borrowed: 'Взяты',
      onLoan: 'На выдаче',
      withOwner: 'У владельца',
      atHome: 'На месте',
    },
    loading: 'Загрузка админ-книг.',
    empty: {
      eyebrow: 'Пустой каталог',
      title: 'Книги не найдены',
      description: 'Книги появятся здесь, когда в каталоге обмена будут позиции.',
    },
    table: {
      eyebrow: 'Инвентарь',
      title: 'Таблица операций с книгами',
      caption:
        'Админский инвентарь книг с владельцем, держателем, статусом и действиями принудительного возврата.',
      noAction: 'Действие не требуется',
      forceReturn: 'Принудительный возврат',
      returning: 'Возврат...',
    },
    unavailable: 'Админ-книги недоступны',
  },
  components: {
    stateMessage: {
      labels: {
        success: 'Успешно',
        warning: 'Внимание',
        error: 'Ошибка',
        info: 'Уведомление',
      },
    },
    bookCard: {
      context: {
        owner: 'Владелец',
        genre: 'Жанр',
      },
    },
    dashboardCard: {
      openWorkflow: 'Открыть',
    },
    bookCover: {
      fallbackInitials: 'BE',
    },
  },
  api: {
    auth: {
      invalidCredentials: 'Email или пароль неверны. Попробуйте ещё раз.',
      backendUnavailable:
        'Книжный сервис сейчас недоступен. Попробуйте чуть позже.',
      unknown: 'Не удалось войти. Попробуйте ещё раз.',
    },
    profile: {
      missingCredentials:
        'Сохранённые данные входа отсутствуют. Войдите снова.',
      requiredName: 'Имя профиля обязательно.',
      readField: 'Не удалось прочитать поле профиля {{field}}. Попробуйте ещё раз.',
      avatar: 'Не удалось прочитать аватар профиля. Попробуйте ещё раз.',
      details: 'Не удалось загрузить детали профиля. Попробуйте ещё раз.',
    },
    register: {
      success: 'Регистрация успешна, ваш email теперь ваш username',
      generic:
        'Не удалось создать аккаунт. Проверьте данные и попробуйте ещё раз.',
      backendUnavailable:
        'Книжный сервис сейчас недоступен. Попробуйте чуть позже.',
    },
    books: {
      missingCredentials:
        'Сохранённые данные входа отсутствуют. Войдите снова.',
      addedBookUnread: 'Не удалось прочитать добавленную книгу. Попробуйте ещё раз.',
      signInAgainAction: 'Войдите снова, чтобы продолжить: {{action}}.',
      actionIncomplete: '{{action}} не удалось завершить. Попробуйте ещё раз.',
      loadResponse: 'Не удалось загрузить {{name}}. Попробуйте ещё раз.',
      loadAdminBooks: 'Не удалось загрузить админ-книги. Попробуйте ещё раз.',
      readAdminBook:
        'Не удалось прочитать админ-книгу {{index}}. Обновите страницу и попробуйте ещё раз.',
      untitled: 'Книга без названия',
      unknownAuthor: 'Неизвестный автор',
      general: 'Общее',
      noDescription: 'Описание пока не добавлено',
      readAdminField:
        'Не удалось прочитать {{field}} для админ-книги {{index}}. Обновите страницу и попробуйте ещё раз.',
      signInAgain: 'Войдите снова, чтобы продолжить.',
      adminRequired:
        'Для этого действия нужен доступ администратора. Войдите под админ-аккаунтом.',
      chooseForceReturn: 'Выберите книгу перед принудительным возвратом.',
      forceReturnConfirm:
        'Не удалось подтвердить принудительный возврат. Обновите страницу и попробуйте ещё раз.',
    },
    catalog: {
      duplicate: 'Вы уже добавили эту книгу из каталога',
      readField: 'Не удалось прочитать {{field}} для {{name}}. Попробуйте ещё раз.',
      load: 'Не удалось загрузить книги каталога. Попробуйте ещё раз.',
      readBook:
        'Не удалось прочитать книгу каталога {{index}}. Обновите страницу и попробуйте ещё раз.',
      general: 'Общее',
      noDescription: 'Описание не добавлено.',
      readAdded:
        'Не удалось прочитать добавленную книгу из каталога. Попробуйте ещё раз.',
      idRequired: 'ID книги каталога обязателен.',
      addFallback: 'Не удалось добавить эту книгу из каталога. Попробуйте ещё раз.',
    },
  },
} as const

export default localizedRu
