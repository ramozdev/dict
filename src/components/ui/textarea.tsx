import { cn } from '@/lib/utils'
import * as React from 'react'

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        `appearance-none rounded-md bg-white
            px-4 py-2 text-neutral-900 ring-1
            ring-neutral-300
            transition
            duration-100
            invalid:text-red-900 
            invalid:ring-red-600 
            hover:ring-neutral-500 
            hover:invalid:ring-red-600 
            focus:outline-none 
            focus:ring-neutral-500
            focus:invalid:ring-red-600 
            focus-visible:ring-neutral-500 
            disabled:cursor-not-allowed 
            disabled:bg-neutral-50
            disabled:text-neutral-600 
            disabled:ring-neutral-200 
            dark:bg-black
            dark:text-neutral-200 
            dark:ring-neutral-800 
            dark:[color-scheme:dark] 
            dark:invalid:text-red-300 
            dark:invalid:ring-red-800 
            dark:hover:bg-black 
            dark:hover:ring-neutral-600	
            dark:hover:invalid:ring-red-800 
            dark:focus:ring-neutral-600 
            dark:focus:invalid:ring-red-800 
            dark:focus-visible:ring-neutral-600		
            dark:disabled:bg-neutral-900 
            dark:disabled:text-neutral-300 
            dark:disabled:ring-neutral-800`,
        className
      )}
      ref={ref}
      {...props}
    >
      {props.children}
    </textarea>
  )
})

TextArea.displayName = 'TextArea'

export { TextArea }
