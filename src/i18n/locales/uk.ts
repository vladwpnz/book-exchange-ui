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
  appSidebar: {
    eyebrow: 'Робочий простір',
    heading: 'Полиця обміну',
    description: 'Каталог, утримання, передачі, повернення й операції.',
    navigationLabel: 'Розділи застосунку',
    navigation: {
      myBooks: {
        label: 'Мої книги',
        hint: 'Власна полиця',
      },
      held: {
        label: 'На руках',
        hint: 'Позичені книги',
      },
      add: {
        label: 'Додати',
        hint: 'Спершу каталог',
      },
      share: {
        label: 'Поділитися',
        hint: 'Спільний доступ',
      },
      give: {
        label: 'Передати',
        hint: 'Остаточна передача',
      },
      return: {
        label: 'Повернути',
        hint: 'Закрити утримання',
      },
    },
    account: {
      sectionLabel: 'Керування обліковим записом',
      navigationLabel: 'Посилання облікового запису',
      signedInAs: 'Вхід виконано як',
      account: 'Обліковий запис',
      accountHint: 'Налаштування профілю',
      admin: 'Адмін',
      adminHint: 'Операції',
      language: 'Мова',
      logout: 'Вийти',
      logoutLabel: 'Вийти й повернутися на головну',
    },
  },
} as const

const localizedUk = {
  ...uk,
  common: {
    appName: 'Book Exchange',
    actions: {
      addBook: 'Додати книгу',
      addManually: 'Додати вручну',
      backToHome: 'На головну',
      browseAll: 'Усі книги',
      checkOwnedShelf: 'Перевірити мою полицю',
      closeNotification: 'Закрити сповіщення',
      confirmReturn: 'Підтвердити повернення',
      continue: 'Продовжити',
      createAccount: 'Створити акаунт',
      filtered: 'Фільтр',
      give: 'Передати',
      giveBook: 'Передати книгу',
      login: 'Увійти',
      openHeldBooks: 'Відкрити позичені книги',
      openMyBooks: 'Відкрити мої книги',
      openReturnFlow: 'Відкрити повернення',
      openShare: 'Відкрити обмін',
      openWorkflow: 'Відкрити',
      previewShareFlow: 'Перегляд обміну',
      returnBook: 'Повернути книгу',
      returnThisTitle: 'Повернути цю книгу',
      saveProfile: 'Зберегти профіль',
      saving: 'Збереження...',
      searchCatalog: 'Шукати в каталозі',
      share: 'Поділитися',
      shareBook: 'Поділитися книгою',
      showMore: 'Показати ще',
      tryAgain: 'Спробувати ще раз',
      viewInApp: 'Відкрити в застосунку',
      viewMyBooks: 'Переглянути мої книги',
    },
    status: {
      active: 'Активний',
      available: 'Доступна',
      borrowed: 'Позичена',
      error: 'Помилка',
      held: 'На руках',
      info: 'Повідомлення',
      pending: 'Очікує',
      shared: 'Передана',
      success: 'Успішно',
      warning: 'Увага',
      withOwner: 'У власника',
    },
    bookMeta: {
      action: 'Дія',
      author: 'Автор',
      book: 'Книга',
      genre: 'Жанр',
      holderId: 'ID утримувача',
      id: 'ID',
      owner: 'Власник',
      ownerId: 'ID власника',
      role: 'Роль',
      status: 'Статус',
      title: 'Назва',
    },
    placeholders: {
      authorName: "Ім'я автора",
      bookTitle: 'Назва книги',
      effectiveJava: 'Effective Java',
      giveTestBook: 'Give Test Book',
      password: 'Пароль',
      readerEmail: 'reader@example.com',
      readerName: "Ім'я читача",
      yourName: "Ваше ім'я",
    },
    values: {
      dash: '-',
    },
  },
  navbar: {
    home: 'Головна',
    openApp: 'Відкрити застосунок',
    login: 'Увійти',
    register: 'Реєстрація',
    admin: 'Адмін',
    account: 'Акаунт',
    logout: 'Вийти',
    readerNetwork: 'Обмін книгами',
    exchangeWorkspace: 'Моя бібліотека',
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
  authShell: {
    backHomeLabel: 'Повернутися на головну Book Exchange',
    readerAccess: 'Доступ читача',
    exchangeDesk: 'Стіл обміну',
    editorialTitle:
      'Увійдіть, щоб керувати книгами, утриманнями та передаваннями.',
    editorialFooter:
      "Один вхід пов'язує ваші полиці, утримання й обміни з акаунтом читача.",
    covers: {
      ownedShelf: 'Власна полиця',
      sharedCopy: 'Переданий примірник',
      catalog: 'Каталог',
      exchange: 'Обмін',
      reader: 'Читач',
    },
  },
  appSidebar: {
    eyebrow: 'Робочий простір',
    heading: 'Полиця обміну',
    description: 'Каталог, утримання, передавання, повернення й операції.',
    navigationLabel: 'Розділи застосунку',
    navigation: {
      myBooks: {
        label: 'Мої книги',
        hint: 'Власна полиця',
      },
      held: {
        label: 'На руках',
        hint: 'Позичена полиця',
      },
      add: {
        label: 'Додати',
        hint: 'Спершу каталог',
      },
      share: {
        label: 'Поділитися',
        hint: 'Спільно',
      },
      give: {
        label: 'Передати',
        hint: 'Фінальна передача',
      },
      return: {
        label: 'Повернути',
        hint: 'Закрити утримання',
      },
    },
    settings: {
      heading: 'Налаштування',
      label: 'Налаштування',
      hint: 'Мова і сеанс',
      navigationLabel: 'Налаштування',
      account: {
        label: 'Акаунт',
        hint: 'Налаштування профілю',
      },
    },
  },
  settings: {
    header: {
      eyebrow: 'Налаштування',
      title: 'Налаштування',
      description:
        'Тут можна змінити мову, відкрити адмін-панель і вийти з акаунта.',
    },
    signedInAs: {
      label: 'Вхід виконано як',
    },
    admin: {
      title: 'Адмін',
      subtitle: 'Операції',
      description: 'Відкрити інструменти операційного відновлення каталогу.',
      open: 'Відкрити адмін-панель',
    },
    language: {
      title: 'Мова',
      description: 'Змініть мову інтерфейсу одразу, без перезавантаження.',
    },
    logout: {
      title: 'Вийти',
      description: 'Завершити сеанс і повернутися на головну сторінку.',
      action: 'Вийти',
    },
    loadingProfile: 'Завантаження прав акаунта.',
    errors: {
      loadProfile: 'Не вдалося завантажити права акаунта. Спробуйте ще раз.',
      profileStatusTitle: 'Не вдалося завантажити права акаунта',
    },
    toasts: {
      profileLoadError: {
        title: 'Не вдалося завантажити права акаунта',
      },
    },
  },
  landing: {
    hero: {
      eyebrow: 'Обмінюйтеся книгами з іншими людьми',
      title: 'Book Exchange',
      description:
        'Додавайте свої книги, діліться ними, передавайте іншим користувачам і стежте за поверненнями.',
      openShelf: 'Відкрити мої книги',
      addBook: 'Додати книгу',
      stats: {
        catalog: {
          label: 'Пошук у каталозі',
          value: 'Спершу знайдіть книгу, а потім додайте її.',
        },
        flows: {
          label: 'Зрозумілі дії',
          value: 'Поділитися, передати або повернути книгу.',
        },
        admin: {
          label: 'Інструменти адміністратора',
          value: 'Контроль книг і активних обмінів.',
        },
      },
    },
    preview: {
      ariaLabel: 'Перегляд каталогу Book Exchange',
      eyebrow: 'Приклад бібліотеки',
      title: 'Усі книги в одному місці',
      badge: 'Передперегляд',
      requestTitle: 'Запит на обмін',
      requestDescription:
        'Книга «Maps of Quiet Cities» знаходиться в іншого користувача до неділі.',
    },
    workflow: {
      eyebrow: 'Як це працює',
      title: 'Усі дії з книгами — в одному місці.',
      description:
        'Додавайте книги, діліться ними, передавайте іншим користувачам і позначайте повернення.',
      items: {
        add: {
          title: 'Знайдіть або додайте книгу',
          description:
            'Знайдіть книгу в каталозі або додайте її вручну.',
        },
        share: {
          title: 'Поділіться книгою',
          description:
            'Дайте книгу іншому користувачу на певний час.',
        },
        give: {
          title: 'Передайте книгу',
          description:
            'Передайте книгу іншому користувачу назавжди.',
        },
        return: {
          title: 'Поверніть книгу',
          description:
            'Закрийте обмін, коли книга повернулася власнику.',
        },
      },
    },
    catalog: {
      eyebrow: 'Каталог',
      title: 'Уся важлива інформація одразу видима.',
      description:
        'У картці книги показано назву, автора, власника й поточний статус.',
      benefits: {
        cards:
          'Картки книг із назвою, автором, власником, статусом і нотатками.',
        flows:
          'Окремі процеси для обміну, передачі, повернення та адмін-відновлення.',
        shell:
          'Компактна оболонка застосунку для телефона, планшета й desktop.',
      },
      contextLabel: 'Каталог',
    },
    featuredBooks: {
      'bk-aurora': {
        genre: 'Художня література',
        note: 'Можна поділитися цього тижня',
      },
      'bk-map': {
        genre: 'Подорожі',
        note: 'В іншого користувача до неділі',
      },
      'bk-craft': {
        genre: 'Технології',
        note: 'Передана іншому користувачу',
      },
    },
    footer: {
      description:
        'Зручний сервіс для обміну книгами між користувачами.',
      serviceRepo: 'Репозиторій',
      qualityChecks: 'Перевірки',
    },
  },
  login: {
    title: 'Увійти',
    description:
      'Використайте email і пароль, щоб перейти до простору обміну.',
    email: 'Email',
    password: 'Пароль',
    errorTitle: 'Не вдалося увійти',
    signingIn: 'Вхід...',
    newHere: 'Ви тут уперше?',
  },
  register: {
    title: 'Створити акаунт',
    description:
      'Створіть акаунт читача, щоб каталогізувати й обмінювати книги.',
    name: "Ім'я",
    email: 'Email',
    password: 'Пароль',
    errorTitle: 'Не вдалося створити акаунт',
    creating: 'Створення акаунта...',
    alreadyRegistered: 'Уже зареєстровані?',
    success: 'Акаунт створено. Тепер можна увійти.',
    fallbackError: 'Не вдалося створити акаунт. Спробуйте ще раз.',
  },
  dashboard: {
    actionsLabel: 'Книжкові процеси',
    cards: {
      add: {
        title: 'Додати книгу',
        description: 'Спершу шукайте в каталозі або додайте відсутню книгу вручну.',
      },
      share: {
        title: 'Поділитися книгою',
        description: 'Надішліть власну книгу іншому читачу за email.',
      },
      give: {
        title: 'Передати книгу',
        description: 'Перемістіть власність, коли примірник переходить назавжди.',
      },
      return: {
        title: 'Повернути книгу',
        description: 'Закрийте активне утримання й поверніть книгу власнику.',
      },
    },
  },
  myBooks: {
    header: {
      eyebrow: 'Мій бібліотечний стіл',
      title: 'Мої книги',
      description:
        'Ваша власна полиця — центр для обміну, передачі й підтримки каталогу.',
      ownedBooks: '{{count}} моїх книг',
      ownedBooksLabel: 'моїх книг',
    },
    metrics: {
      total: 'Усього на полиці',
      available: 'Доступні',
      inMotion: 'У русі',
    },
    loading: 'Завантаження моїх книг',
    error: {
      fallback: 'Не вдалося завантажити ваші книги. Спробуйте ще раз.',
      toastTitle: 'Не вдалося завантажити ваші книги',
      eyebrow: 'Книги недоступні',
      title: 'Не вдалося завантажити книги',
    },
    empty: {
      eyebrow: 'Порожня полиця',
      title: 'Додайте перший примірник для обміну',
      description:
        'Почніть із пошуку в каталозі, щоб книга отримала найповніші доступні деталі.',
    },
    catalog: {
      eyebrow: 'Власний каталог',
      title: 'Поточна полиця',
      contextLabel: 'Власний примірник',
      loaded: 'Мої книги завантажено.',
    },
  },
  heldBooks: {
    header: {
      eyebrow: 'Позичена полиця',
      title: 'Книги на руках',
      description:
        'Стежте за книгами, що зараз у вас, і закривайте утримання після повернення власнику.',
      heldBooks: '{{count}} книг на руках',
      heldBooksLabel: 'книг на руках',
    },
    loading: 'Завантаження книг на руках',
    error: {
      fallback: 'Не вдалося завантажити книги на руках. Спробуйте ще раз.',
      toastTitle: 'Не вдалося завантажити книги на руках',
      eyebrow: 'Книги на руках недоступні',
      title: 'Не вдалося завантажити книги на руках',
    },
    empty: {
      eyebrow: 'Немає активних утримань',
      title: 'Ваша позичена полиця порожня',
      description:
        'Книги, передані вашому акаунту, з’являться тут із власником і статусом.',
    },
    catalog: {
      eyebrow: 'Позичений каталог',
      title: 'Активні утримання',
      contextLabel: 'Позичений примірник',
      loaded: 'Книги на руках завантажено.',
    },
    aside: {
      eyebrow: 'Ритм повернення',
      title: 'Закривайте утримання вчасно',
      description:
        'Використовуйте повернення, коли позичений примірник повернувся власнику. Повернення звіряється з вашою позиченою полицею.',
    },
  },
  addBook: {
    errors: {
      fallback: 'Не вдалося додати цю книгу. Спробуйте ще раз.',
      required: 'Назва й автор обов’язкові.',
    },
    toasts: {
      achievement: {
        title: 'Досягнення відкрито',
        message: 'Першу книгу додано',
      },
      searchError: 'Не вдалося виконати пошук у каталозі',
      detailsNeeded: 'Укажіть назву й автора',
      added: 'Книгу додано',
      addError: 'Не вдалося додати книгу',
      catalogAddError: 'Не вдалося додати книгу з каталогу',
    },
    messages: {
      addedToShelf: '{{title}} — {{author}} тепер на вашій полиці.',
      catalogAddedToShelf: '{{title}} — {{author}} на вашій полиці.',
    },
    header: {
      eyebrow: 'Запис каталогу',
      title: 'Додати книгу',
      description:
        'Спершу шукайте в спільному каталозі. Ручне введення лишається доступним, якщо книги немає в індексі.',
    },
    catalog: {
      eyebrow: 'Основний шлях',
      title: 'Пошук у каталозі обміну',
      description:
        'Результати оновлюються після короткої паузи під час введення. Додавайте звідси, щоб зберегти метадані каталогу.',
      behaviorTitle: 'Поведінка каталогу',
      behaviorDescription:
        'Пошук трохи чекає, доки ви друкуєте. Використовуйте "Показати ще", щоб переглянути решту каталогу.',
      searchLabel: 'Шукати за назвою або автором',
      help: 'Введіть щонайменше два символи, щоб фільтрувати каталог.',
      addedTitle: 'Книгу з каталогу додано',
      loading: 'Завантаження книг каталогу.',
      noMatchesTitle: 'Збігів немає',
      noMatchesDescription:
        'У каталозі немає книг за цим запитом. Нижче доступне ручне додавання.',
      resultsTitle: 'Книги каталогу',
      matchingTitle: 'Відповідні книги каталогу',
      showing: 'Показано {{shown}} з {{total}}',
      isbn: 'ISBN {{isbn}}',
      alreadyOwned: 'Уже в моїх книгах',
      adding: 'Додавання...',
      addToMine: 'Додати до моїх книг',
    },
    manual: {
      eyebrow: 'Запасний шлях',
      title: 'Додати вручну',
      description:
        'Не знайшли книгу? Додайте реальну назву, якої ще немає в спільному каталозі.',
      successTitle: 'Книгу успішно додано',
    },
  },
  shareBook: {
    steps: {
      name: {
        title: 'Назвіть власний примірник',
        description: 'Використовуйте назву точно так, як вона на вашій полиці.',
      },
      reader: {
        title: 'Виберіть читача',
        description: 'Введіть email отримувача, щоб обмін створив утримання.',
      },
      collaborative: {
        title: 'Зберігайте спільний режим',
        description: 'Книга лишається частиною обміну, поки нею діляться.',
      },
    },
    errors: {
      fallback: 'Не вдалося поділитися цією книгою. Спробуйте ще раз.',
      required: 'Назва й email отримувача обов’язкові.',
    },
    toasts: {
      detailsNeeded: 'Потрібні деталі обміну',
      shared: 'Книгою поділилися',
      shareError: 'Не вдалося поділитися книгою',
    },
    messages: {
      sharedWith: '{{title}} передано користувачу {{username}}.',
      lastShared: 'Останній обмін: {{title}} для {{username}}.',
    },
    header: {
      eyebrow: 'Процес обміну',
      title: 'Поділитися книгою',
      description:
        'Створіть спільну передачу, поєднавши одну вашу книгу з акаунтом іншого читача.',
    },
    form: {
      eyebrow: 'Спільний обмін',
      title: 'Надіслати читабельний примірник',
      description:
        'Обмін — тимчасовий стан, а не фінальна передача власності.',
      note: 'Email отримувача пов’язує дію з реальним акаунтом.',
      bookTitle: 'Назва книги',
      targetEmail: 'Email отримувача',
      successTitle: 'Книгою успішно поділилися',
      submitting: 'Передавання...',
    },
    aside: {
      eyebrow: 'Процес',
      title: 'Як працює обмін',
    },
  },
  giveBook: {
    steps: {
      verify: {
        title: 'Перевірте назву',
        description: 'Використовуйте точну назву книги, що має піти з полиці.',
      },
      recipient: {
        title: 'Підтвердьте отримувача',
        description:
          'Email отримувача отримає право власності після підтвердження передачі.',
      },
      submit: {
        title: 'Надішліть фінальну передачу',
        description: 'Це навмисно серйозніше за спільне утримання.',
      },
    },
    errors: {
      fallback: 'Не вдалося передати цю книгу. Спробуйте ще раз.',
      required: 'Назва й email отримувача обов’язкові.',
    },
    toasts: {
      detailsNeeded: 'Потрібні деталі передачі',
      given: 'Книгу передано',
      giveError: 'Не вдалося передати книгу',
    },
    messages: {
      givenTo: '{{title}} передано користувачу {{username}}.',
      lastGiven: 'Остання передача: {{title}} для {{username}}.',
    },
    header: {
      eyebrow: 'Передача власності',
      title: 'Передати книгу',
      description:
        'Перемістіть примірник із власної полиці іншому читачу як фінальну передачу.',
    },
    form: {
      eyebrow: 'Фінальна передача',
      title: 'Підтвердьте зміну власника',
      description: 'Передача змінює власника після підтвердження.',
      warningTitle: 'Власність перейде',
      warning: 'Перевірте назву й email отримувача перед відправленням.',
      bookTitle: 'Назва книги',
      targetEmail: 'Email отримувача',
      successTitle: 'Книгу успішно передано',
      submitting: 'Передавання...',
    },
    aside: {
      eyebrow: 'Перевірки передачі',
      title: 'Перед передачею',
    },
  },
  returnBook: {
    steps: {
      choose: {
        title: 'Виберіть із книг на руках',
        description: 'Виберіть одну позичену книгу з поточної полиці.',
      },
      review: {
        title: 'Перевірте примірник',
        description: 'Перевірте назву й автора перед закриттям утримання.',
      },
      confirm: {
        title: 'Підтвердьте повернення',
        description: 'Підтвердьте, що книга повернулася власнику.',
      },
    },
    errors: {
      fallback: 'Не вдалося повернути цю книгу. Спробуйте ще раз.',
      choose: 'Виберіть позичену книгу для повернення.',
      confirm: 'Підтвердьте, що книга повернулася власнику.',
    },
    toasts: {
      loadError: 'Не вдалося завантажити книги на руках',
      chooseBook: 'Виберіть книгу',
      confirmReturn: 'Підтвердьте повернення',
      returned: 'Книгу повернено',
      returnError: 'Не вдалося повернути книгу',
    },
    messages: {
      returnedToOwner: '{{title}} — {{author}} повернено власнику.',
      selected: '{{title}} — {{author}} буде повернено власнику.',
      lastReturned: 'Останнє повернення: {{title}} — {{author}}.',
    },
    header: {
      eyebrow: 'Процес повернення',
      title: 'Повернути книгу',
      description:
        'Закрийте активне утримання, коли позичений примірник повертається власнику.',
    },
    form: {
      eyebrow: 'Закрити утримання',
      title: 'Виберіть позичену книгу',
      description:
        'Виберіть книгу з позиченої полиці, перевірте деталі й підтвердьте повернення.',
      loading: 'Завантаження позичених книг',
      noBooksTitle: 'Немає позичених книг',
      noBooksDescription:
        'Ваша позичена полиця порожня. Зараз нічого повертати.',
      chooseLegend: 'Виберіть позичену книгу',
      ownerLine: 'Власник: {{owner}}',
      selectedTitle: 'Вибране повернення',
      confirmLabel:
        'Я підтверджую, що книга повернулася власнику й утримання можна закрити.',
      submitting: 'Повернення...',
    },
    aside: {
      eyebrow: 'Закриття утримання',
      title: 'Послідовність повернення',
    },
  },
  profile: {
    header: {
      eyebrow: 'Акаунт',
      title: 'Профіль',
      description:
        "Керуйте ім'ям читача, яке використовується у книгах, утриманнях і діях обміну.",
    },
    errors: {
      loadFallback: 'Не вдалося завантажити профіль. Спробуйте ще раз.',
      updateFallback: 'Не вдалося оновити профіль. Спробуйте ще раз.',
      emptyName: "Ім'я не може бути порожнім.",
      unavailable: 'Профіль недоступний',
      loadTitle: 'Не вдалося завантажити профіль',
      saveTitle: 'Не вдалося зберегти профіль',
      nameRequired: "Укажіть ім'я",
    },
    toasts: {
      savedTitle: 'Профіль збережено',
      savedMessage: "Ім'я читача оновлено.",
    },
    loading: 'Завантаження профілю.',
    details: {
      signedInReader: 'Читач, що увійшов',
      avatarAlt: 'Аватар {{name}}',
      ownedBooks: 'Мої книги',
      heldBooks: 'Книги на руках',
      achievements: 'Досягнення',
      editIdentity: 'Редагувати ідентичність',
      readerName: "Ім'я читача",
      nameAppears: "Це ім'я показується в інтерфейсі акаунта.",
      name: "Ім'я",
      saving: 'Збереження...',
      savedMessage: 'Профіль успішно оновлено.',
    },
    achievements: {
      profileReady: 'Профіль готовий',
      firstBookAdded: 'Першу книгу додано',
      addFirstBook: 'Додайте першу книгу',
      exchangeReady: 'Обмін готовий',
    },
  },
  admin: {
    status: {
      withOwner: 'У власника',
      borrowed: 'Позичена',
    },
    errors: {
      loadFallback: 'Не вдалося завантажити адмін-книги. Спробуйте ще раз.',
      forceFallback: 'Не вдалося примусово повернути книгу. Спробуйте ще раз.',
      loadTitle: 'Не вдалося завантажити адмін-книги',
      actionTitle: 'Не вдалося примусово повернути книгу',
    },
    toasts: {
      noActionTitle: 'Дія не потрібна',
      forceCompleteTitle: 'Примусове повернення виконано',
    },
    messages: {
      alreadyWithOwner: '{{title}} уже у власника.',
      returnedToOwner: '{{title}} повернено власнику.',
      forceReturnLabel: 'Примусово повернути {{title}}',
    },
    header: {
      eyebrow: 'Адмін-операції',
      title: 'Адмін-панель',
      description:
        'Стежте за інвентарем і примусово повертайте позичені примірники власникам, коли потрібне операційне відновлення.',
    },
    metrics: {
      totalBooks: 'Усього книг',
      inventoryReady: 'Інвентар готовий',
      borrowed: 'Позичені',
      onLoan: 'На видачі',
      withOwner: 'У власника',
      atHome: 'На місці',
    },
    loading: 'Завантаження адмін-книг.',
    empty: {
      eyebrow: 'Порожній каталог',
      title: 'Книги не знайдено',
      description: 'Книги з’являться тут, коли в каталозі обміну будуть позиції.',
    },
    table: {
      eyebrow: 'Інвентар',
      title: 'Таблиця операцій з книгами',
      caption:
        'Адмінський інвентар книг із власником, утримувачем, статусом і діями примусового повернення.',
      noAction: 'Дія не потрібна',
      forceReturn: 'Примусове повернення',
      returning: 'Повернення...',
    },
    unavailable: 'Адмін-книги недоступні',
  },
  components: {
    stateMessage: {
      labels: {
        success: 'Успішно',
        warning: 'Увага',
        error: 'Помилка',
        info: 'Повідомлення',
      },
    },
    bookCard: {
      context: {
        owner: 'Власник',
        genre: 'Жанр',
      },
    },
    dashboardCard: {
      openWorkflow: 'Відкрити',
    },
    bookCover: {
      fallbackInitials: 'BE',
    },
  },
  api: {
    auth: {
      invalidCredentials: 'Email або пароль неправильні. Спробуйте ще раз.',
      backendUnavailable:
        'Книжковий сервіс зараз недоступний. Спробуйте трохи пізніше.',
      unknown: 'Не вдалося увійти. Спробуйте ще раз.',
    },
    profile: {
      missingCredentials: 'Збережені дані входу відсутні. Увійдіть знову.',
      requiredName: "Ім'я профілю обов’язкове.",
      readField: 'Не вдалося прочитати поле профілю {{field}}. Спробуйте ще раз.',
      avatar: 'Не вдалося прочитати аватар профілю. Спробуйте ще раз.',
      details: 'Не вдалося завантажити деталі профілю. Спробуйте ще раз.',
    },
    register: {
      success: 'Реєстрація успішна, ваш email тепер ваш username',
      generic:
        'Не вдалося створити акаунт. Перевірте дані й спробуйте ще раз.',
      backendUnavailable:
        'Книжковий сервіс зараз недоступний. Спробуйте трохи пізніше.',
    },
    books: {
      missingCredentials: 'Збережені дані входу відсутні. Увійдіть знову.',
      addedBookUnread: 'Не вдалося прочитати додану книгу. Спробуйте ще раз.',
      signInAgainAction: 'Увійдіть знову, щоб продовжити: {{action}}.',
      actionIncomplete: '{{action}} не вдалося завершити. Спробуйте ще раз.',
      loadResponse: 'Не вдалося завантажити {{name}}. Спробуйте ще раз.',
      loadAdminBooks: 'Не вдалося завантажити адмін-книги. Спробуйте ще раз.',
      readAdminBook:
        'Не вдалося прочитати адмін-книгу {{index}}. Оновіть сторінку й спробуйте ще раз.',
      untitled: 'Книга без назви',
      unknownAuthor: 'Невідомий автор',
      general: 'Загальне',
      noDescription: 'Опис ще не додано',
      readAdminField:
        'Не вдалося прочитати {{field}} для адмін-книги {{index}}. Оновіть сторінку й спробуйте ще раз.',
      signInAgain: 'Увійдіть знову, щоб продовжити.',
      adminRequired:
        'Для цієї дії потрібен доступ адміністратора. Увійдіть під адмін-акаунтом.',
      chooseForceReturn: 'Виберіть книгу перед примусовим поверненням.',
      forceReturnConfirm:
        'Не вдалося підтвердити примусове повернення. Оновіть сторінку й спробуйте ще раз.',
    },
    catalog: {
      duplicate: 'Ви вже додали цю книгу з каталогу',
      readField: 'Не вдалося прочитати {{field}} для {{name}}. Спробуйте ще раз.',
      load: 'Не вдалося завантажити книги каталогу. Спробуйте ще раз.',
      readBook:
        'Не вдалося прочитати книгу каталогу {{index}}. Оновіть сторінку й спробуйте ще раз.',
      general: 'Загальне',
      noDescription: 'Опис не додано.',
      readAdded: 'Не вдалося прочитати додану книгу з каталогу. Спробуйте ще раз.',
      idRequired: 'ID книги каталогу обов’язковий.',
      addFallback: 'Не вдалося додати цю книгу з каталогу. Спробуйте ще раз.',
    },
  },
} as const

export default localizedUk
