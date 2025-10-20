
type Props = {
  text: TextData | undefined
}

export type TextData = {
  marquee_color_1: string,
  marquee_color_2: string,
  marquee_text_1: string,
  marquee_text_2: string
}

const InfiniteBanner: React.FC<Props> = ({ text }) => {

  const repeatedText = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className="inline-block px-4">
      <span style={{ color: text?.marquee_color_1 || '' }}>
        {text?.marquee_text_1 || ''}
      </span>{' '}
      <span style={{ color: text?.marquee_color_2 || '' }}>
        {text?.marquee_text_2 || ''}
      </span>
    </span>
  ));
  
  return (
    <div className="fixed top-0 left-0 overflow-hidden w-screen text-white h-10 z-100 flex items-center">
      <div className="absolute inset-0 bg-white/60 backdrop-blur-md -z-10"></div>
      <div className="flex animate-marquee whitespace-nowrap">
        {repeatedText}
      </div>
    </div>
  );
};

export default InfiniteBanner;
