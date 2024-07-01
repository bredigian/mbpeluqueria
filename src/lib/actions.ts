'use server';

import { revalidateTag } from 'next/cache';

export const revalidateDataByTag = (tag: string) => revalidateTag(tag);
