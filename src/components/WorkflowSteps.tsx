type WorkflowStep = {
  title: string
  description: string
}

type WorkflowStepsProps = {
  steps: WorkflowStep[]
  currentStep?: number
}

export function WorkflowSteps({ steps, currentStep = 1 }: WorkflowStepsProps) {
  return (
    <ol className="grid gap-3">
      {steps.map((step, index) => {
        const stepNumber = index + 1
        const isCurrent = stepNumber === currentStep

        return (
          <li
            key={step.title}
            className={`rounded-[0.65rem] border p-3 ${
              isCurrent
                ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)]'
                : 'border-[var(--color-border)] bg-white'
            }`}
          >
            <div className="flex gap-3">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border text-xs font-bold ${
                  isCurrent
                    ? 'border-[var(--color-accent)] text-[var(--color-accent-strong)]'
                    : 'border-[var(--color-border-strong)] text-[var(--color-muted)]'
                }`}
              >
                {String(stepNumber).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <p className="font-bold text-[var(--color-ink)]">{step.title}</p>
                <p className="mt-1 text-sm leading-5 text-[var(--color-muted)]">
                  {step.description}
                </p>
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
