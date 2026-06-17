const en = {
  common: {
    appName: 'Book Exchange',
    actions: {
      addBook: 'Add book',
      addManually: 'Add manually',
      backToHome: 'Back to home',
      browseAll: 'Browse all',
      checkOwnedShelf: 'Check owned shelf',
      closeNotification: 'Close notification',
      confirmReturn: 'Confirm return',
      continue: 'Continue',
      createAccount: 'Create account',
      filtered: 'Filtered',
      give: 'Give',
      giveBook: 'Give book',
      login: 'Login',
      openHeldBooks: 'Open held books',
      openMyBooks: 'Open my books',
      openReturnFlow: 'Open return flow',
      openShare: 'Open share',
      openWorkflow: 'Open',
      previewShareFlow: 'Preview share flow',
      returnBook: 'Return a book',
      returnThisTitle: 'Return this title',
      saveProfile: 'Save profile',
      saving: 'Saving...',
      searchCatalog: 'Search catalog',
      share: 'Share',
      shareBook: 'Share book',
      showMore: 'Show more',
      tryAgain: 'Try again',
      viewInApp: 'View in app',
      viewMyBooks: 'View my books',
    },
    status: {
      active: 'Active',
      available: 'Available',
      borrowed: 'Borrowed',
      error: 'Error',
      held: 'Held',
      info: 'Notice',
      pending: 'Pending',
      shared: 'Shared',
      success: 'Success',
      warning: 'Warning',
      withOwner: 'With owner',
    },
    bookMeta: {
      action: 'Action',
      author: 'Author',
      book: 'Book',
      genre: 'Genre',
      holderId: 'Holder ID',
      id: 'ID',
      owner: 'Owner',
      ownerId: 'Owner ID',
      role: 'Role',
      status: 'Status',
      title: 'Title',
    },
    placeholders: {
      authorName: 'Author name',
      bookTitle: 'Book title',
      effectiveJava: 'Effective Java',
      giveTestBook: 'Give Test Book',
      password: 'Password',
      readerEmail: 'reader@example.com',
      readerName: 'Reader name',
      yourName: 'Your name',
    },
    values: {
      dash: '-',
    },
  },
  navbar: {
    home: 'Home',
    openApp: 'Open app',
    login: 'Login',
    register: 'Register',
    admin: 'Admin',
    account: 'Account',
    logout: 'Logout',
    readerNetwork: 'Book exchange',
    exchangeWorkspace: 'My library',
    bookExchangeHome: 'Book Exchange home',
    themeSwitchLabel: 'Switch theme: {{theme}}',
    themeNames: {
      light: 'light',
      dark: 'dark',
    },
  },
  languageSelector: {
    label: 'Language',
    menuLabel: 'Choose language',
    triggerLabel: 'Change language. Current language: {{language}}',
    optionLabel: 'Switch language to {{language}}',
    selectedLabel: 'Selected language',
  },
  authShell: {
    backHomeLabel: 'Back to Book Exchange home',
    readerAccess: 'Reader access',
    exchangeDesk: 'Exchange desk',
    editorialTitle: 'Sign in to manage books, holds, and handoffs.',
    editorialFooter:
      'Sign in once to keep your shelves, holds, and exchanges connected to your reader account.',
    covers: {
      ownedShelf: 'Owned Shelf',
      sharedCopy: 'Shared Copy',
      catalog: 'Catalog',
      exchange: 'Exchange',
      reader: 'Reader',
    },
  },
  appSidebar: {
    eyebrow: 'Workspace',
    heading: 'Exchange shelf',
    description: 'Catalog, holds, transfers, returns, and operations.',
    navigationLabel: 'Application sections',
    navigation: {
      myBooks: {
        label: 'My books',
        hint: 'Owned shelf',
      },
      held: {
        label: 'Held',
        hint: 'Borrowed shelf',
      },
      add: {
        label: 'Add',
        hint: 'Catalog first',
      },
      share: {
        label: 'Share',
        hint: 'Collaborate',
      },
      give: {
        label: 'Give',
        hint: 'Final transfer',
      },
      return: {
        label: 'Return',
        hint: 'Close hold',
      },
    },
    settings: {
      heading: 'Settings',
      label: 'Settings',
      hint: 'Language and session',
      navigationLabel: 'Settings',
      account: {
        label: 'Account',
        hint: 'Profile settings',
      },
    },
  },
  settings: {
    header: {
      eyebrow: 'Settings',
      title: 'Settings',
      description:
        'Manage language, admin tools, and your current session.',
    },
    signedInAs: {
      label: 'Signed in as',
    },
    admin: {
      title: 'Admin',
      subtitle: 'Operations',
      description: 'Open operational recovery tools for the exchange catalog.',
      open: 'Open admin panel',
    },
    language: {
      title: 'Language',
      description: 'Change the interface language immediately.',
    },
    logout: {
      title: 'Logout',
      description: 'End this session and return to the landing page.',
      action: 'Logout',
    },
    loadingProfile: 'Loading account permissions.',
    errors: {
      loadProfile: 'Unable to load account permissions. Please try again.',
      profileStatusTitle: 'Could not load account permissions',
    },
    toasts: {
      profileLoadError: {
        title: 'Could not load account permissions',
      },
    },
  },
  landing: {
    hero: {
      eyebrow: 'Exchange books with other people',
      title: 'Book Exchange',
      description:
        'Add your books, share them, give them to other users, and keep track of returns.',
      openShelf: 'Open my books',
      addBook: 'Add book',
      stats: {
        catalog: {
          label: 'Catalog search',
          value: 'Find the book first, then add it.',
        },
        flows: {
          label: 'Simple actions',
          value: 'Share, give, or return a book.',
        },
        admin: {
          label: 'Admin tools',
          value: 'Control books and active exchanges.',
        },
      },
    },
    preview: {
      ariaLabel: 'Book Exchange catalog preview',
      eyebrow: 'Library example',
      title: 'All books in one place',
      badge: 'Preview',
      requestTitle: 'Share request',
      requestDescription:
        'The book "Maps of Quiet Cities" is with another user until Sunday.',
    },
    story: {
      eyebrow: 'Exchange in motion',
      title: 'A book moves with memory.',
      description:
        'Follow one physical copy from catalog entry to temporary share, permanent handoff, and return.',
      visualLabel: 'Procedural book exchange visualization',
      stagesLabel: 'Scroll story stages',
      assistiveListLabel: 'Book Exchange story stages',
      progressLabel: 'Current stage',
      fallbackTitle: 'The exchange stays readable.',
      fallbackDescription:
        'This static version keeps the same four book movements when animation is unavailable.',
      fallbackReasons: {
        reducedMotion:
          'Motion reduction is on, so the animated story is shown as static content.',
        webgl:
          'WebGL is unavailable in this browser, so a static book scene is shown.',
        weakDevice:
          'This device is using the lighter static story for stability.',
        loading: 'Loading the procedural book scene.',
        error:
          'The animated scene could not load, so the static story is shown.',
        notMounted: 'The animated scene will load as this section enters view.',
      },
      stages: {
        add: {
          title: 'Add',
          description:
            'The book rises from the catalog and opens as an owned copy enters the shelf.',
        },
        share: {
          title: 'Share',
          description:
            'A temporary copy travels to another reader while the original record stays with its owner.',
        },
        give: {
          title: 'Give',
          description:
            'The physical book moves to owner B when the exchange becomes permanent.',
        },
        return: {
          title: 'Return',
          description:
            'The book comes back to owner A, closes, and the exchange is resolved.',
        },
      },
    },
    workflow: {
      eyebrow: 'How it works',
      title: 'All book actions in one place.',
      description:
        'Add books, share them, give them to other users, and mark returns.',
      items: {
        add: {
          title: 'Find or add a book',
          description:
            'Find a book in the catalog or add it manually.',
        },
        share: {
          title: 'Share a book',
          description:
            'Let another user use a book for a while.',
        },
        give: {
          title: 'Give a book',
          description:
            'Give a book to another user permanently.',
        },
        return: {
          title: 'Return a book',
          description:
            'Close the exchange when the book comes back to its owner.',
        },
      },
    },
    catalog: {
      eyebrow: 'Catalog',
      title: 'The important details are easy to see.',
      description:
        'Each book card shows the title, author, owner, and current status.',
      benefits: {
        cards:
          'Book-first catalog cards with title, author, owner, status, and notes.',
        flows:
          'Separate flows for sharing, giving, returning, and admin recovery.',
        shell:
          'A compact app shell that works across phone, tablet, and desktop layouts.',
      },
      contextLabel: 'Catalog',
    },
    featuredBooks: {
      'bk-aurora': {
        genre: 'Fiction',
        note: 'Ready to share this week',
      },
      'bk-map': {
        genre: 'Travel',
        note: 'With another user until Sunday',
      },
      'bk-craft': {
        genre: 'Technology',
        note: 'Shared with another user',
      },
    },
    footer: {
      description: 'A convenient service for exchanging books with other users.',
      serviceRepo: 'Repository',
      qualityChecks: 'Checks',
    },
  },
  login: {
    title: 'Login',
    description:
      'Use your email and password to continue to your exchange workspace.',
    email: 'Email',
    password: 'Password',
    errorTitle: 'Could not sign in',
    signingIn: 'Signing in...',
    newHere: 'New here?',
  },
  register: {
    title: 'Create account',
    description:
      'Create your reader account to start cataloging and exchanging books.',
    name: 'Name',
    email: 'Email',
    password: 'Password',
    errorTitle: 'Could not create account',
    creating: 'Creating account...',
    alreadyRegistered: 'Already registered?',
    success: 'Account created. You can now sign in.',
    fallbackError: 'Unable to create the account. Please try again.',
  },
  dashboard: {
    actionsLabel: 'Book workflows',
    cards: {
      add: {
        title: 'Add a book',
        description: 'Search the catalog first or add a missing title manually.',
      },
      share: {
        title: 'Share a book',
        description: 'Send an owned book to another reader by email.',
      },
      give: {
        title: 'Give a book',
        description:
          'Move ownership when a copy should permanently transfer.',
      },
      return: {
        title: 'Return a book',
        description:
          'Close an active hold and return a borrowed book to its owner.',
      },
    },
  },
  myBooks: {
    header: {
      eyebrow: 'My library desk',
      title: 'My books',
      description:
        'Your owned shelf is the working center for sharing, giving, and catalog upkeep.',
      ownedBooks: '{{count}} owned books',
      ownedBooksLabel: 'owned books',
    },
    metrics: {
      total: 'Total shelf',
      available: 'Available',
      inMotion: 'In motion',
    },
    loading: 'Loading owned books',
    error: {
      fallback: 'Unable to load your books. Please try again.',
      toastTitle: 'Could not load your books',
      eyebrow: 'Books unavailable',
      title: 'Could not load books',
    },
    empty: {
      eyebrow: 'Empty shelf',
      title: 'Add your first exchange copy',
      description:
        'Start with catalog search so your book enters the exchange with the richest available details.',
    },
    catalog: {
      eyebrow: 'Owned catalog',
      title: 'Current shelf',
      contextLabel: 'Owned copy',
      loaded: 'Owned books loaded.',
    },
  },
  heldBooks: {
    header: {
      eyebrow: 'Borrowed shelf',
      title: 'Held books',
      description:
        'Track the books currently in your care and close a hold when a copy goes back to its owner.',
      heldBooks: '{{count}} held books',
      heldBooksLabel: 'held books',
    },
    loading: 'Loading held books',
    error: {
      fallback: 'Unable to load held books. Please try again.',
      toastTitle: 'Could not load held books',
      eyebrow: 'Held books unavailable',
      title: 'Could not load held books',
    },
    empty: {
      eyebrow: 'No active holds',
      title: 'Your borrowed shelf is clear',
      description:
        'Books shared or given to your account will appear here with their owner and status details.',
    },
    catalog: {
      eyebrow: 'Borrowed catalog',
      title: 'Active holds',
      contextLabel: 'Held copy',
      loaded: 'Held books loaded.',
    },
    aside: {
      eyebrow: 'Return rhythm',
      title: 'Close holds promptly',
      description:
        'Use the return workflow when the borrowed copy goes back to its owner. The return is checked against your borrowed shelf.',
    },
  },
  addBook: {
    errors: {
      fallback: 'Unable to add this book. Please try again.',
      required: 'Title and author are required.',
    },
    toasts: {
      achievement: {
        title: 'Achievement unlocked',
        message: 'First book added',
      },
      searchError: 'Could not search catalog',
      detailsNeeded: 'Add title and author',
      added: 'Book added',
      addError: 'Could not add book',
      catalogAddError: 'Could not add catalog book',
    },
    messages: {
      addedToShelf: '{{title}} by {{author}} is now on your owned shelf.',
      catalogAddedToShelf: '{{title}} by {{author}} is on your owned shelf.',
    },
    header: {
      eyebrow: 'Catalog entry',
      title: 'Add book',
      description:
        'Search the shared catalog first. Manual entry stays available when a title is missing from the index.',
    },
    catalog: {
      eyebrow: 'Primary path',
      title: 'Search the exchange catalog',
      description:
        'Results update after a short pause while you type. Add from here to preserve catalog metadata and keep shelves consistent.',
      behaviorTitle: 'Catalog behavior',
      behaviorDescription:
        'Search waits briefly while you type. Use Show more to browse the rest of the catalog.',
      searchLabel: 'Search by title or author',
      help: 'Type at least two characters to filter the catalog.',
      addedTitle: 'Catalog book added',
      loading: 'Loading catalog books.',
      noMatchesTitle: 'No catalog matches',
      noMatchesDescription:
        'No catalog books matched this search. Manual adding is available below as a secondary fallback.',
      resultsTitle: 'Catalog books',
      matchingTitle: 'Matching catalog books',
      showing: 'Showing {{shown}} of {{total}}',
      isbn: 'ISBN {{isbn}}',
      alreadyOwned: 'Already in my books',
      adding: 'Adding...',
      addToMine: 'Add to my books',
    },
    manual: {
      eyebrow: 'Secondary fallback',
      title: 'Add manually',
      description:
        "Can't find your book? Add a real title that is missing from the shared catalog.",
      successTitle: 'Book added successfully',
    },
  },
  shareBook: {
    steps: {
      name: {
        title: 'Name the owned copy',
        description: 'Use the title exactly as it appears on your shelf.',
      },
      reader: {
        title: 'Choose the reader',
        description:
          'Enter the recipient email so the exchange can create the hold.',
      },
      collaborative: {
        title: 'Keep it collaborative',
        description:
          'The book remains part of the exchange while it is shared.',
      },
    },
    errors: {
      fallback: 'Unable to share this book. Please try again.',
      required: 'Title and target user email are required.',
    },
    toasts: {
      detailsNeeded: 'Share details needed',
      shared: 'Book shared',
      shareError: 'Could not share book',
    },
    messages: {
      sharedWith: '{{title}} was shared with {{username}}.',
      lastShared: 'Last shared: {{title}} to {{username}}.',
    },
    header: {
      eyebrow: 'Share workflow',
      title: 'Share book',
      description:
        'Create a collaborative handoff by pairing one owned title with another reader account.',
    },
    form: {
      eyebrow: 'Collaborative exchange',
      title: 'Send a readable copy',
      description:
        'Sharing is a temporary exchange state, not a final transfer of ownership.',
      note:
        'The recipient email connects this action to a real user account.',
      bookTitle: 'Book title',
      targetEmail: 'Target user email',
      successTitle: 'Book shared successfully',
      submitting: 'Sharing...',
    },
    aside: {
      eyebrow: 'Workflow',
      title: 'How sharing works',
    },
  },
  giveBook: {
    steps: {
      verify: {
        title: 'Verify the title',
        description:
          'Use the exact owned title that should leave your shelf.',
      },
      recipient: {
        title: 'Confirm recipient',
        description:
          'The target email receives ownership after the transfer is confirmed.',
      },
      submit: {
        title: 'Submit final transfer',
        description: 'This is intentionally more serious than a shared hold.',
      },
    },
    errors: {
      fallback: 'Unable to give this book. Please try again.',
      required: 'Title and target user email are required.',
    },
    toasts: {
      detailsNeeded: 'Give details needed',
      given: 'Book given',
      giveError: 'Could not give book',
    },
    messages: {
      givenTo: '{{title}} was given to {{username}}.',
      lastGiven: 'Last given: {{title}} to {{username}}.',
    },
    header: {
      eyebrow: 'Ownership transfer',
      title: 'Give book',
      description:
        'Move a copy from your owned shelf to another reader as a final transfer.',
    },
    form: {
      eyebrow: 'Final transfer',
      title: 'Confirm ownership move',
      description: 'Giving changes ownership after the transfer is confirmed.',
      warningTitle: 'Ownership moves',
      warning:
        'Check the title and recipient email before submitting this transfer.',
      bookTitle: 'Book title',
      targetEmail: 'Target user email',
      successTitle: 'Book given successfully',
      submitting: 'Giving...',
    },
    aside: {
      eyebrow: 'Transfer checks',
      title: 'Before you give',
    },
  },
  returnBook: {
    steps: {
      choose: {
        title: 'Choose from held books',
        description: 'Select one borrowed book from your current held shelf.',
      },
      review: {
        title: 'Review the copy',
        description: 'Check the title and author before closing the hold.',
      },
      confirm: {
        title: 'Confirm return',
        description: 'Confirm the book is back with its owner.',
      },
    },
    errors: {
      fallback: 'Unable to return this book. Please try again.',
      choose: 'Choose a borrowed book to return.',
      confirm: 'Confirm that the book is back with its owner.',
    },
    toasts: {
      loadError: 'Could not load held books',
      chooseBook: 'Choose a book',
      confirmReturn: 'Confirm return',
      returned: 'Book returned',
      returnError: 'Could not return book',
    },
    messages: {
      returnedToOwner:
        '{{title}} by {{author}} was returned to its owner.',
      selected:
        '{{title}} by {{author}} will be returned to its owner.',
      lastReturned: 'Last returned: {{title}} by {{author}}.',
    },
    header: {
      eyebrow: 'Return workflow',
      title: 'Return book',
      description:
        'Close an active hold when a borrowed copy goes back to its owner.',
    },
    form: {
      eyebrow: 'Close a hold',
      title: 'Choose a borrowed book',
      description:
        'Select a borrowed book from your held shelf, review the details, and confirm the return.',
      loading: 'Loading borrowed books',
      noBooksTitle: 'No borrowed books',
      noBooksDescription:
        'Your held shelf is clear. There is nothing to return right now.',
      chooseLegend: 'Choose a borrowed book',
      ownerLine: 'Owner: {{owner}}',
      selectedTitle: 'Selected return',
      confirmLabel:
        'I confirm this book is back with its owner and this hold can be closed.',
      submitting: 'Returning...',
    },
    aside: {
      eyebrow: 'Hold closure',
      title: 'Return sequence',
    },
  },
  profile: {
    header: {
      eyebrow: 'Account',
      title: 'Profile',
      description:
        'Manage the reader identity used across owned books, held copies, and exchange actions.',
    },
    errors: {
      loadFallback: 'Unable to load your profile. Please try again.',
      updateFallback: 'Unable to update your profile. Please try again.',
      emptyName: 'Name cannot be empty.',
      unavailable: 'Profile unavailable',
      loadTitle: 'Could not load profile',
      saveTitle: 'Could not save profile',
      nameRequired: 'Name required',
    },
    toasts: {
      savedTitle: 'Profile saved',
      savedMessage: 'Your reader name was updated.',
    },
    loading: 'Loading profile.',
    details: {
      signedInReader: 'Signed-in reader',
      avatarAlt: '{{name}} avatar',
      ownedBooks: 'Owned books',
      heldBooks: 'Held books',
      achievements: 'Achievements',
      editIdentity: 'Edit identity',
      readerName: 'Reader name',
      nameAppears: 'This name appears across your account surfaces.',
      name: 'Name',
      saving: 'Saving...',
      savedMessage: 'Profile updated successfully.',
    },
    achievements: {
      profileReady: 'Profile ready',
      firstBookAdded: 'First book added',
      addFirstBook: 'Add your first book',
      exchangeReady: 'Exchange ready',
    },
  },
  admin: {
    status: {
      withOwner: 'With owner',
      borrowed: 'Borrowed',
    },
    errors: {
      loadFallback: 'Unable to load admin books. Please try again.',
      forceFallback: 'Unable to force return this book. Please try again.',
      loadTitle: 'Could not load admin books',
      actionTitle: 'Could not force return book',
    },
    toasts: {
      noActionTitle: 'No action needed',
      forceCompleteTitle: 'Force return complete',
    },
    messages: {
      alreadyWithOwner: '{{title}} is already with its owner.',
      returnedToOwner: '{{title}} was returned to its owner.',
      forceReturnLabel: 'Force return {{title}}',
    },
    header: {
      eyebrow: 'Admin operations',
      title: 'Admin panel',
      description:
        'Monitor inventory and force borrowed copies back to their owners when an operational recovery is needed.',
    },
    metrics: {
      totalBooks: 'Total books',
      inventoryReady: 'Inventory ready',
      borrowed: 'Borrowed',
      onLoan: 'On loan',
      withOwner: 'With owner',
      atHome: 'At home',
    },
    loading: 'Loading admin books.',
    empty: {
      eyebrow: 'Empty catalog',
      title: 'No books found',
      description:
        'Books will appear here once the exchange catalog has items.',
    },
    table: {
      eyebrow: 'Inventory',
      title: 'Book operations table',
      caption:
        'Admin book inventory with owner, holder, status, and force return actions.',
      noAction: 'No action needed',
      forceReturn: 'Force return',
      returning: 'Returning...',
    },
    unavailable: 'Admin books unavailable',
  },
  components: {
    stateMessage: {
      labels: {
        success: 'Success',
        warning: 'Warning',
        error: 'Error',
        info: 'Notice',
      },
    },
    bookCard: {
      context: {
        owner: 'Owner',
        genre: 'Genre',
      },
    },
    dashboardCard: {
      openWorkflow: 'Open',
    },
    bookCover: {
      fallbackInitials: 'BE',
    },
  },
  api: {
    auth: {
      invalidCredentials:
        'Email or password is incorrect. Please try again.',
      backendUnavailable:
        'The book service is unavailable right now. Please try again shortly.',
      unknown: 'Unable to sign in. Please try again.',
    },
    profile: {
      missingCredentials:
        'Saved sign-in details are missing. Please sign in again.',
      requiredName: 'Profile name is required.',
      readField: 'Could not read profile {{field}}. Please try again.',
      avatar: 'Could not read your profile avatar. Please try again.',
      details: 'Could not load profile details. Please try again.',
    },
    register: {
      success: 'Successfully registered, your email is your username',
      generic:
        'Unable to create the account. Please check your details and try again.',
      backendUnavailable:
        'The book service is unavailable right now. Please try again shortly.',
    },
    books: {
      missingCredentials:
        'Saved sign-in details are missing. Please sign in again.',
      addedBookUnread: 'We could not read the added book. Please try again.',
      signInAgainAction: 'Please sign in again to continue {{action}}.',
      actionIncomplete: '{{action}} could not be completed. Please try again.',
      loadResponse: 'Could not load {{name}}. Please try again.',
      loadAdminBooks: 'Could not load admin books. Please try again.',
      readAdminBook:
        'Could not read admin book {{index}}. Please refresh and try again.',
      untitled: 'Untitled book',
      unknownAuthor: 'Unknown author',
      general: 'General',
      noDescription: 'No description provided yet',
      readAdminField:
        'Could not read {{field}} for admin book {{index}}. Please refresh and try again.',
      signInAgain: 'Please sign in again to continue.',
      adminRequired:
        'Admin access is required for this action. Sign in with an administrator account.',
      chooseForceReturn: 'Choose a book before forcing a return.',
      forceReturnConfirm:
        'Force return could not be confirmed. Please refresh and try again.',
    },
    catalog: {
      duplicate: 'You have already added this catalog book',
      readField:
        'Could not read {{field}} for {{name}}. Please try again.',
      load: 'Could not load catalog books. Please try again.',
      readBook:
        'Could not read catalog book {{index}}. Please refresh and try again.',
      general: 'General',
      noDescription: 'No description provided.',
      readAdded:
        'We could not read the added catalog book. Please try again.',
      idRequired: 'Catalog book id is required.',
      addFallback: 'Unable to add this catalog book. Please try again.',
    },
  },
} as const

export default en
