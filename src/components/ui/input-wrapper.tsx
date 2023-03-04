import * as React from 'react'

import { cn } from '@/lib/utils'

const InputWrapper = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn('mb-4', className)} ref={ref} {...props}>
        {props.children}
      </div>
    )
  }
)

InputWrapper.displayName = 'InputWrapper'

export { InputWrapper }
