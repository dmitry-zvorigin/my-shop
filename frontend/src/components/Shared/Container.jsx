import clsx from 'clsx';

export default function Container({
  className,
  fluid = false,      // true — тянется на всю ширину, без max
  size = '2xl',       // sm md lg xl 2xl 3xl и т.п.
  padded = true,      // горизонтальные паддинги
  children,
  ...props
}) {
  const maxBySize = {
    sm:  'max-w-screen-sm',
    md:  'max-w-screen-md',
    lg:  'max-w-screen-lg',
    xl:  'max-w-screen-xl',
    '2xl':'max-w-screen-2xl',
    '3xl':'max-w-[1400px]',
  };

  return (
    <div
      className={clsx(
        fluid ? 'w-full' : clsx('mx-auto w-full', maxBySize[size]),
        padded && 'px-4 sm:px-6 lg:px-8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}