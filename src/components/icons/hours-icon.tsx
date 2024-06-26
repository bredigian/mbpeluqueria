type Props = {
  size: number;
  color: string;
};

export default function HoursIcon({ size, color }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-calendar-time'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke={color}
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4' />
      <path d='M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0' />
      <path d='M15 3v4' />
      <path d='M7 3v4' />
      <path d='M3 11h16' />
      <path d='M18 16.496v1.504l1 1' />
    </svg>
  );
}
