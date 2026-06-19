const zhCN = {
  navbar: {
    home: '首页',
    openApp: '打开应用',
    login: '登录',
    register: '注册',
    admin: '管理',
    account: '账户',
    logout: '退出',
    readerNetwork: '读者网络',
    exchangeWorkspace: '交换工作区',
    bookExchangeHome: 'Book Exchange 主页',
    themeSwitchLabel: '切换主题：{{theme}}',
    themeNames: {
      light: '浅色',
      dark: '深色',
    },
  },
  languageSelector: {
    label: '语言',
    menuLabel: '选择语言',
    triggerLabel: '更改语言。当前语言：{{language}}',
    optionLabel: '切换语言为{{language}}',
    selectedLabel: '已选语言',
  },
  appSidebar: {
    eyebrow: '工作区',
    heading: '交换书架',
    description: '目录、借阅、转让、归还和运营。',
    navigationLabel: '应用分区',
    navigation: {
      myBooks: {
        label: '我的书',
        hint: '自有书架',
      },
      held: {
        label: '持有',
        hint: '借入书架',
      },
      add: {
        label: '添加',
        hint: '先查目录',
      },
      share: {
        label: '共享',
        hint: '协作',
      },
      give: {
        label: '赠予',
        hint: '最终转让',
      },
      return: {
        label: '归还',
        hint: '结束持有',
      },
    },
    account: {
      sectionLabel: '账户控制',
      navigationLabel: '账户链接',
      signedInAs: '当前登录',
      account: '账户',
      accountHint: '个人资料设置',
      admin: '管理',
      adminHint: '运营',
      language: '语言',
      logout: '退出',
      logoutLabel: '退出并返回首页',
    },
  },
} as const

const localizedZhCN = {
  ...zhCN,
  common: {
    appName: 'Book Exchange',
    actions: {
      addBook: '添加图书',
      addManually: '手动添加',
      backToHome: '返回首页',
      browseAll: '浏览全部',
      checkOwnedShelf: '查看我的书架',
      closeNotification: '关闭通知',
      confirmReturn: '确认归还',
      continue: '继续',
      createAccount: '创建账户',
      filtered: '已筛选',
      give: '转赠',
      giveBook: '转赠图书',
      login: '登录',
      openHeldBooks: '打开借阅书架',
      openMyBooks: '打开我的图书',
      openReturnFlow: '打开归还流程',
      openShare: '打开共享',
      openWorkflow: '打开',
      previewShareFlow: '预览共享流程',
      returnBook: '归还图书',
      returnThisTitle: '归还此书',
      saveProfile: '保存资料',
      saving: '正在保存...',
      searchCatalog: '搜索目录',
      share: '共享',
      shareBook: '共享图书',
      showMore: '显示更多',
      tryAgain: '重试',
      viewInApp: '在应用中查看',
      viewMyBooks: '查看我的图书',
    },
    status: {
      active: '已启用',
      available: '可用',
      borrowed: '已借出',
      error: '错误',
      held: '持有中',
      info: '提示',
      pending: '待处理',
      shared: '已共享',
      success: '成功',
      warning: '警告',
      withOwner: '在所有者处',
    },
    bookMeta: {
      action: '操作',
      author: '作者',
      book: '图书',
      genre: '类型',
      holderId: '持有人 ID',
      id: 'ID',
      owner: '所有者',
      ownerId: '所有者 ID',
      role: '角色',
      status: '状态',
      title: '书名',
    },
    placeholders: {
      authorName: '作者姓名',
      bookTitle: '书名',
      effectiveJava: 'Effective Java',
      giveTestBook: 'Give Test Book',
      password: '密码',
      readerEmail: 'reader@example.com',
      readerName: '读者姓名',
      yourName: '你的姓名',
    },
    values: {
      dash: '-',
    },
  },
  navbar: {
    home: '首页',
    openApp: '打开应用',
    login: '登录',
    register: '注册',
    admin: '管理',
    account: '账户',
    logout: '退出',
    readerNetwork: '图书交换',
    exchangeWorkspace: '我的图书馆',
    bookExchangeHome: 'Book Exchange 首页',
    themeSwitchLabel: '切换主题：{{theme}}',
    themeNames: {
      light: '浅色',
      dark: '深色',
    },
  },
  languageSelector: {
    label: '语言',
    menuLabel: '选择语言',
    triggerLabel: '更改语言。当前语言：{{language}}',
    optionLabel: '切换语言为 {{language}}',
    selectedLabel: '已选语言',
  },
  authShell: {
    backHomeLabel: '返回 Book Exchange 首页',
    readerAccess: '读者访问',
    exchangeDesk: '交换台',
    editorialTitle: '登录后管理图书、持有和交接。',
    editorialFooter:
      '登录一次，即可把书架、持有和交换连接到你的读者账户。',
    covers: {
      ownedShelf: '自有书架',
      sharedCopy: '共享副本',
      catalog: '目录',
      exchange: '交换',
      reader: '读者',
    },
  },
  appSidebar: {
    eyebrow: '工作区',
    heading: '交换书架',
    description: '目录、持有、转移、归还和运营。',
    navigationLabel: '应用分区',
    navigation: {
      myBooks: {
        label: '我的图书',
        hint: '自有书架',
      },
      held: {
        label: '持有',
        hint: '借阅书架',
      },
      add: {
        label: '添加',
        hint: '先查目录',
      },
      share: {
        label: '共享',
        hint: '协作',
      },
      give: {
        label: '转赠',
        hint: '最终转移',
      },
      return: {
        label: '归还',
        hint: '关闭持有',
      },
    },
    settings: {
      heading: '设置',
      label: '设置',
      hint: '语言和会话',
      navigationLabel: '设置',
      account: {
        label: '账户',
        hint: '资料设置',
      },
    },
  },
  settings: {
    header: {
      eyebrow: '设置',
      title: '设置',
      description:
        '管理语言、管理员工具和当前会话。',
    },
    signedInAs: {
      label: '登录身份',
    },
    admin: {
      title: '管理',
      subtitle: '运营',
      description: '打开交换目录的运营恢复工具。',
      open: '打开管理面板',
    },
    language: {
      title: '语言',
      description: '立即更改界面语言，无需刷新。',
    },
    logout: {
      title: '退出',
      description: '结束此会话并返回首页。',
      action: '退出',
    },
    loadingProfile: '正在加载账户权限。',
    errors: {
      loadProfile: '无法加载账户权限。请重试。',
      profileStatusTitle: '无法加载账户权限',
    },
    toasts: {
      profileLoadError: {
        title: '无法加载账户权限',
      },
    },
  },
  landing: {
    hero: {
      eyebrow: '和其他人交换图书',
      title: 'Book Exchange',
      description:
        '添加你的图书，分享给别人，转赠给其他用户，并跟踪归还情况。',
      openShelf: '打开我的图书',
      addBook: '添加图书',
      stats: {
        catalog: {
          label: '目录搜索',
          value: '先找到图书，再添加它。',
        },
        flows: {
          label: '简单操作',
          value: '共享、转赠或归还图书。',
        },
        admin: {
          label: '管理员工具',
          value: '管理图书和进行中的交换。',
        },
      },
    },
    preview: {
      ariaLabel: 'Book Exchange 目录预览',
      eyebrow: '图书馆示例',
      title: '所有图书集中管理',
      badge: '预览',
      requestTitle: '共享请求',
      requestDescription:
        '《Maps of Quiet Cities》这本书在另一位用户那里，直到周日。',
    },
    story: {
      eyebrow: '流转中的交换',
      title: '一本书带着路径移动。',
      description:
        '跟随一个实体副本，从加入目录到临时共享、永久转赠，再到归还。',
      visualLabel: '程序化图书交换可视化',
      stagesLabel: '滚动故事阶段',
      assistiveListLabel: 'Book Exchange 故事阶段',
      progressLabel: '当前阶段',
      fallbackTitle: '交换故事仍然可读。',
      fallbackDescription:
        '当动画不可用时，静态版本会保留同样的四个图书动作。',
      fallbackReasons: {
        reducedMotion:
          '已开启减少动态效果，因此故事以静态内容显示。',
        webgl:
          '此浏览器无法使用 WebGL，因此显示静态图书场景。',
        weakDevice:
          '为了保持稳定，此设备使用更轻量的静态故事。',
        loading: '正在加载程序化图书场景。',
        error:
          '动画场景无法加载，因此显示静态故事。',
        notMounted: '当此区域进入视口时，动画场景会开始加载。',
      },
      stages: {
        add: {
          title: '添加',
          description:
            '书从目录中升起并打开，表示所有者将副本加入书架。',
        },
        share: {
          title: '共享',
          description:
            '临时副本移动到另一位读者那里，而原始记录仍留在所有者名下。',
        },
        give: {
          title: '转赠',
          description:
            '当交换变为永久时，实体书移动到所有者 B。',
        },
        return: {
          title: '归还',
          description:
            '书回到所有者 A，合上，交换也随之完成。',
        },
      },
    },
    workflow: {
      eyebrow: '如何使用',
      title: '所有图书操作都在一个地方。',
      description:
        '添加图书、分享图书、转赠给其他用户，并标记归还。',
      items: {
        add: {
          title: '查找或添加图书',
          description:
            '在目录中找到图书，或手动添加。',
        },
        share: {
          title: '共享图书',
          description:
            '把书暂时借给另一位用户。',
        },
        give: {
          title: '转赠图书',
          description:
            '把书永久转给另一位用户。',
        },
        return: {
          title: '归还图书',
          description:
            '当书回到所有者手中时关闭交换。',
        },
      },
    },
    catalog: {
      eyebrow: '目录',
      title: '重要信息一眼可见。',
      description:
        '图书卡片会显示书名、作者、所有者和当前状态。',
      benefits: {
        cards:
          '以图书为中心的卡片，包含书名、作者、所有者、状态和备注。',
        flows:
          '共享、转赠、归还和管理恢复都有独立流程。',
        shell:
          '适配手机、平板和桌面的紧凑应用外壳。',
      },
      contextLabel: '目录',
    },
    featuredBooks: {
      'bk-aurora': {
        genre: '小说',
        note: '本周可以共享',
      },
      'bk-map': {
        genre: '旅行',
        note: '在另一位用户那里，直到周日',
      },
      'bk-craft': {
        genre: '技术',
        note: '已转给另一位用户',
      },
    },
    footer: {
      description:
        '一个方便用户之间交换图书的服务。',
      serviceRepo: '仓库',
      qualityChecks: '检查',
    },
  },
  login: {
    title: '登录',
    description:
      '使用 email 和密码继续进入交换工作区。',
    email: 'Email',
    password: '密码',
    errorTitle: '无法登录',
    signingIn: '正在登录...',
    newHere: '第一次来？',
  },
  register: {
    title: '创建账户',
    description:
      '创建读者账户，开始整理和交换图书。',
    name: '姓名',
    email: 'Email',
    password: '密码',
    errorTitle: '无法创建账户',
    creating: '正在创建账户...',
    alreadyRegistered: '已经注册？',
    success: '账户已创建。现在可以登录。',
    fallbackError: '无法创建账户。请重试。',
  },
  dashboard: {
    actionsLabel: '图书流程',
    cards: {
      add: {
        title: '添加图书',
        description: '先搜索目录，或手动添加缺失书目。',
      },
      share: {
        title: '共享图书',
        description: '通过 email 将自有图书发送给另一位读者。',
      },
      give: {
        title: '转赠图书',
        description: '当副本需要永久转移时变更所有权。',
      },
      return: {
        title: '归还图书',
        description: '关闭活动持有，并把借阅图书归还给所有者。',
      },
    },
  },
  myBooks: {
    header: {
      eyebrow: '我的图书台',
      title: '我的图书',
      description:
        '你的自有书架是共享、转赠和目录维护的工作中心。',
      ownedBooks: '{{count}} 本自有图书',
      ownedBooksLabel: '本自有图书',
    },
    metrics: {
      total: '书架总数',
      available: '可用',
      inMotion: '流转中',
    },
    loading: '正在加载我的图书',
    error: {
      fallback: '无法加载你的图书。请重试。',
      toastTitle: '无法加载你的图书',
      eyebrow: '图书不可用',
      title: '无法加载图书',
    },
    empty: {
      eyebrow: '空书架',
      title: '添加第一本可交换副本',
      description:
        '从目录搜索开始，让图书拥有尽可能丰富的详情。',
    },
    catalog: {
      eyebrow: '自有目录',
      title: '当前书架',
      contextLabel: '自有副本',
      loaded: '我的图书已加载。',
    },
  },
  heldBooks: {
    header: {
      eyebrow: '借阅书架',
      title: '持有图书',
      description:
        '跟踪当前由你保管的图书，并在副本归还所有者后关闭持有。',
      heldBooks: '{{count}} 本持有图书',
      heldBooksLabel: '本持有图书',
    },
    loading: '正在加载持有图书',
    error: {
      fallback: '无法加载持有图书。请重试。',
      toastTitle: '无法加载持有图书',
      eyebrow: '持有图书不可用',
      title: '无法加载持有图书',
    },
    empty: {
      eyebrow: '没有活动持有',
      title: '你的借阅书架是空的',
      description:
        '共享或转赠给你账户的图书会显示在这里，包含所有者和状态。',
    },
    catalog: {
      eyebrow: '借阅目录',
      title: '活动持有',
      contextLabel: '持有副本',
      loaded: '持有图书已加载。',
    },
    aside: {
      eyebrow: '归还节奏',
      title: '及时关闭持有',
      description:
        '当借阅副本回到所有者手中时使用归还流程。归还会与你的借阅书架核对。',
    },
  },
  addBook: {
    errors: {
      fallback: '无法添加此书。请重试。',
      required: '书名和作者为必填项。',
    },
    toasts: {
      achievement: {
        title: '成就已解锁',
        message: '已添加第一本书',
      },
      searchError: '无法搜索目录',
      detailsNeeded: '请填写书名和作者',
      added: '图书已添加',
      addError: '无法添加图书',
      catalogAddError: '无法添加目录图书',
    },
    messages: {
      addedToShelf: '{{title}}（{{author}}）已加入你的自有书架。',
      catalogAddedToShelf: '{{title}}（{{author}}）已在你的自有书架。',
    },
    header: {
      eyebrow: '目录条目',
      title: '添加图书',
      description:
        '先搜索共享目录。若索引中缺少书名，仍可手动录入。',
    },
    catalog: {
      eyebrow: '主要路径',
      title: '搜索交换目录',
      description:
        '输入时结果会短暂延迟后更新。从这里添加可保留目录元数据并保持书架一致。',
      behaviorTitle: '目录行为',
      behaviorDescription:
        '搜索会在你输入时稍作等待。使用“显示更多”浏览目录其余内容。',
      searchLabel: '按书名或作者搜索',
      help: '输入至少两个字符即可筛选目录。',
      addedTitle: '目录图书已添加',
      loading: '正在加载目录图书。',
      noMatchesTitle: '没有目录匹配',
      noMatchesDescription:
        '没有目录图书匹配此搜索。下方仍可手动添加。',
      resultsTitle: '目录图书',
      matchingTitle: '匹配的目录图书',
      showing: '显示 {{shown}} / {{total}}',
      isbn: 'ISBN {{isbn}}',
      alreadyOwned: '已在我的图书中',
      adding: '正在添加...',
      addToMine: '添加到我的图书',
    },
    manual: {
      eyebrow: '备用路径',
      title: '手动添加',
      description:
        '找不到这本书？添加共享目录中缺失的真实书名。',
      successTitle: '图书添加成功',
    },
  },
  shareBook: {
    steps: {
      name: {
        title: '指定自有副本',
        description: '使用与你书架上完全一致的书名。',
      },
      reader: {
        title: '选择读者',
        description: '输入接收者 email，以便交换创建持有。',
      },
      collaborative: {
        title: '保持协作',
        description: '共享期间，图书仍属于交换流程。',
      },
    },
    errors: {
      fallback: '无法共享此书。请重试。',
      required: '书名和目标用户 email 为必填项。',
    },
    toasts: {
      detailsNeeded: '需要共享详情',
      shared: '图书已共享',
      shareError: '无法共享图书',
    },
    messages: {
      sharedWith: '{{title}} 已共享给 {{username}}。',
      lastShared: '上次共享：{{title}} 给 {{username}}。',
    },
    header: {
      eyebrow: '共享流程',
      title: '共享图书',
      description:
        '将一本自有图书与另一位读者账户配对，创建协作交接。',
    },
    form: {
      eyebrow: '协作交换',
      title: '发送可阅读副本',
      description:
        '共享是临时交换状态，不是最终所有权转移。',
      note: '接收者 email 会把此操作连接到真实用户账户。',
      bookTitle: '书名',
      targetEmail: '目标用户 email',
      successTitle: '图书共享成功',
      submitting: '正在共享...',
    },
    aside: {
      eyebrow: '流程',
      title: '共享如何工作',
    },
  },
  giveBook: {
    steps: {
      verify: {
        title: '核对书名',
        description: '使用应离开你书架的准确自有书名。',
      },
      recipient: {
        title: '确认接收者',
        description:
          '确认转赠后，目标 email 将获得所有权。',
      },
      submit: {
        title: '提交最终转赠',
        description: '这比共享持有更正式。',
      },
    },
    errors: {
      fallback: '无法转赠此书。请重试。',
      required: '书名和目标用户 email 为必填项。',
    },
    toasts: {
      detailsNeeded: '需要转赠详情',
      given: '图书已转赠',
      giveError: '无法转赠图书',
    },
    messages: {
      givenTo: '{{title}} 已转赠给 {{username}}。',
      lastGiven: '上次转赠：{{title}} 给 {{username}}。',
    },
    header: {
      eyebrow: '所有权转移',
      title: '转赠图书',
      description:
        '将副本从你的自有书架最终转移给另一位读者。',
    },
    form: {
      eyebrow: '最终转赠',
      title: '确认所有权转移',
      description: '确认后，转赠会改变所有者。',
      warningTitle: '所有权将转移',
      warning: '提交前请核对书名和接收者 email。',
      bookTitle: '书名',
      targetEmail: '目标用户 email',
      successTitle: '图书转赠成功',
      submitting: '正在转赠...',
    },
    aside: {
      eyebrow: '转赠检查',
      title: '转赠之前',
    },
  },
  returnBook: {
    steps: {
      choose: {
        title: '从持有图书中选择',
        description: '从当前借阅书架选择一本借入图书。',
      },
      review: {
        title: '检查副本',
        description: '关闭持有前核对书名和作者。',
      },
      confirm: {
        title: '确认归还',
        description: '确认图书已回到所有者手中。',
      },
    },
    errors: {
      fallback: '无法归还此书。请重试。',
      choose: '请选择一本要归还的借入图书。',
      confirm: '请确认图书已回到所有者手中。',
    },
    toasts: {
      loadError: '无法加载持有图书',
      chooseBook: '选择一本书',
      confirmReturn: '确认归还',
      returned: '图书已归还',
      returnError: '无法归还图书',
    },
    messages: {
      returnedToOwner:
        '{{title}}（{{author}}）已归还给所有者。',
      selected:
        '{{title}}（{{author}}）将归还给所有者。',
      lastReturned: '上次归还：{{title}}（{{author}}）。',
    },
    header: {
      eyebrow: '归还流程',
      title: '归还图书',
      description:
        '当借入副本回到所有者处时关闭活动持有。',
    },
    form: {
      eyebrow: '关闭持有',
      title: '选择借入图书',
      description:
        '从借阅书架选择一本书，核对详情并确认归还。',
      loading: '正在加载借入图书',
      noBooksTitle: '没有借入图书',
      noBooksDescription:
        '你的借阅书架是空的，目前没有需要归还的图书。',
      chooseLegend: '选择借入图书',
      ownerLine: '所有者：{{owner}}',
      selectedTitle: '已选择归还',
      confirmLabel:
        '我确认此书已回到所有者手中，并且可以关闭持有。',
      submitting: '正在归还...',
    },
    aside: {
      eyebrow: '持有关闭',
      title: '归还顺序',
    },
  },
  profile: {
    header: {
      eyebrow: '账户',
      title: '资料',
      description:
        '管理用于自有图书、持有副本和交换操作的读者身份。',
    },
    errors: {
      loadFallback: '无法加载你的资料。请重试。',
      updateFallback: '无法更新你的资料。请重试。',
      emptyName: '姓名不能为空。',
      unavailable: '资料不可用',
      loadTitle: '无法加载资料',
      saveTitle: '无法保存资料',
      nameRequired: '需要姓名',
    },
    toasts: {
      savedTitle: '资料已保存',
      savedMessage: '读者姓名已更新。',
    },
    loading: '正在加载资料。',
    details: {
      signedInReader: '已登录读者',
      avatarAlt: '{{name}} 的头像',
      ownedBooks: '我的图书',
      heldBooks: '持有图书',
      achievements: '成就',
      editIdentity: '编辑身份',
      readerName: '读者姓名',
      nameAppears: '此姓名会显示在你的账户界面中。',
      name: '姓名',
      saving: '正在保存...',
      savedMessage: '资料更新成功。',
    },
    achievements: {
      profileReady: '资料已就绪',
      firstBookAdded: '已添加第一本书',
      addFirstBook: '添加你的第一本书',
      exchangeReady: '交换已就绪',
    },
  },
  admin: {
    status: {
      withOwner: '在所有者处',
      borrowed: '已借出',
    },
    errors: {
      loadFallback: '无法加载管理图书。请重试。',
      forceFallback: '无法强制归还此书。请重试。',
      loadTitle: '无法加载管理图书',
      actionTitle: '无法强制归还图书',
    },
    toasts: {
      noActionTitle: '无需操作',
      forceCompleteTitle: '强制归还完成',
    },
    messages: {
      alreadyWithOwner: '{{title}} 已在所有者处。',
      returnedToOwner: '{{title}} 已归还给所有者。',
      forceReturnLabel: '强制归还 {{title}}',
    },
    header: {
      eyebrow: '管理操作',
      title: '管理面板',
      description:
        '监控库存，并在需要运营恢复时将借出的副本强制归还给所有者。',
    },
    metrics: {
      totalBooks: '图书总数',
      inventoryReady: '库存就绪',
      borrowed: '已借出',
      onLoan: '借出中',
      withOwner: '在所有者处',
      atHome: '在本处',
    },
    loading: '正在加载管理图书。',
    empty: {
      eyebrow: '空目录',
      title: '未找到图书',
      description: '交换目录有条目后，图书会显示在这里。',
    },
    table: {
      eyebrow: '库存',
      title: '图书操作表',
      caption:
        '管理图书库存，包含所有者、持有人、状态和强制归还操作。',
      noAction: '无需操作',
      forceReturn: '强制归还',
      returning: '正在归还...',
    },
    unavailable: '管理图书不可用',
  },
  components: {
    stateMessage: {
      labels: {
        success: '成功',
        warning: '警告',
        error: '错误',
        info: '提示',
      },
    },
    bookCard: {
      context: {
        owner: '所有者',
        genre: '类型',
      },
    },
    dashboardCard: {
      openWorkflow: '打开',
    },
    bookCover: {
      fallbackInitials: 'BE',
    },
  },
  api: {
    auth: {
      invalidCredentials: 'Email 或密码不正确。请重试。',
      backendUnavailable:
        '图书服务当前不可用。请稍后再试。',
      unknown: '无法登录。请重试。',
    },
    profile: {
      missingCredentials: '缺少已保存的登录信息。请重新登录。',
      requiredName: '资料姓名为必填项。',
      readField: '无法读取资料字段 {{field}}。请重试。',
      avatar: '无法读取你的资料头像。请重试。',
      details: '无法加载资料详情。请重试。',
    },
    register: {
      success: '注册成功，你的 email 就是用户名',
      generic:
        '无法创建账户。请检查信息后重试。',
      backendUnavailable:
        '图书服务当前不可用。请稍后再试。',
    },
    books: {
      missingCredentials: '缺少已保存的登录信息。请重新登录。',
      addedBookUnread: '无法读取已添加的图书。请重试。',
      signInAgainAction: '请重新登录以继续：{{action}}。',
      actionIncomplete: '{{action}} 未能完成。请重试。',
      loadResponse: '无法加载 {{name}}。请重试。',
      loadAdminBooks: '无法加载管理图书。请重试。',
      readAdminBook:
        '无法读取第 {{index}} 本管理图书。请刷新后重试。',
      untitled: '未命名图书',
      unknownAuthor: '未知作者',
      general: '通用',
      noDescription: '尚未提供描述',
      readAdminField:
        '无法读取第 {{index}} 本管理图书的 {{field}}。请刷新后重试。',
      signInAgain: '请重新登录以继续。',
      adminRequired:
        '此操作需要管理员权限。请使用管理员账户登录。',
      chooseForceReturn: '强制归还前请选择一本书。',
      forceReturnConfirm:
        '无法确认强制归还。请刷新后重试。',
    },
    catalog: {
      duplicate: '你已经添加过这本目录图书',
      readField: '无法读取 {{name}} 的 {{field}}。请重试。',
      load: '无法加载目录图书。请重试。',
      readBook:
        '无法读取第 {{index}} 本目录图书。请刷新后重试。',
      general: '通用',
      noDescription: '尚未提供描述。',
      readAdded:
        '无法读取已添加的目录图书。请重试。',
      idRequired: '目录图书 ID 为必填项。',
      addFallback: '无法添加此目录图书。请重试。',
    },
  },
} as const

export default localizedZhCN
