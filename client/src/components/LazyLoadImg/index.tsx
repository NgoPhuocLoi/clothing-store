import React, { useEffect, useRef } from 'react';

interface Props {
  url: string;
}

const LazyLoadImg: React.FC<Props> = ({ url }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        img?.setAttribute('src', url);
      }
    });

    if (img) observer.observe(img);

    return () => {
      if (img) observer.unobserve(img);
    };
  }, [url]);
  return <img ref={imgRef} alt="Product" src-data={url} />;
};

export default LazyLoadImg;
