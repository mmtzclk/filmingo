import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    @font-face {
  font-family: 'AT Apoc';
  src: url('https://uploads-ssl.webflow.com/5e170b5b3f577b3e29048ec7/5e29be8ab7c9a8696a735798_AT%20Apoc-Revelations.woff2') format('woff2'), url('https://uploads-ssl.webflow.com/5e170b5b3f577b3e29048ec7/5e29be6db7c9a8a1567356be_AT%20Apoc-Revelations.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: auto;
}
    @font-face {
  font-family: 'Toy';
  src: url('https://uploads-ssl.webflow.com/5e170b5b3f577b3e29048ec7/5e29be8a911106d14c04a9be_Toy-Regular.woff2') format('woff2'), url('https://uploads-ssl.webflow.com/5e170b5b3f577b3e29048ec7/5e29be6db7c9a84b657356bf_Toy-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: auto;
}
    @font-face {
  font-family: 'Uxum Grotesque';
  src: url('https://uploads-ssl.webflow.com/5e170b5b3f577b3e29048ec7/5e32ba46685ac85dc22f9e81_Uxum%20Grotesque-Regular.woff2') format('woff2'), url('https://uploads-ssl.webflow.com/5e170b5b3f577b3e29048ec7/5e32ba3808b7059dfbce71b2_Uxum%20Grotesque-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: auto;
}

    body{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        color: white;
        font-family: 'Uxum Grotesque',sans-serif;
        font-size: .85vw;
        line-height: .85vw;
        font-weight: 400;
        letter-spacing: -.01em;
        text-transform: none;
        user-select: none;
        overflow: hidden;
    }

    ul{
      list-style: none;
      padding: 0;
      margin: 0;
    }

    a{
        text-decoration: none;
        color: white;
    }
`;
