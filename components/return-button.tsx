import React from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';

interface ReturnButtonPros {
  href: string;
  label: string;
}

const ReturnButton = ({ href, label }: ReturnButtonPros) => {
  return (
    <Button size={"sm"} asChild>
      <Link href={href}>
        <ArrowLeftIcon />{label}
      </Link>
    </Button>
  )
}

export default ReturnButton
