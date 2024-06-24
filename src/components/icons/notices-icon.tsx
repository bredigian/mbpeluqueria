type Props = {
  size: number;
  color: string;
};

export default function NoticesIcon({ size, color }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-message-2-exclamation'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke={color}
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M8 9h8' />
      <path d='M8 13h6' />
      <path d='M15 18l-3 3l-3 -3h-3a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v5.5' />
      <path d='M19 16v3' />
      <path d='M19 22v.01' />
    </svg>
  );
}
