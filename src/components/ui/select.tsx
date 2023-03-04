import { cn } from '@/lib/utils'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as SelectPrimitive from '@radix-ui/react-select'
import { forwardRef, Fragment, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'

export const SelectContent = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ children, className, ...props }, ref) => (
  <SelectPrimitive.Content
    ref={ref}
    {...props}
    className={cn(
      `min-w-[180px] overflow-hidden rounded-md bg-white p-1 shadow-md ring-1 ring-neutral-300
      dark:bg-black
      dark:ring-neutral-700`,
      className
    )}
  >
    {children}
  </SelectPrimitive.Content>
))

SelectContent.displayName = 'SelectContent'

export const SelectViewport = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Viewport>
>(({ children, className, ...props }, ref) => (
  <SelectPrimitive.Viewport ref={ref} {...props} className={cn('p-1', className)}>
    {children}
  </SelectPrimitive.Viewport>
))

SelectViewport.displayName = 'SelectViewport'

export const SelectItem = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, className, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    {...props}
    className={cn(
      `relative flex cursor-pointer select-none items-center rounded-md p-2 pl-6 text-neutral-900 outline-none
      data-[disabled]:pointer-events-none
      data-[highlighted]:bg-neutral-50
      data-[disabled]:text-neutral-700
      data-[highlighted]:text-neutral-900
      data-[highlighted]:ring-1
      data-[highlighted]:ring-neutral-500
      dark:text-neutral-200
      dark:data-[highlighted]:bg-neutral-900
      dark:data-[disabled]:text-neutral-400
      dark:data-[highlighted]:text-neutral-100
      dark:data-[highlighted]:ring-neutral-600
      md:py-1`,
      className
    )}
  >
    {children}
  </SelectPrimitive.Item>
))

SelectItem.displayName = 'SelectItem'

export const SelectLabel = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ children, className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    {...props}
    className={cn('mb-1 pl-2 pt-1 text-neutral-700 dark:text-neutral-400', className)}
  >
    {children}
  </SelectPrimitive.Label>
))

SelectLabel.displayName = 'SelectLabel'

export const SelectSeparator = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ children, className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    {...props}
    className={cn('my-1.5 h-px bg-neutral-300 dark:bg-neutral-700', className)}
  >
    {children}
  </SelectPrimitive.Separator>
))

SelectSeparator.displayName = 'SelectSeparator'

export const SelectItemIndicator = forwardRef<
  React.ElementRef<typeof SelectPrimitive.ItemIndicator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ItemIndicator>
>(({ children, className, ...props }, ref) => (
  <SelectPrimitive.ItemIndicator
    ref={ref}
    {...props}
    className={cn('absolute left-0 inline-flex w-6 items-center justify-center', className)}
  >
    {children}
  </SelectPrimitive.ItemIndicator>
))

SelectItemIndicator.displayName = 'SelectItemIndicator'

export const SelectScrollUpButton = forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ children, className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    {...props}
    className={cn(
      'flex cursor-default items-center justify-center rounded-t-md bg-white py-0.5 dark:bg-black',
      className
    )}
  >
    {children}
  </SelectPrimitive.ScrollUpButton>
))

SelectScrollUpButton.displayName = 'SelectScrollUpButton'

export const SelectScrollDownButton = forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ children, className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    {...props}
    className={cn(
      'flex cursor-default items-center justify-center rounded-b-md bg-white py-0.5 dark:bg-black',
      className
    )}
  >
    {children}
  </SelectPrimitive.ScrollDownButton>
))

SelectScrollDownButton.displayName = 'SelectScrollDownButton'

export const SelectIcon = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Icon>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Icon>
>(({ children, className, ...props }, ref) => (
  <SelectPrimitive.Icon ref={ref} {...props} className={cn('ml-2', className)}>
    {children}
  </SelectPrimitive.Icon>
))

SelectIcon.displayName = 'SelectIcon'

export type GeneralizedSelectProps = {
  selectValueProps?: SelectPrimitive.SelectValueProps
  disableSeparator?: boolean
  triggerProps?: SelectPrimitive.SelectTriggerProps
  contentProps?: SelectPrimitive.SelectContentProps
  viewportProps?: SelectPrimitive.SelectViewportProps
  separatorProps?: SelectPrimitive.SelectSeparatorProps
  scrollUpButtom?: {
    children?: ReactNode
    props?: SelectPrimitive.SelectScrollUpButtonProps
  }
  scrollDownButtom?: {
    children?: ReactNode
    props?: SelectPrimitive.SelectScrollDownButtonProps
  }
  items: {
    label?: { children?: ReactNode; props?: SelectPrimitive.SelectLabelProps }
    id: string
    items: {
      label?: ReactNode
      props: SelectPrimitive.SelectItemProps
      itemIndicator?: {
        children?: ReactNode
        props?: SelectPrimitive.SelectItemIndicatorProps
      }
    }[]
  }[]
} & SelectPrimitive.SelectProps

export function GeneralizedSelect({
  selectValueProps,
  triggerProps,
  contentProps,
  viewportProps,
  separatorProps,
  disableSeparator,
  scrollUpButtom,
  scrollDownButtom,
  items,
  ...props
}: GeneralizedSelectProps) {
  return (
    <SelectPrimitive.Root {...props}>
      <SelectPrimitive.SelectTrigger asChild {...triggerProps}>
        <Button>
          <SelectPrimitive.Value {...selectValueProps} />
          <SelectIcon>
            <ChevronDownIcon />
          </SelectIcon>
        </Button>
      </SelectPrimitive.SelectTrigger>
      <SelectContent {...contentProps}>
        <SelectScrollUpButton {...scrollUpButtom?.props}>
          {scrollUpButtom?.children || <ChevronUpIcon />}
        </SelectScrollUpButton>
        <SelectViewport {...viewportProps}>
          {items.map(({ label, items, id }, index, arr) => (
            <Fragment key={`select-group-${id}`}>
              <SelectPrimitive.Group>
                {label && <SelectLabel {...label.props}>{label.children}</SelectLabel>}
                {items.map(({ props, label, itemIndicator }) => (
                  <SelectItem key={`select-group-item-${props.value}`} {...props}>
                    <SelectPrimitive.ItemText>{label || props.value}</SelectPrimitive.ItemText>
                    <SelectItemIndicator {...itemIndicator?.props}>
                      {itemIndicator?.children || <CheckIcon />}
                    </SelectItemIndicator>
                  </SelectItem>
                ))}
              </SelectPrimitive.Group>
              {!disableSeparator && index !== arr.length - 1 && (
                <SelectSeparator {...separatorProps} />
              )}
            </Fragment>
          ))}
        </SelectViewport>
        <SelectScrollDownButton {...scrollDownButtom?.props}>
          {scrollDownButtom?.children || <ChevronDownIcon />}
        </SelectScrollDownButton>
      </SelectContent>
    </SelectPrimitive.Root>
  )
}
