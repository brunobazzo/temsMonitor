import Link from "next/link";

export default function NotFound(){
    return(
      <div className= "flex flex-col items-center justify-center">
        <h1 className="text-center font-bold mt-10  text-6xl">Página 404 não encontrada!</h1>
        <Link href= '/'>
            Voltar para home
        </Link>
      </div>
  
    )
  }