type Props = {
  size: number;
  color: string;
};

export default function WorkhourAddIcon({ size, color }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-alarm-plus'
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
      <path d='M12 13m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0' />
      <path d='M7 4l-2.75 2' />
      <path d='M17 4l2.75 2' />
      <path d='M10 13h4' />
      <path d='M12 11v4' />
    </svg>
  );
}
