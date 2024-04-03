'use client'
import Image from 'next/image';
function Header() {
    return (
        <>
            <div className="left">
                <a href='/' className='resize-image' >
                    <Image src="/logo.png" alt="" width = {40} height ={40}  />
                    <span>Everland</span>
                </a>
                <a href ='/'>Home</a>
                <a href ='/'>About</a>
                <a href ='/'>Contact</a>
            </div>
            <div className="right">
            </div>
            </>
    
    )

}
export default Header;
