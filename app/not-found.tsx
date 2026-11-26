import { CutProof } from '../components/artwork';
import { MarginLink } from '../components/editorial';

export default function NotFound() {
  return <section className="wrap py-16 text-center md:py-25">
    <CutProof>cut — see p. 404</CutProof>
    <h1 className="mx-auto mt-10 max-w-[20ch] text-[clamp(2.9rem,7vw,6rem)] tracking-[-.06em]">This page was cut in the edit.</h1>
    <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-1">
      <MarginLink href="/">Home</MarginLink>
      <MarginLink href="/books/">Books</MarginLink>
      <MarginLink href="/contact/">Contact</MarginLink>
    </div>
  </section>;
}
