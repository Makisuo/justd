import { tv } from 'tailwind-variants'

const styles = tv({
  slots: {
    box: 'flex justify-around flex-wrap gap-4',
    item: [
      'size-8 sm:size-12 grid cursor-pointer text-fg/80 place-content-center rounded-md',
      'focus:bg-primary focus:text-primary-fg focus:outline-none',
      'selected:bg-primary selected:text-primary-fg',
      '[&[data-open=true]]:bg-primary [&[data-open=true]]:text-primary-fg',
      'hover:bg-secondary hover:text-secondary-fg',
      'focus-visible:ring-4 focus-visible:ring-primary-fg/15'
    ]
  }
})

const { item, box } = styles()

export { item, box }
