
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center flex-col gap-10 mt-10">
      <Link href="/slider">SLIDER</Link>
      <Link href="/timer">TIMER</Link>
    </div>
  );
}
