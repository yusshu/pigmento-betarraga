import Link from 'next/link';
import clsx from 'clsx';

export default function Header({ children, className }) {

  return (
    <header className={clsx('w-full flex flex-col', className)}>

      <div className="w-full flex flex-row justify-between max-w-8xl mx-auto py-4 px-8">
        {/* Logo + Name */}
        <Link href="/">
          <div className="flex flex-row items-center gap-2.5 cursor-pointer">
            <img className="h-[24px]" src="/logo.png" alt="logo"/>
            <span className="leading-normal text-lg text-black">Ing. Industrial</span>
          </div>
        </Link>

        {children}

        {/* Links */}
        <div className="flex-row items-center justify-between gap-12 hidden md:flex">
          <span className="capitalize font-normal text-base text-black/80 hover:text-pink-200 cursor-pointer">Diseño de Plantas</span>
          <span className="capitalize font-normal text-base text-black/80 hover:text-pink-200 cursor-pointer">Grupo 2 Sección B</span>
        </div>
      </div>
    </header>
  );
}