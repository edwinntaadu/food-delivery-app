import Link from "next/link";
import Nav from "./Navbar";
import styled from "styled-components";

const Logo = styled.h1`
font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  
  transform: skew(-7deg);
  a {
    
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-left: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-left: 0.5rem;
  }
`;

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    padding: 0 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      text-align: center;
      padding: 0 1rem;
    }
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--black, black);
    padding: 0 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      text-align: center;
      padding: 0 1rem;
    }
  }

  @media (max-width: 480px) {
    .bar, .sub-bar {
      padding: 0;
      border-bottom-width: 5px;
    }
  }
`;

export default function Header() {
  return (
    <HeaderStyles>
      <div className="bar">
        <Logo>
          <Link href="/">Delicious Food</Link>
        </Logo>
        <Nav />
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
    </HeaderStyles>
  )
}
