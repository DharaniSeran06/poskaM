import Image from 'next/image';
import Link from 'next/link';

const Logo: React.FC = () => {

  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/images/logo.png"
        alt="POSKA MANOLITO AG Logo"
        width={180}
        height={60}
        style={{ width: 'auto', height: 'auto', maxHeight: '60px' }}
        quality={100}
        priority
        className="object-contain"
      />
    </Link>
  );
};

export default Logo;