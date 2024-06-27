import { RedirectType, redirect } from 'next/navigation';

export default function Page() {
  redirect('/', RedirectType.push);
}
