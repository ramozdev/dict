import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      `flex h-6 w-6 items-center justify-center rounded-md bg-white 
        shadow-md
        outline-none
        ring-1
        ring-neutral-300
        transition
        duration-100
        hover:ring-neutral-500
        focus:outline-none
        focus:ring-neutral-500
        focus-visible:ring-neutral-500
        active:ring-neutral-900
        data-[disabled]:pointer-events-none
        data-[disabled]:ring-neutral-200 
        dark:bg-black
        dark:ring-neutral-800
        dark:hover:bg-black
        dark:hover:ring-neutral-600 
        dark:focus:ring-neutral-600
        dark:focus-visible:ring-neutral-600 
        dark:active:ring-neutral-500
        dark:data-[disabled]:ring-neutral-800
        `,
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(
        ` 
      text-neutral-900
      data-[disabled]:text-neutral-700 
      dark:text-neutral-200
      dark:data-[disabled]:text-neutral-300`,
        className
      )}
    >
      <CheckIcon />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
