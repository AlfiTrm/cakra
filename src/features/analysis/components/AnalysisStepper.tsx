import type { AnalysisStep } from '../types/analysis'

type AnalysisStepperProps = {
  activeStep?: number
  steps: AnalysisStep[]
}

export function AnalysisStepper({ activeStep = 1, steps }: AnalysisStepperProps) {
  return (
    <ol className="flex flex-col gap-4 md:flex-row md:items-center md:justify-center">
      {steps.map((step, index) => {
        const isActive = step.id === activeStep
        const isComplete = step.id < activeStep

        return (
          <li className="flex items-center gap-4" key={step.id}>
            <div className="flex items-center gap-3">
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-[var(--radius-full)] border text-label-md font-bold ${
                  isComplete
                    ? 'border-[var(--color-success)] bg-[var(--color-success)] text-white shadow-md shadow-[rgb(5_150_105_/_0.22)]'
                    : isActive
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-md shadow-[rgb(45_82_221_/_0.22)]'
                    : 'border-[var(--color-border)] bg-white text-[var(--color-text-muted)]'
                }`}
              >
                {isComplete ? <CheckIcon /> : step.id}
              </span>
              <span
                className={`text-label-md font-bold ${
                  isComplete
                    ? 'text-[var(--color-success)]'
                    : isActive
                    ? 'text-[var(--color-primary)]'
                    : 'text-[var(--color-text-muted)]'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 ? (
              <span
                className={`hidden h-px w-16 border-t md:block ${
                  isComplete ? 'border-[var(--color-success)]' : 'border-dashed border-[var(--color-border)]'
                }`}
              />
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
      <path d="m5 12 4 4L19 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
  )
}
