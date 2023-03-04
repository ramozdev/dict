import * as React from 'react'
import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  `group inline-flex select-none items-center justify-center rounded-md  text-sm font-medium
        ring-1
        ring-neutral-300
        transition
        duration-100
        focus:outline-none
        focus:ring-neutral-500
        focus-visible:ring-neutral-500
        active:ring-neutral-900
        disabled:pointer-events-none
        disabled:text-neutral-700
        disabled:ring-neutral-200 
        data-[state=open]:ring-neutral-400
        data-[state=on]:ring-neutral-400 
        data-[state-delayed=open]:ring-neutral-400
        data-[state-instant=open]:ring-neutral-400
        dark:ring-neutral-800
        dark:focus:ring-neutral-600
        dark:focus-visible:ring-neutral-600 
        dark:active:ring-neutral-500
        dark:disabled:text-neutral-300 
        dark:disabled:ring-neutral-800
        dark:data-[state=open]:ring-neutral-600
        dark:data-[state=on]:ring-neutral-600`,
  {
    variants: {
      variant: {
        default:
          'bg-white text-neutral-900 hover:ring-neutral-500 dark:hover:bg-black dark:hover:ring-neutral-600 dark:bg-black dark:text-neutral-200',
        destructive: 'bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600',
        outline:
          'bg-transparent border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100',
        subtle:
          'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100',
        ghost:
          'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent',
        link: 'bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent'
      },
      size: {
        default: 'px-4 py-2',
        sm: 'h-9 px-2 rounded-md',
        lg: 'h-11 px-8 rounded-md'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
