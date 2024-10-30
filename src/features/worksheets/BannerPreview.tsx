import styled from "styled-components";

const Img = styled.img`
  display: block;
  width: auto;
  /* aspect-ratio: 3 / 2; */
  object-fit: cover;
  object-position: center;
  /* transform: scale(1.5) translateX(-7px); */
  /* transition: all 0.4s; */

  /* &:hover {
    transform: scale(1.5) translateX(-7px);
  } */
`;
const BannerPreview = ({ banner }: { banner: any }) => {
  return <Img src={banner} />;
};

export default BannerPreview;
