import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react'
import { useTranslation } from 'react-i18next'

import { changeAppLanguage } from '../i18n/i18n'
import {
  defaultLanguage,
  getLanguageMetadata,
  isSupportedLanguage,
  languages,
  type SupportedLanguage,
} from '../i18n/languages'

type LanguageSelectorProps = {
  className?: string
  menuPlacement?: 'bottom-end' | 'top-end'
}

function GlobeIcon() {
  return (
    <svg
      className="language-selector__icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 0 20" />
      <path d="M12 2a15.3 15.3 0 0 0 0 20" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      className="language-selector__check"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  )
}

function getCurrentLanguage(language: string | undefined) {
  return isSupportedLanguage(language) ? language : defaultLanguage
}

export function LanguageSelector({
  className,
  menuPlacement = 'bottom-end',
}: LanguageSelectorProps) {
  const { i18n, t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const menuId = useId()
  const selectorRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([])
  const currentLanguage = getCurrentLanguage(i18n.resolvedLanguage ?? i18n.language)
  const activeLanguage = getLanguageMetadata(currentLanguage)

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target

      if (
        target instanceof Node &&
        selectorRef.current &&
        !selectorRef.current.contains(target)
      ) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const focusOption = (index: number) => {
    optionRefs.current[index]?.focus()
  }

  const openAndFocusOption = (index: number) => {
    setIsOpen(true)
    window.setTimeout(() => focusOption(index), 0)
  }

  const handleTriggerKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
  ) => {
    const activeIndex = Math.max(
      languages.findIndex(({ code }) => code === currentLanguage),
      0,
    )

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      openAndFocusOption(activeIndex)
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      openAndFocusOption(languages.length - 1)
    }
  }

  const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const activeElementIndex = optionRefs.current.findIndex(
      (option) => option === document.activeElement,
    )

    if (event.key === 'Escape') {
      event.preventDefault()
      setIsOpen(false)
      triggerRef.current?.focus()
      return
    }

    if (event.key === 'Home') {
      event.preventDefault()
      focusOption(0)
      return
    }

    if (event.key === 'End') {
      event.preventDefault()
      focusOption(languages.length - 1)
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      focusOption((activeElementIndex + 1) % languages.length)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      focusOption(
        (activeElementIndex - 1 + languages.length) % languages.length,
      )
    }
  }

  const handleLanguageChange = (language: SupportedLanguage) => {
    if (language !== currentLanguage) {
      void changeAppLanguage(language)
    }

    setIsOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <div
      className={['language-selector', className].filter(Boolean).join(' ')}
      ref={selectorRef}
      data-menu-placement={menuPlacement}
    >
      <button
        ref={triggerRef}
        type="button"
        className="language-selector__trigger"
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={handleTriggerKeyDown}
        aria-label={t('languageSelector.triggerLabel', {
          language: activeLanguage.name,
        })}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={isOpen ? menuId : undefined}
        title={t('languageSelector.label')}
        data-open={isOpen}
      >
        <GlobeIcon />
        <span className="language-selector__compact-label">
          {activeLanguage.compactLabel}
        </span>
      </button>

      {isOpen ? (
        <div
          id={menuId}
          className="language-selector__menu"
          role="menu"
          aria-label={t('languageSelector.menuLabel')}
          onKeyDown={handleMenuKeyDown}
        >
          {languages.map((language, index) => {
            const isSelected = language.code === currentLanguage

            return (
              <button
                key={language.code}
                ref={(element) => {
                  optionRefs.current[index] = element
                }}
                type="button"
                className="language-selector__option"
                onClick={() => handleLanguageChange(language.code)}
                role="menuitemradio"
                aria-checked={isSelected}
                aria-label={t('languageSelector.optionLabel', {
                  language: language.name,
                })}
                data-selected={isSelected}
              >
                <span className="language-selector__check-slot">
                  {isSelected ? <CheckIcon /> : null}
                </span>
                <span className="language-selector__option-name">
                  {language.name}
                </span>
                <span className="language-selector__option-code">
                  {language.compactLabel}
                </span>
                {isSelected ? (
                  <span className="sr-only">
                    {t('languageSelector.selectedLabel')}
                  </span>
                ) : null}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
