import Link from "next/link";
import Image from 'next/image';


export function Header(){
    return(
        <header className="flex px-2 py-2 bg-vivoPurple text-white">
        <link rel="jpg" href="/entity" type="image/x-icon"></link>
        <div className="flex items-center justify-between w-full mx-auto max-w-7x1">
            
            <div>
                Menu
            </div>
        </div>

        <nav>
            <ul className="flex items-center justify-center gap-2">
                <li>
                    <Image src="/entity.jpg" alt="Logo" width={50} height={50} className="round-image"/>
                </li>
                <li>
                    <Link href='/'>
                    Home
                    </Link>
                </li>
                <li>
                    <Link href='/contatos'>
                    Contatos
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
    )
}

