import logo from '@/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  console.log(logo);
  
  return (
    <header id="main-header">
      <Link href="/">
      {/* If you have a fix size image use width and height but that is not the recommended way. We should use sizes property which helps nextjs resize the image for specific devices  */}
        {/* <Image src={logo} width={100} height={100} alt="Mobile phone with posts feed on it" /> */}
        <Image src={logo} priority sizes="10vw" alt="Mobile phone with posts feed on it" />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/feed">Feed</Link>
          </li>
          <li>
            <Link className='cta-link' href="/new-post">New Post</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
